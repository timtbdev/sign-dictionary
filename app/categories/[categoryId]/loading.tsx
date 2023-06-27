import SkeletonCard from "@/components/shared/skeleten-card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[50px] h-[20px] rounded-md mt-5" />
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 py-12 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
      >
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </ul>
    </div>
  );
};

export default Loading;
