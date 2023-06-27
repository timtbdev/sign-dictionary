import { ProfileButton, SignInButton } from "@/components/login";
import { Logo } from "@/components/shared/icons";
import { Session } from "@supabase/supabase-js";
import React from "react";

interface HeaderProps {
  session?: Session;
  profileImageUrl?: string;
}

const Header: React.FC<HeaderProps> = async ({ session, profileImageUrl }) => {
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
