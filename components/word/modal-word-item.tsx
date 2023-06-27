"use client";

import { shimmer, toBase64 } from "@/lib/utils";
import { WordWithCategory } from "@/types/collection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import ReactPlayer from "react-player";
import ModalWordHeading from "./modal-word-heading";

interface ModalWordItemProps {
  word: WordWithCategory;
  saved: number;
  userId?: string;
}

const ModalWordItem: React.FC<ModalWordItemProps> = ({
  word,
  saved,
  userId,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="bg-white rounded-md border border-black/5 shadow-sm flex flex-row">
        {/* Body */}
        <div className="flex">
          {word.video ? (
            <div className="rounded-md mx-auto mt-5">
              <ReactPlayer url={word.video} controls={true} />
            </div>
          ) : (
            <div className="mx-auto">
              <Image
                src={word.image}
                alt={word.title}
                className="object-cover rounded-md mt-5"
                height={400}
                width={400}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(400, 400)
                )}`}
              />
            </div>
          )}
        </div>
        {/* Heading */}
        <ModalWordHeading
          wordId={word.id}
          categoryTitle={word.categories.title}
          categoryId={word.categories.id}
          wordTitle={word.title}
          saved={saved}
          userId={userId}
        />
      </div>
    </>
  );
};

export default ModalWordItem;
