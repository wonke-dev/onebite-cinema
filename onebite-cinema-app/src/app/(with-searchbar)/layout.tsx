import { ReactNode } from "react";
import Searchbar from "../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <Searchbar />
        {children}
      </div>
    </div>
  );
}
