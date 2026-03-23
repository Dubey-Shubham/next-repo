import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>hello</h1>
      <Link href={"/abc/hello"}>Go to Hello</Link>
    </div>
  );
}
