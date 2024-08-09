'use client';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import { useState } from "react";
const ReSetPass = () => {
  const [data, setData] = useState("");
  const [valid,setValid] = useState(false);
  const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await fetch('/api/resetpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('There was an error sending the reset password email.');
      }

      // Show success message and possibly redirect
      else {
        router.push('/checkemail')
      }
      // Optionally, redirect to the login page or a page that says 'Check your email'
    } catch (error: any) {
      console.log(error);
      setValid(true)
    }
  }
  return (
    <>
      <div className="flex h-screen bg-[#0c243b]">
        <div className="m-auto w-full max-w-md p-6 space-y-6 rounded-lg bg-[#2c3e50] ">
          <h1 className="text-center text-xl font-bold text-white">
            استعادة كلمة المرور
          </h1>
          <div className="space-y-4">
            <input
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right text-black"
              placeholder="البريد الإلكتروني"
              onChange={(e) => setData(e.target.value)}
            />
          </div>
            {valid && (
                <>
                <h5>البريد الإلكتروني غير موجود</h5>
                </>
            )}
            <button className="inline-flex mt-4 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#990707] hover:bg-red-600 text-white" onClick={()=>onSubmit(data)}>
              التالي
            </button>
            
          
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-[#990707]">
          <div className="relative h-full">
          <Image src="/Logo.jpg" alt="Alwathba Sport Club" fill={true} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ReSetPass;
