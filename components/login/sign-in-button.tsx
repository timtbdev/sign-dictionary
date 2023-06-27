"use client";

import {
  Facebook,
  Github,
  Google,
  LoadingDots,
} from "@/components/shared/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/utils";
import { supabase } from "@/utils/supabase-client";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SignInButton = () => {
  const [signInGoogleClicked, setSignInGoogleClicked] =
    React.useState<boolean>(false);
  const [signInFacebookClicked, setSignInFacebookClicked] =
    React.useState<boolean>(false);
  const [signInGithubClicked, setSignInGithubClicked] =
    React.useState<boolean>(false);
  const router = useRouter();

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  }

  async function signInWithGitHub() {
    setSignInGithubClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  }

  async function signInWithFacebook() {
    setSignInFacebookClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="mx-auto py-2 flex max-w-fit animate-fade-up relative items-center rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-white px-2.5 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
          >
            <UserCircleIcon className="h-5 w-5]" />
            <p className="text-sm font-semibold">Login</p>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://signapp.net">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(20, 20)
                )}`}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Please sign in with your account.
            </p>
          </div>
        </DialogHeader>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInGoogleClicked}
            className={`${
              signInGoogleClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => signInWithGoogle()}
          >
            {signInGoogleClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
          <button
            disabled={signInFacebookClicked}
            className={`${
              signInFacebookClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => signInWithFacebook()}
          >
            {signInFacebookClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Facebook className="h-5 w-5 text-blue-600" />
                <p>Sign In with Facebook</p>
              </>
            )}
          </button>
          <button
            disabled={signInGithubClicked}
            className={`${
              signInGithubClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => signInWithGitHub()}
          >
            {signInGithubClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Github className="h-5 w-5" />
                <p>Sign In with Github</p>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;
