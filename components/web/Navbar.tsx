"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";

export function Navbar() {

  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <nav className="w-full border-b">
      <div className="px-4 h-16 flex items-center justify-between">

        <div className="text-xl font-bold text-blue-500">
          ReactJS
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-black">
          <Link className={buttonVariants({ variant: "ghost" })} href="/auth/sign-up">Home</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/about">About</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/services">Services</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/contact">Contact</Link>
        </div>

        {isLoading ? null : isAuthenticated ?
          <Button onClick={()=> authClient.signOut({})}>Logout</Button> :
          <div className="flex gap-3">
            <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
            <Link className={buttonVariants({ variant: "outline" })} href="/auth/login">Login</Link>
            <ThemeToggle />
          </div>
        }

      </div>
    </nav>
  );
}