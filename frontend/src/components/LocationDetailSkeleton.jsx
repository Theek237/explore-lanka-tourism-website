import React from "react";
import Skeleton, { SkeletonText } from "./Skeleton";

function LocationDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <div className="skel skel-line w-40 mb-6" />
      <div className="skel skel-line w-2/3 mb-8" />
      <div className="grid gap-4 mb-10 md:grid-cols-3">
        <div className="skel skel-card md:col-span-2" />
        <div className="grid gap-4">
          <div className="skel skel-card h-38" />
          <div className="skel skel-card h-38" />
        </div>
      </div>
      <SkeletonText lines={6} className="mb-8" />
      <div className="skel skel-line w-56 mb-4" />
      <div className="skel skel-card h-80" />
    </div>
  );
}

export default LocationDetailSkeleton;
