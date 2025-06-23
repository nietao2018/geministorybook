import PredictionResult from "@/components/prediction/PredictionResult";
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from "react";


export default async function BlogPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  return (
    <Suspense fallback={<div className="py-8 text-center">Loading...</div>}>
      <PredictionResult />
    </Suspense>
  );
}
