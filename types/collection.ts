import { Database } from "./supabase";

export type CategoryType = Database["public"]["Tables"]["categories"]["Row"];
export type WordType = Database["public"]["Tables"]["words"]["Row"];
export interface CategoryWithWords extends Omit<CategoryType, "words"> {
  words: WordType[];
}

export interface WordWithCategory extends Omit<WordType, "categories"> {
  categories: CategoryType;
}

export type SavedWordType = Database["public"]["Tables"]["saved"]["Row"];
export interface WordWithSavedWords extends Omit<WordType, "saved_words"> {
  saved_words: SavedWordType[];
}

export interface SavedWordCategory extends Omit<SavedWordType, "words"> {
  words: WordWithCategory;
}
