import { CategoryHeading } from "@/components/category";
import SaveButton from "@/components/shared/save-button";
import UnSaveButton from "@/components/shared/unsave-button";
import { metaData } from "@/config/meta";
import { cn, getOgImageUrl, shimmer, toBase64 } from "@/lib/utils";
import supabase from "@/utils/supabase-server";
import { SearchIcon, EyeIcon, AppWindowIcon} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryType, SavedWordType, WordType } from "types/collection";
import { v4 } from "uuid";

async function getCategory(categoryId: string) {
  const { data: category, error } = await supabase
    .from("categories")
    .select()
    .eq("id", categoryId)
    .single<CategoryType>();
  // .returns<CategoryType>();

  if (error) {
    console.error(error);
    return null;
  }

  return category;
}

async function getWords(categoryId: string) {
  const { data: words, error } = await supabase
    .from("words")
    .select()
    .eq("category_id", categoryId)
    .order("order_rule")
    .returns<WordType[]>();

  if (error) {
    console.error(error.message);
  }
  return words;
}

async function getSavedWords() {
  const { data: savedWords, error } = await supabase
    .from("saved")
    .select()
    .returns<SavedWordType[]>();

  if (error) {
    console.error(error.message);
  }

  return savedWords;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params.categoryId);

  if (!category) {
    return {};
  }

  const title = category.title;
  const description = metaData.title;
  const authorName = metaData.author.name;
  const authorUrl = metaData.author.twitterUrl;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/categories/${category.id}`;
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
          url: getOgImageUrl(description as string, title, tags, category.id),
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
      images: [getOgImageUrl(description as string, title, tags, category.id)],
    },
  };
}

interface CategoryPageProps {
  params: { categoryId: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = await getCategory(params.categoryId);
  const savedWordsData = await getSavedWords();
  const wordsData = await getWords(params.categoryId);
  const profileData = await supabase.auth.getSession();

  // Wait for the promises to resolve
  const [category, words, savedWords, profile] = await Promise.all([
    categoryData,
    wordsData,
    savedWordsData,
    profileData,
  ]);

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <CategoryHeading
          id={category.id}
          title={category.title}
          words={words?.length as number}
        />
        <ul
          role="list"
          className="grid grid-cols-2 py-12 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
        >
          {words?.map((word) => (
            <div
              key={v4()}
              className="group hover:-translate-y-1 transition-all col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <Link
                href={`/words/${word.id}`}
                className="group flex flex-1 flex-col p-8"
              >
                <Image
                  className="mx-auto object-cover h-32 w-32 flex-shrink-0 rounded-full"
                  src={word.image || ""}
                  alt={word.title || ""}
                  width={128}
                  height={128}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(128, 128)
                  )}`}
                />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {word.title}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="mt-3 flex flex-col">
                    <span
                      className={cn(
                        `bg-${category.color}-50`,
                        `text-${category.color}-700`,
                        `ring-${category.color}-600/20`,
                        "items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                      )}
                    >
                      {category.title}
                    </span>
                  </dd>
                </dl>
              </Link>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <Link
                      href={`/words/${word.id}`}
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
                    {savedWords?.some((w) => w.id === word.id) ? (
                      <UnSaveButton id={word.id} word={word.title} />
                    ) : (
                      <SaveButton
                        id={word.id}
                        word={word.title}
                        userId={profile.data.session?.user.id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
