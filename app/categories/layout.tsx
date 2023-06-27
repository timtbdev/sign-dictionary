import React from "react";

interface CategoryLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function CategoryLayout({
  children,
  modal,
}: CategoryLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
