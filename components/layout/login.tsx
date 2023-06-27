"use client";

import { LoadingDots } from "@/components/shared/icons";
import Google from "@/components/shared/icons/google";
import { supabase } from "@/utils/supabase-client";
import { GithubIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function signInWithGoogle() {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white ring-1 ring-black/5 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label
                htmlFor="remember-me"
                className="block text-sm leading-6 text-gray-900"
              >
                Passwordless login with Magic link.
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => signInWithGoogle()}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-50 ring-1 ring-black/10 px-3 py-1.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isLoading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <Google className="h-5 w-5" />
                )}

                <span className="text-sm font-semibold leading-6">Google</span>
              </button>

              <button
                onClick={() => ({})}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              >
                {isLoading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <GithubIcon className="h-5 w-5" />
                )}

                <span className="text-sm font-semibold leading-6">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
