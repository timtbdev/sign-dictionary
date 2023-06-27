import React from "react";

interface WordLayoutProps {
  children: React.ReactNode;
}

export default async function WordLayout({ children }: WordLayoutProps) {
  return <>{children}</>;
}
