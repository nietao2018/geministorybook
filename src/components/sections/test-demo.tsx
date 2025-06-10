import React from "react";
import DemoItem from "./demo-item";

const demoData = [
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/1/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/1/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/1/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/1/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/1/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/2/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/2/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/2/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/2/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/2/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/3/init-new.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/3/mobile-poster-new.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/3/result-new.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/3/material-new.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/3/material-human-new.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/4/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/4/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/4/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/4/material.webp",
    svgClass: "css-1bhte0",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/4/material-human.webp",
    imgClass: "css-g23tyl",
    mobileClass: "css-1fjx9eu",
    videoClass: "css-15tczta",
    materialClass: "css-98velj",
    materialHumanClass: "css-bz3sxp",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/5/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/5/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/5/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/5/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/5/material-human-new.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/6/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/6/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/6/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/6/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/6/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/7/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/7/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/7/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/7/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/7/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/8/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/8/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/8/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/8/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/8/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/9/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/9/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/9/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/9/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/9/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/10/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/10/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/10/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/10/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/10/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/11/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/11/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/11/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/11/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/11/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
  {
    productImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/12/init.webp",
    mobilePoster: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/12/mobile-poster.webp",
    videoUrl: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/12/result.mp4",
    materialImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/12/material.webp",
    svgClass: "css-psmemh",
    materialHumanImg: "https://d1735p3aqhycef.cloudfront.net/official-website/public/landing-page/anyfit/12/material-human.webp",
    imgClass: "css-137cxhh",
    mobileClass: "css-19rnot4",
    videoClass: "css-1582ax4",
    materialClass: "css-jqwdbw",
    materialHumanClass: "css-vg64nf",
  },
];

const DemoList: React.FC = () => (
  <div className="mx-auto max-w-[1200px]">
    {/* 标题文案 */}
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
        Generate Product Assets with AI
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Fit Any Product Anywhere Instantly
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
      {demoData.map((item, idx) => (
        <DemoItem key={idx} {...item} />
      ))}
    </div>
  </div>
);

export default DemoList;