"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";

import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import LocaleSwitcher from "@/components/locale/locale-switcher";
import { useTranslations } from "next-intl";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const t = useTranslations("NavBar");
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  const selectedLayout = useSelectedLayoutSegment();

  const links = marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center transition-all ${
        scroll ? (scrolled ? "border-b border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80" : "bg-transparent") : "border-b border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80"
      }`}
    >
      <MaxWidthWrapper
        className="flex h-16 items-center justify-between py-4"
      >
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="flex size-8 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-transform group-hover:scale-105">
              <Icons.logo className="size-5" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-urban text-xl font-bold text-transparent">
              {siteConfig.name}
            </span>
          </Link>

          {links && links.length > 0 ? (
            <nav className="hidden gap-1 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50/80 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-sm dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300",
                    item.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {t(item.title)}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <LocaleSwitcher/>
          </div>

          {session ? (
            <Link
              href={session.user.role === "ADMIN" ? "/dashboard/prediction" : "/dashboard"}
              className="hidden md:block"
            >
              <Button
                className="border-0 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2.5 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                variant="default"
                size="sm"
                rounded="full"
              >
                <span>{t("dashboard")}</span>
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Button
              className="hidden gap-2 border-0 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2.5 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:flex"
              variant="default"
              size="sm"
              rounded="full"
              onClick={() => setShowSignInModal(true)}
            >
              <span>{t("sign_in")}</span>
              <Icons.arrowRight className="size-4" />
            </Button>
          ) : (
            <Skeleton className="hidden h-10 w-28 rounded-full bg-gray-200/50 dark:bg-gray-700/50 lg:flex" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
