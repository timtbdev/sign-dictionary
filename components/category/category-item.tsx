import { cn, shimmer, toBase64 } from "@/lib/utils";
import type { CategoryWithWords } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { v4 } from "uuid";

interface CategoryItemProps {
  category: CategoryWithWords;

}

const CategoryItem: FC<CategoryItemProps> = ({ category}) => {
  return (
    <li key={v4()}>
      <Link
        href={`/categories/${category.id}`}
        className="group flex w-full bg-white items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="flex min-w-0 flex-1 items-center space-x-3">
          <span className="block flex-shrink-0">
            <Image
              className="h-10 w-10 rounded-full object-cover"
              src={category.image || ""}
              alt={category.title || ""}
              width={40}
              height={40}
              priority
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(40, 40)
              )}`}
            />
          </span>
          <span className="block min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-gray-900">
              {category.title}
            </span>
          </span>
        </span>
        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
          {category.words.length}
        </span>
      </Link>
    </li>
  );
};

export default CategoryItem;
