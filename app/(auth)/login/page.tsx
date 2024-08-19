"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function Home() {
  //const searchParams = useSearchParams();
  //const callBackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log("Submitted...", res);
  };

  return (
    <div className="flex h-screen bg-[#0c243b]">
      <div className="m-auto w-full max-w-md p-8 bg-[#2c3e50] rounded-lg">
        <h2 className="mb-8 text-center text-xl font-bold text-white">
          ! أهلا بك في موقع نادي الوثبة
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-300 text-right"
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <input
              className={`flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right text-black ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              placeholder="أدخل رقمك أو بريدك الإلكتروني"
              type="email"
              {...register("email", {
                required: "البريد الإلكتروني مطلوب",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "البريد الإلكتروني غير صالح",
                },
              })} 
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-300 text-right"
              htmlFor="password"
            >
              كلمة المرور
            </label>
            <input
              className={`flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right text-black ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="أدخل كلمة المرور"
              type="password"
              {...register("password", {
                required: "كلمة المرور مطلوبة",
                minLength: {
                  value: 6,
                  message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-6 flex items-center justify-between">
            <Link
              className="text-sm text-blue-200 hover:underline"
              href="/resetpass"
            >
              نسيت كلمة المرور؟
            </Link>
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-300" htmlFor="remember">
                تذكرني
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 checked:border-0 accent-[#990707]"
              />
              </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#990707] hover:bg-red-600 text-white"
          >
            تسجيل الدخول
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-300">
          ليس لديك حساب؟
          <Link className="text-blue-200 hover:underline" href="/signup">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-[#990707]">
        <div className="relative h-full">
          <img
            alt="ALWATHBA SPORT CLUB"
            className="absolute inset-0 h-full w-full object-cover"
            height="60"
            src="/logoo.jpg"
            width="52"
          />
        </div>
      </div>
    </div>
  );
}