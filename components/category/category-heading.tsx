"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CategoryHeadingProps {
  title: string;
  words: number;
}

const CategoryHeading: React.FC<CategoryHeadingProps> = ({ title, words }) => {
  const router = useRouter();
  return (
    <dl className="mx-auto max-w-4xl grid grid-cols-3 gap-x-10">
      {/* Back button */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-white px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm font-medium leading-6 text-gray-500">Go back</dt>
        <button
          onClick={() => router.back()}
          className="w-full hover:text-gray-5s00 flex text-3xl items-center font-medium leading-10 tracking-tight text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 inline-flex" />

          <span className="ml-4 inline-flex">Back</span>
        </button>
      </div>

      {/* Category */}
      <div className="flex flex-wrap items-baseline justify-between text-center gap-x-4 bg-white px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm font-medium text-center w-full leading-6 text-gray-500">
          Category
        </dt>
        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {title}
        </dd>
      </div>

      {/* View counter */}
      <div className="flex flex-wrap justify-between items-baseline text-center gap-x-4 bg-white px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm w-full text-center font-medium leading-6 text-gray-500">
          Words
        </dt>
        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {words}
        </dd>
      </div>
    </dl>
  );
};

export default CategoryHeading;
