import React from 'react';
import { BaseEdge, getStraightPath, useStore } from '@xyflow/react';

// This is a helper function to calculate the intersection point of a line and a circle
const getCircleIntersectionPoint = (node, targetNode) => {
  const {
    width: nodeWidth,
    height: nodeHeight,
    positionAbsolute: nodePosition,
  } = node;
  const { positionAbsolute: targetPosition } = targetNode;

  const centerX = nodePosition.x + nodeWidth / 2;
  const centerY = nodePosition.y + nodeHeight / 2;
  const dx = targetPosition.x + targetNode.width / 2 - centerX;
  const dy = targetPosition.y + targetNode.height / 2 - centerY;

  const radius = nodeWidth / 2; // Assuming a circle
  const angle = Math.atan2(dy, dx);

  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return { x, y };
};

const CustomEdge = ({ id, source, target, markerEnd, ...props }) => {
  const sourceNode = useStore((store) => store.nodeInternals.get(source));
  const targetNode = useStore((store) => store.nodeInternals.get(target));

  if (!sourceNode || !targetNode) {
    return null;
  }

  // Get the intersection point on the node borders
  const sourcePos = getCircleIntersectionPoint(sourceNode, targetNode);
  const targetPos = getCircleIntersectionPoint(targetNode, sourceNode);

  // We need to offset the end of the path by the marker's size
  // to make the arrow tip touch the border.
  // The default marker has a size of 10.
  const markerSize = 10;
  const dx = targetPos.x - sourcePos.x;
  const dy = targetPos.y - sourcePos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const normDx = dx / dist;
  const normDy = dy / dist;

  const newTargetX = targetPos.x - normDx * markerSize;
  const newTargetY = targetPos.y - normDy * markerSize;

  const [edgePath] = getStraightPath({
    sourceX: sourcePos.x,
    sourceY: sourcePos.y,
    targetX: newTargetX,
    targetY: newTargetY,
  });

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} {...props} />;
};

export default CustomEdge;
