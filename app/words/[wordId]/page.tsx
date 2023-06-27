import { WordItem } from "@/components/word/";
import { metaData } from "@/config/meta";
import { getOgImageUrl } from "@/lib/utils";
import { WordWithCategory } from "@/types/collection";
import supabase from "@/utils/supabase-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

async function getWordWithCategory(wordId: string) {
  const word = await supabase
    .from("words")
    .select("*, categories(*)")
    .eq("id", wordId)
    .single<WordWithCategory>();
  return word;
}

async function getSavedWord(wordId: string) {
  const { count, error } = await supabase
    .from("saved")
    .select("id", { count: "exact", head: true })
    .eq("id", wordId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return count;
}

interface WordPageProps {
  params: { wordId: string };
}

export async function generateMetadata({
  params,
}: WordPageProps): Promise<Metadata> {
  const { data: word } = await getWordWithCategory(params.wordId);

  if (!word) {
    return {};
  }

  const title = word.title;
  const description = metaData.title;
  const authorName = metaData.author.name;
  const authorUrl = metaData.author.twitterUrl;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/words/${word.id}`;
  const tags = metaData.tags;

  return {
    title: title,
    description: description as string,
    authors: {
      name: authorName,
      url: authorUrl,
    },
    openGraph: {
      title: title,
      description: description as string,
      type: "article",
      url: url,
      images: [
        {
          url: getOgImageUrl(description as string, title, tags, word.id),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description as string,
      images: [getOgImageUrl(description as string, title, tags, word.id)],
    },
  };
}

export default async function WordPage({ params }: WordPageProps) {
  const wordData = await getWordWithCategory(params.wordId);
  const countData = await getSavedWord(params.wordId);
  const profileData = await supabase.auth.getSession();

  // Wait for the promises to resolve
  const [word, count, profile] = await Promise.all([
    wordData,
    countData,
    profileData,
  ]);

  if (!word) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl mb-10 px-6 lg:px-8">
      <WordItem
        word={word.data as WordWithCategory}
        saved={count as number}
        userId={profile.data.session?.user.id}
      />
    </div>
  );
}
