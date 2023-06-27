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
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  MoreVertical as ElipsisIcon,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface UnSaveButtonProps {
  id: string;
  word: string;
  detail?: boolean;
}

async function unSaveWord(id: string) {
  const response = await fetch(`/api/words/${id}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    return toast.error("Something went wrong!");
  }

  toast.success("Removed");

  return true;
}

const UnSaveButton: FC<UnSaveButtonProps> = ({ id, word, detail = false }) => {
  const router = useRouter();
  const [showUnSaveAlert, setShowUnSaveAlert] = useState<boolean>(false);
  const [isUnSaveLoading, setIsUnSaveLoading] = useState<boolean>(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShowUnSaveAlert(true)}
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
        <span className={cn({ "ml-2": detail }, { "ml-0": !detail })}>Remove</span>
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
      <AlertDialog open={showUnSaveAlert} onOpenChange={setShowUnSaveAlert}>
        <AlertDialogContent className="font-sans bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this word?</AlertDialogTitle>
            <AlertDialogDescription>Word: {word}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsUnSaveLoading(true);

                const saved = await unSaveWord(id);

                if (saved) {
                  setIsUnSaveLoading(false);
                  setShowUnSaveAlert(false);
                  router.refresh();
                }
              }}
              className="bg-blue-600 focus:ring-blue-600 text-white"
            >
              {isUnSaveLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Remove</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UnSaveButton;
