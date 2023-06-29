import { CategoryItem, CategoryWrapper } from "@/components/category";
import Heading from "@/components/layout/heading";
import {CommandMenu} from "@/components/search/command-menu";
import { CategoryWithWords } from "@/types/collection";
import supabase from "@/utils/supabase-server";

export default async function HomePage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select(`*, words(*)`)
    .returns<CategoryWithWords[]>();

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="mx-auto py-12 max-w-md sm:max-w-3xl">
        <div>
          <Heading />
          <CommandMenu categories={categories || undefined}/>
        </div>
        <CategoryWrapper>
          {categories?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </CategoryWrapper>
      </div>
    </>
  );
}
