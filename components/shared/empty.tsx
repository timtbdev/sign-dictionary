import { AlertTriangleIcon } from "lucide-react";
import React from "react";

interface EmptyProps {
  title: string;
  description: string;
}

const Empty: React.FC<EmptyProps> = ({ title, description }) => {
  return (
    <div className="max-w-3xl mx-auto rounded-lg my-5 border-2 border-dashed border-gray-300 p-12 text-center">
      <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default Empty;
