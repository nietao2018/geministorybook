import * as React from "react";
import Link from "next/link";
import LocaleSwitcher from "@/components/locale/locale-switcher";
import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Icons } from "../shared/icons";
import { useTranslations } from "next-intl";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('sitefooter');
  return (
    <footer className={cn("border-t", className)}>
      <div className="container grid max-w-6xl grid-cols-2 gap-6 py-14 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">
              {t(`sections.${section.title}`)}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t(`links.${link.title}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-full flex flex-col items-end sm:col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.logo className="size-6 lg:size-10" />
            <span className="font-urban text-lg font-bold lg:text-3xl">
              {siteConfig.name}
            </span>
          </Link>
          <span className="mt-2 text-xs text-muted-foreground">
            {t('copyright')}
          </span>
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-5 py-2 mt-3 text-white font-semibold shadow-lg hover:bg-[#4752c4] transition"
            style={{ fontSize: 18 }}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.112.112 0 0 0-.119.056c-.524.908-1.11 2.086-1.527 3.005a18.524 18.524 0 0 0-5.313 0c-.418-.92-1.003-2.098-1.527-3.005A.115.115 0 0 0 8.281 3.1a19.736 19.736 0 0 0-3.432 1.27.105.105 0 0 0-.05.043C2.066 7.2 1.2 9.96 1.463 12.68c0 .01.005.02.01.03a19.9 19.9 0 0 0 5.993 3.036.112.112 0 0 0 .123-.042c.462-.63.874-1.295 1.226-1.994a.112.112 0 0 0-.06-.155 12.6 12.6 0 0 1-1.792-.86.112.112 0 0 1-.011-.186c.12-.09.24-.18.353-.27a.112.112 0 0 1 .114-.013c3.807 1.74 7.92 1.74 11.693 0a.112.112 0 0 1 .115.012c.114.09.234.18.354.27a.112.112 0 0 1-.01.186c-.57.33-1.16.62-1.793.86a.112.112 0 0 0-.06.155c.36.7.773 1.364 1.226 1.994a.112.112 0 0 0 .123.042 19.876 19.876 0 0 0 6.002-3.036.112.112 0 0 0 .01-.03c.25-2.62-.417-5.38-2.798-8.268a.1.1 0 0 0-.05-.043ZM8.02 13.665c-.789 0-1.438-.72-1.438-1.6 0-.88.637-1.6 1.438-1.6.807 0 1.45.728 1.438 1.6 0 .88-.637 1.6-1.438 1.6Zm7.96 0c-.789 0-1.438-.72-1.438-1.6 0-.88.637-1.6 1.438-1.6.807 0 1.45.728 1.438 1.6 0 .88-.637 1.6-1.438 1.6Z"/>
            </svg>
            Contact With Discord
          </a>
        </div>
      </div>

      <div className="border-t py-4">
        <div className="container flex max-w-6xl items-center justify-between">
          <div className="text-left text-sm text-muted-foreground">
            <span className="font-medium">{t('built_by')}{" "}</span>
            <Link
              href="https://Converters.pro/?from=opensource-footer"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              Converters.pro
            </Link>
            {/* <span className="mr-2"> , </span>

            <span className="font-medium">{t('open_source_by')}{" "}</span>
            <Link
              href="https://ullrai.com"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              UllrAI Lab
            </Link> */}
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              <Icons.github className="size-5" />
            </Link> */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
