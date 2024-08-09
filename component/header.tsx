"use client";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import Image from "next/image";
import React from "react";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <header className="bg-[#990707] py-2 " dir="rtl">
      <div className="flex  items-center justify-between container px-4 mx-auto flex-wrap w-full">
        <div className="flex items-center justify-between space-x-4">
          <Image width={50} height={50} alt="Logo" src="/logoo.jpg" />
          <h1 className="text-xl font-semibold text-white">
            نادي الوثبة الرياضي
          </h1>
        </div>
        <FaBars
          className="lg:hidden block h-6 w-6 cursor-pointer border-white fill-white"
          onClick={() => setOpen(!open)}
        />
        <nav
          className={`${
            open ? "block" : "hidden"
          } lg:flex lg:items-center lg:w-auto w-full`}
        >
          <ul className="lg:flex lg:justify-between text-base text-white">
            <li>
              <Link
                className="lg:px-5 text-white  hover:text-gray-950 py-2 font-semibold block text-center"
                href="#"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 text-white hover:text-white py-2 font-semibold block text-center"
                href="#"
              >
                الأخبار
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 text-white hover:text-white py-2 font-semibold block text-center"
                href="#"
              >
                عن النادي
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 text-white hover:text-white py-2 font-semibold block text-center"
                href="#"
              >
                تواصل معنا
              </Link>
            </li>
            <li>
              <Link
                className="bg-white text-[#990707] px-4 py-1 my-1 font-bold block rounded-full text-center"
                href="/login"
              >
                تسجيل الدخول
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
