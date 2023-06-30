"use client";

import { shimmer, toBase64 } from "@/lib/utils";
import { WordWithCategory } from "@/types/collection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import WordHeading from "./word-heading";
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface WordItemProps {
  word: WordWithCategory;
  saved: number;
  userId?: string;
}

const WordItem: React.FC<WordItemProps> = ({ word, saved, userId }) => {
  const router = useRouter();
  return (
    <>
      {/* Heading */}
      <WordHeading
        wordId={word.id}
        categoryTitle={word.categories.title}
        categoryId={word.categories.id}
        wordTitle={word.title}
        wordImageUrl={word.image}
        saved={saved}
        userId={userId}
      />

      {/* Body */}

      <div className="flex mx-10">
        {word.video ? (

          <div className="mx-auto items-center">
                      <div className="hidden rounded-md mx-auto sm:block">
            <ReactPlayer height="550px" width="450px" url={word.video} controls={true} />
          </div>
          <div className="block rounded-md mx-auto sm:hidden">
            <ReactPlayer height="100%" width="100%" url={word.video} controls={true} />
          </div>
          </div>

          
        ) : (
          <div className="mx-auto">
            <Image
              src={word.image}
              alt={word.title}
              className="object-cover rounded-md mt-5"
              height={450}
              width={400}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(450, 400)
              )}`}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WordItem;
