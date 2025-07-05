"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

import { ModeToggle } from "./mode-toggle";
import LocaleSwitcher from "@/components/locale/locale-switcher";
export function NavMobile() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const selectedLayout = useSelectedLayoutSegment();

  const links = marketingConfig.mainNav;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-4 top-4 z-50 rounded-2xl border border-gray-200/50 bg-white/80 p-2.5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-xl focus:outline-none dark:border-gray-600/50 dark:bg-gray-800/80 dark:hover:bg-gray-800 md:hidden",
          open && "bg-white shadow-xl dark:bg-gray-800",
        )}
      >
        {open ? (
          <X className="size-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="size-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-20 hidden w-full overflow-auto bg-white/95 px-5 py-20 backdrop-blur-xl dark:bg-gray-900/95 lg:hidden",
          open && "block",
        )}
      >
        <div className="mx-auto max-w-sm">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Icons.logo className="size-7" />
            </div>
            <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              {siteConfig.name}
            </h2>
          </div>
          
          <ul className="space-y-2">
            {links && links.length > 0 && links.map(({ title, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center rounded-2xl px-4 py-3 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400",
                    href.startsWith(`/${selectedLayout}`)
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-sm dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {title}
                </Link>
              </li>
            ))}

            {session ? (
              <>
                {session.user.role === "ADMIN" ? (
                  <li>
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center rounded-2xl px-4 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    >
                      Admin
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center rounded-2xl px-4 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-8 flex items-center justify-center space-x-6">
            <LocaleSwitcher />
            <Link 
              href={siteConfig.links.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <Icons.github className="size-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gray-100/80 dark:bg-gray-800/80">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
