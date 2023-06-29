"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CategoryWithWords } from "@/types/collection";
import { Circle, File } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { v4 } from "uuid";
import { SearchIcon } from "lucide-react";

interface CommandMenuProps {
  categories?: CategoryWithWords[];
}

export function CommandMenu({ categories }: CommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto mt-6 sm:flex sm:items-center">
        <Button
          variant="outline"
          className={cn(
            "relative w-full justify-center text-sm text-muted-foreground"
          )}
          onClick={() => setOpen(true)}
        >
          <span className="infline-flex"><SearchIcon className="h-4 w-4 mr-2"/></span><span className="inline-flex">Search ... </span>
          <kbd className="pointer-events-none absolute right-1 top-1 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[14px] font-normal opacity-100 sm:flex">
            <span className="text-lg">⌘</span>K
          </kbd>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className="border-none focus:outline-none focus:ring-0 focus:border-none"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {categories?.map((category) => (
              <CommandItem
                key={v4()}
                value={category.title}
                onSelect={() => {
                  runCommand(() => router.push(`/categories/${category.id}`));
                }}
              >
                <File className="mr-2 h-4 w-4" />
                {category.title}
              </CommandItem>
            ))}
          </CommandGroup>
          {categories?.map((category) => (
            <CommandGroup key={v4()} heading={category.title}>
              {category.words.map((word) => (
                <CommandItem
                  key={v4()}
                  value={word.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/words/${word.id}`));
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <Circle className="h-3 w-3" />
                  </div>
                  {word.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
