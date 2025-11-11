import React from "react";

export function Skeleton({ className = "", style }) {
  return <div className={("skel " + className).trim()} style={style} aria-hidden="true" />;
}

export function SkeletonText({ lines = 2, className = "", lineClassName = "", gap = 8 }) {
  const arr = Array.from({ length: lines });
  return (
    <div className={className}>
      {arr.map((_, i) => (
        <div
          key={i}
          className={("skel skel-line " + lineClassName).trim()}
          style={{ marginBottom: i === lines - 1 ? 0 : gap }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default Skeleton;
