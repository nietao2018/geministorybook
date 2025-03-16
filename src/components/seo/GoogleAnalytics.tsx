import Script from 'next/script';
import { env } from "@/env.mjs"

export default function SeoScript() {
  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_TRACKING_ID}`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${env.GOOGLE_TRACKING_ID}', {
            page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
