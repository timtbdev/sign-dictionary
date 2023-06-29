import { CategoryHeading } from "@/components/category";
import Empty from "@/components/shared/empty";
import UnSaveButton from "@/components/shared/unsave-button";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import supabase from "@/utils/supabase-server";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SavedWordCategory } from "types/collection";
import { v4 } from "uuid";

async function getSavedWords() {
  const { data: savedWords, error } = await supabase
    .from("saved")
    .select("*, words(*, categories(*))")
    .returns<SavedWordCategory[]>();

  if (error) {
    console.error(error.message);
  }

  return savedWords;
}

export default async function SavedPage() {
  const savedWordsData = await getSavedWords();
  const profileData = await supabase.auth.getSession();

  // Wait for the promises to resolve
  const [savedWords, profile] = await Promise.all([
    savedWordsData,
    profileData,
  ]);

  if (!profile.data.session) {
    redirect("/");
  }

  if (!savedWords) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <CategoryHeading
          title="Saved Words"
          words={savedWords?.length as number}
        />
        {savedWords?.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-2 py-12 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
          >
            {savedWords?.map((savedWord) => (
              <div
                key={v4()}
                className="group hover:-translate-y-1 transition-all col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
              >
                <Link
                  href={`/words/${savedWord.id}`}
                  className="group flex flex-1 flex-col p-8"
                >
                  <Image
                    className="mx-auto object-cover h-32 w-32 flex-shrink-0 rounded-full"
                    src={savedWord.words.image || ""}
                    alt={savedWord.words.title || ""}
                    width={128}
                    height={128}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(128, 128)
                    )}`}
                  />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {savedWord.words.title || ""}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dd className="mt-3 flex flex-col">
                      <span
                        className={cn(
                          `bg-${savedWord.words.categories.color}-50`,
                          `text-${savedWord.words.categories.color}-700`,
                          `ring-${savedWord.words.categories.color}-600/20`,
                          "items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {savedWord.words.categories.title || ""}
                      </span>
                    </dd>
                  </dl>
                </Link>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <Link
                        href={`/words/${savedWord.id}`}
                        className="relative -mr-px inline-flex w-0 hover:bg-gray-50 hover:border-black/5 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Open
                      </Link>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <UnSaveButton
                        id={savedWord.id}
                        word={savedWord.words.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <Empty title="Empty" description="You haven't saved any words yet." />
        )}
      </div>
    </>
  );
}
