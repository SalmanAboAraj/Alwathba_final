"use client";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  // const [userData, setUserData] = useState<any>(null); // Explicitly type as `any` or define a more specific type
  // const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  // const [error, setError] = useState<string | null>(null); // To manage error state

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Use axios to fetch data
  //       const response = await axios.get('http://localhost:3000/api/usermediaauth');
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch user data:', error);
  //       setError('Failed to fetch user data'); // Set error message
  //     } finally {
  //       setLoading(false); // Set loading to false after data fetch attempt
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Display loading or error message
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <header className="bg-[#990707] py-2" dir="rtl">
      <div className="flex items-center justify-between container px-4 mx-auto flex-wrap w-full">
        <div className="flex items-center justify-between space-x-4">
          <Image width={50} height={50} alt="Logo" src="/logoo.jpg" />
          <h1 className="text-xl font-semibold text-white pr-2">نادي الوثبة الرياضي</h1>
        </div>
        <FaBars
          className="lg:hidden block h-6 w-6 cursor-pointer border-white fill-white"
          onClick={() => setOpen(!open)}
        />
        <nav className={`${open ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
          <ul className="lg:flex lg:justify-between text-base text-white">
            <li>
              <Link
                className="lg:px-5 text-white hover:text-gray-950 py-2 font-semibold block text-center"
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

            {!session ? (
              <li>
                <Link
                  className="bg-white text-[#990707] px-4 py-1 my-1 font-bold block rounded-full text-center"
                  href="/login"
                >
                  تسجيل الدخول
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <div className="px-4 py-1 my-1 rounded-full flex justify-center items-center">
                    <Image
                    //userData?.userMediaRow?.imagePath
                      src={"/default-avatar.png"} // Use a default image if user image is not available
                      alt="User Image"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </li>
                <li>
                  <Link
                    className="bg-white text-[#990707] px-4 py-1 my-1 font-bold block rounded-full text-center"
                    href="/"
                    onClick={() => signOut()}
                  >
                    تسجيل الخروج
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
