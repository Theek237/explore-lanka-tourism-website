import React from "react";
import { Skeleton, SkeletonText } from "./Skeleton";

function LocationCardSkeleton() {
  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="skel skel-card w-full" />
      <div className="p-5">
        <Skeleton className="skel-line w-2/3 mb-3" />
        <SkeletonText lines={3} className="" lineClassName="w-full" />
        <div className="flex justify-between mt-4">
          <Skeleton className="skel-line w-1/3" />
          <Skeleton className="skel-line w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default LocationCardSkeleton;
