/**
 * v0 by Vercel.
 * @see https://v0.dev/t/14ExLLramaO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";

import heroImg from "../../public/images/hero-image.avif";

export default function LandingPage() {
  return (
    <section className="w-full py-12 md:py-24 xl:py-32" key="1">
      <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 xl:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Plan your next adventure</h1>
            <p className="max-w-[400px] text-gray-500 md:text-xl/relaxed lg:text-base xl:text-xl dark:text-gray-400">
              The all-in-one travel planner app. Effortlessly organize your trips, discover new destinations, and share your experiences with friends.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-yellow-500 bg-yellow-500 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-yellow-400 hover:text-yellow-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-700 disabled:pointer-events-none disabled:opacity-50 dark:border-yellow-400 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:hover:text-yellow-900 dark:focus-visible:ring-yellow-700"
              href="#"
            >
              Login
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-sky-blue-500 px-8 text-sm font-medium text-sky-blue-50 shadow transition-colors hover:bg-sky-blue-400 hover:text-sky-blue-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-sky-blue-400 dark:text-sky-blue-900 dark:hover:bg-sky-blue-300 dark:focus-visible:ring-sky-blue-700"
              href="#"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <Image alt="Hero" className="hidden md:block mx-auto aspect-video overflow-hidden rounded-xl object-bottom" placeholder="blur" priority src={heroImg} />
      </div>
    </section>
  );
}
