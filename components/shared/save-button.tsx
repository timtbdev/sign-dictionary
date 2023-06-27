"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  MoreVertical as ElipsisIcon,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface SaveButtonProps {
  id: string;
  word: string;
  detail?: boolean;
  userId?: string;
}

async function saveWord(id: string) {
  const response = await fetch(`/api/words/${id}`, {
    method: "POST",
  });

  console.log("API-Response", response);

  if (!response?.ok) {
    return toast.error("Something went wrong!");
  }

  toast.success("Saved");

  return true;
}

const SaveButton: FC<SaveButtonProps> = ({
  id,
  word,
  detail = false,
  userId,
}) => {
  const router = useRouter();
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() =>
          userId ? setShowSaveAlert(true) : toast.error("Please sign in!")
        }
        className={cn(
          "relative inline-flex items-center text-sm border",
          {
            "w-0 flex-1 hover:bg-gray-50 hover:border-black/5 justify-center gap-x-3 rounded-br-lg border-transparent py-4 font-semibold text-gray-900":
              !detail,
          },
          {
            "-ml-px rounded-md border-black/5 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100":
              detail,
          }
        )}
      >
        <HeartIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span className={cn({ "ml-2": detail }, { "ml-0": !detail })}>
          Save
        </span>
      </button>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Please wait ....
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showSaveAlert} onOpenChange={setShowSaveAlert}>
        <AlertDialogContent className="font-sans bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Save this word?</AlertDialogTitle>
            <AlertDialogDescription>Word: {word}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsSaveLoading(true);

                const saved = await saveWord(id);

                if (saved) {
                  setIsSaveLoading(false);
                  setShowSaveAlert(false);
                  router.refresh();
                }
              }}
              className="bg-blue-600 focus:ring-blue-600 text-white"
            >
              {isSaveLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Save</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SaveButton;
