"use client";

import { ProfileButton, SignInButton } from "@/components/login";
import { Logo } from "@/components/shared/icons";
import { supabase } from "@/utils/supabase-client";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const Header = async () => {
  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserSession(session);
    };

    getData();
  }, []);

  return (
    <>
      <div className="sticky top-0 mx-auto flex w-full justify-center border-b backdrop-blur-xl border-black/5 shadow-sm z-30">
        <div className="max-w-3xl w-full pb-5 flex items-center justify-between py-3 px-5">
          <Logo />

          {userSession ? (
            <ProfileButton
              email={userSession?.user?.user_metadata.email}
              profileImageUrl={
                userSession?.user?.user_metadata.picture ||
                userSession?.user?.user_metadata.avatar_url
              }
            />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
