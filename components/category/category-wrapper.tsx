import React, { FC, ReactNode } from "react";

interface CategoryWrapperProps {
  children: ReactNode;
}

const CategoryWrapper: FC<CategoryWrapperProps> = ({ children }) => {
  return (
    <div className="mt-10">
      <h3 className="text-lg text-center font-medium text-gray-900">
        Or choose your category
      </h3>
      <ul role="list" className="mt-4 mx-5 md:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {children}
      </ul>
    </div>
  );
};

export default CategoryWrapper;
