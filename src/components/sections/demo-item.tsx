'use client';

import React, { useState, useRef, useEffect } from "react";

interface DemoItemProps {
  productImg: string;
  mobilePoster: string;
  videoUrl: string;
  materialImg: string;
  svgClass?: string;
  materialHumanImg: string;
  imgClass?: string;
  mobileClass?: string;
  videoClass?: string;
  materialClass?: string;
  materialHumanClass?: string;
}

const DemoItem: React.FC<DemoItemProps> = ({
  productImg,
  mobilePoster,
  videoUrl,
  materialImg,
  materialHumanImg,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <div className="mb-8 flex flex-col items-center rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* 桌面端显示 Product image 或视频+叠加内容 */}
      <div
        className="relative mb-4 hidden size-80 transition-transform duration-300 hover:scale-105 md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <>
            <video 
              ref={videoRef}
              src={videoUrl} 
              loop 
              muted 
              className="size-full rounded-lg object-cover transition-opacity duration-300" 
            />
            {/* 横向叠加内容 */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-row items-center justify-center gap-5 pb-8">
              <img 
                alt="Material image" 
                src={materialImg} 
                className="size-20 rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-110" 
              />
              <div className="flex size-12 items-center justify-center rounded-full bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-110" id="add-icon">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2V17.9999M2.00005 9.99995H17.9999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <img 
                alt="Material image 2" 
                src={materialHumanImg} 
                className="size-20 rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-110" 
              />
            </div>
          </>
        ) : (
          <img 
            alt="Product image" 
            src={productImg} 
            className="size-full rounded-lg object-cover transition-all duration-300" 
          />
        )}
      </div>
      {/* 移动端显示 Mobile poster */}
      <img 
        alt="Mobile poster" 
        src={mobilePoster} 
        className="mb-4 block h-56 w-48 rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105 md:hidden" 
      />
    </div>
  );
};

export default DemoItem; 