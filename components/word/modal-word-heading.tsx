import SaveButton from "@/components/shared/save-button";
import UnSaveButton from "@/components/shared/unsave-button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {Button} from "@/components/ui/button"
import { X } from "lucide-react";

interface ModalWordHeadingProps {
  wordId: string;
  categoryTitle: string;
  categoryId: string;
  wordTitle: string;
  saved: number;
  userId?: string;
}

const ModalWordHeading: React.FC<ModalWordHeadingProps> = ({
  wordId,
  categoryTitle,
  categoryId,
  wordTitle,
  saved,
  userId,
}) => {
  const router = useRouter();

  return (
    <dl className="flex flex-col items-center">
      {/* Word */}
      <div className="flex flex-wrap items-center text-center px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm w-full text-center font-medium leading-6 text-gray-500">
          {categoryTitle}
        </dt>
        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {wordTitle}
        </dd>
      </div>

      {/* Save / Unsave button */}
      <div className="flex">
        <Button variant="outline"><X className="mr-2 h-4 w-4" />Close</Button>
      </div>
    </dl>
  );
};

export default ModalWordHeading;
