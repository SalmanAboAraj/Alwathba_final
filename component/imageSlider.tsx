'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// import { AiOutlineArrowLeft , AiOutlineArrowRight } from "react-icons/ai";

const ImageSlider = () => {
	const images = ["/slider/1.jpg", "/slider/2.jpg", "/slider/3.jpg"];
	const zoomInProperties = {
	  scale: 1,
	  duration: 3000,
	  transitionDuration: 300,
	  infinite: true,
	  arrow : false,
	  pauseOnHover : false
	//   prevArrow: (
	// 	<div className="ml-10 top-40 md:top-72">
	// 	  <AiOutlineArrowLeft className="h-8 w-8 text-white cursor-pointer" />
	// 	</div>
	//   ),
	//   nextArrow: (
	// 	<div className="mr-10 top-40 md:top-72">
	// 	  <AiOutlineArrowRight className="h-8 w-8 text-white cursor-pointer" />
	// 	</div>
	//   ),
	};
   return (
	<div className="w-full h-screen" dir="rtl">
        <Zoom {...zoomInProperties}>
          {images.map((each, index) => (
            <div
              key={index}
              className="flex justify-center md:items-center items-start w-screen h-screen relative"
            >
              <Image className="w-screen" src={each} alt={`image slider ${index+1}`} fill />
              <div className="bg-[#990707] opacity-65 w-1/3 h-52 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3">
                <span className="text-white opacity-100 text-center block">
                  مرحباً! شكراً لزيارتك صفحة نادي الوثبة الرياضي
                </span>
                <span className="text-white opacity-100 text-center block">
                  يمكنك الإطلاع على آخر الأخبار والنتائج والصور والفيديوهات
                  المتعلقة بالنادي
                </span>
                <Link
                  className="bg-white text-[#990707] px-4 py-1 my-1 font-bold rounded-full text-center block mx-32"
                  href="#"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          ))}
        </Zoom>
      </div>
  );
};

export default ImageSlider;