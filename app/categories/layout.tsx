import React from "react";

interface CategoryLayoutProps {
  children: React.ReactNode;
}

export default async function CategoryLayout({
  children,
}: CategoryLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
