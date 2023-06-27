import SaveButton from "@/components/shared/save-button";
import UnSaveButton from "@/components/shared/unsave-button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface WordHeadingProps {
  wordId: string;
  categoryTitle: string;
  categoryId: string;
  wordTitle: string;
  saved: number;
  userId?: string;
}

const WordHeading: React.FC<WordHeadingProps> = ({
  wordId,
  categoryTitle,
  categoryId,
  wordTitle,
  saved,
  userId,
}) => {
  const router = useRouter();

  return (
    <dl className="mx-auto max-w-4xl grid grid-cols-1 gap-px sm:grid-cols-1 lg:grid-cols-3">
      {/* Back button */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-white px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm font-medium leading-6 text-gray-500">
          Go back to Category Page
        </dt>
        <Link
          href={`/categories/${categoryId}`}
          className="w-full hover:text-gray-500 bg-transparent flex text-3xl items-center font-medium leading-10 tracking-tight text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 inline-flex" />

          <span className="ml-4 inline-flex">Back</span>
        </Link>
      </div>

      {/* Word */}
      <div className="flex flex-wrap justify-between items-baseline text-center gap-x-4 bg-white px-4 py-2 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        <dt className="text-sm w-full text-center font-medium leading-6 text-gray-500">
          {categoryTitle}
        </dt>
        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {wordTitle}
        </dd>
      </div>

      {/* Save / Unsave button */}
      <div className="flex flex-wrap justify-between mx-auto items-center text-center gap-x-4 bg-white py-2 px-4 md:py-4 lg:py-6 sm:px-6 xl:px-8">
        {saved > 0 ? (
          <UnSaveButton id={wordId} word={wordTitle} detail={true} />
        ) : (
          <SaveButton
            id={wordId}
            word={wordTitle}
            userId={userId}
            detail={true}
          />
        )}
      </div>
    </dl>
  );
};

export default WordHeading;
