import { ProfileButton, SignInButton } from "@/components/login";
import { Logo } from "@/components/shared/icons";
import {supabase} from "@/utils/supabase-client";
import React, {useEffect}from "react";

const Header = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const profileImageUrl =
    session?.user?.user_metadata.picture ||
    session?.user?.user_metadata.avatar_url;

  return (
    <>
      <div className="sticky top-0 mx-auto flex w-full justify-center border-b backdrop-blur-xl border-black/5 shadow-sm z-30">
        <div className="max-w-3xl w-full pb-5 flex items-center justify-between py-3 px-5">
          <Logo />

          {session ? (
            <ProfileButton
              email={session?.user?.user_metadata.email}
              profileImageUrl={profileImageUrl}
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
