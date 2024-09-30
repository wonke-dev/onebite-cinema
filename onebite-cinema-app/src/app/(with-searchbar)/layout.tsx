import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        Searchbar Layout
        {children}
      </div>
    </div>
  );
}
