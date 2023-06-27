"use client";

import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Empty = () => {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Empty</h3>
      <p className="mt-1 text-sm text-gray-500">
        Your saved words will be shown here.
      </p>
    </div>
  );
};

export default Empty;
