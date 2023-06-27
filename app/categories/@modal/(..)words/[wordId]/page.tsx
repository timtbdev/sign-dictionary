import Modal from "@/components/ui/modal";
import { ModalWordItem } from "@/components/word/";
import { WordWithCategory } from "@/types/collection";
import supabase from "@/utils/supabase-server";
import { notFound, useRouter } from "next/navigation";
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
    <Modal showModal={true}>
      <ModalWordItem
        word={word.data as WordWithCategory}
        saved={count as number}
        userId={profile.data.session?.user.id}
      />
    </Modal>
  );
}
