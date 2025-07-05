import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CTA() {
    const t = useTranslations("CTA");

    return (
        <section className="relative overflow-hidden py-20">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl" />
            </div>
            
            <MaxWidthWrapper className="relative">
                <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
                            {t("title")}
                        </h2>
                        <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                            {t("description")}
                        </p>
                        <Link href="/pricing" className="group">
                            <div className="hover:shadow-3xl inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                                <span>{t("button")}</span>
                                <svg className="size-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -left-4 -top-4 size-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60" />
                    <div className="absolute -bottom-4 -right-4 size-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-40" />
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
