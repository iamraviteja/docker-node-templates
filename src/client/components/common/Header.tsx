import React from "react";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={'/'}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            to={'/'}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to={'/details'}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Playground
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
