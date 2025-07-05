import { HeaderSection } from "@/components/shared/header-section"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { Icons } from "@/components/shared/icons";
import { useTranslations } from "next-intl";

export default function StepsSection() {
    const t = useTranslations("StepsSection");
    const steps = [
        {
            icon: Icons.camera,
            title: t("uploadYourSelfies"),
            description: t("uploadYourSelfiesDescription")
        },
        {
            icon: Icons.palette,
            title: t("personalizeYourStyle"),
            description: t("personalizeYourStyleDescription")
        },
        {
            icon: Icons.sparkles,
            title: t("instantAIMagic"),
            description: t("instantAIMagicDescription")
        }
    ]

    return (
        <section aria-labelledby="steps-section-title" className="relative overflow-hidden py-20">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-gray-800/30" />
            
            <MaxWidthWrapper className="relative">
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-gray-700 dark:from-purple-900/50 dark:to-pink-900/50 dark:text-gray-300">
                        <span className="size-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        {t("quickAndEasyProcess")}
                    </div>
                    <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
                        {t("createFunAndProHeadshotsIn3SimpleSteps")}
                    </h2>
                    <p className="mx-auto max-w-4xl text-xl text-gray-600 dark:text-gray-300">
                        {t("experienceTheFastestAITechnologyAtHeadShotsFunForStunningPersonalizedHeadshotsPerfectForEveryOccasion")}
                    </p>
                </div>

                {/* Steps with connecting line */}
                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-1/2 top-16 hidden h-0.5 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-800 dark:via-pink-800 dark:to-purple-800 lg:block" />
                    
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                className="group relative text-center"
                                key={step.title}
                            >
                                {/* Step number circle */}
                                <div className="relative mb-8">
                                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                                        {index + 1}
                                    </div>
                                    {/* Connecting line for mobile */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-1/2 top-full h-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 lg:hidden" />
                                    )}
                                </div>

                                {/* Step content */}
                                <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80">
                                    {/* Icon */}
                                    <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
                                        <step.icon className="size-6 text-purple-600 dark:text-purple-400" />
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                        {step.title}
                                    </h3>

                                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}