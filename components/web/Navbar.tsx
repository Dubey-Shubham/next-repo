import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="text-xl font-bold text-blue-500">
          ReactJS
        </div>

        {/* Center - Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-black">
          <a href="/" className="hover:text-blue-500 transition">
            Home
          </a>
          <a href="/about" className="hover:text-blue-500 transition">
            About
          </a>
          <a href="/services" className="hover:text-blue-500 transition">
            Services
          </a>
          <a href="/contact" className="hover:text-blue-500 transition">
            Contact
          </a>
        </div>

        {/* Right - Buttons */}
        <div className="flex gap-3">
          <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
          <Link className={buttonVariants()} href="/auth/login">Login</Link>
        </div>

      </div>
    </nav>
  );
}