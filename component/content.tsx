"use client";
import {useRouter} from "next/navigation";
import { useState } from "react";

const Content = () => {
  const [nextForm, setNextForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter()
  async function handleSignup (){
    if(password === confirmPassword){
      try {
        const data = {
          "Fname":Fname,
          "Lname":Lname,
          "gender":gender,
          "email":email,
          "mobile":phone,
          "password":password,
        }
        const response = await fetch('/api/newaccount', {
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
        
      }
  }
}
return (
<>
    <div className={`${nextForm ? "space-y-4" : "hidden"}`}>
      <div className={"space-y-4"}>
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="الاسم الأول"
          onChange={(e)=>setFname(e.target.value)}
        />
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="الاسم الأخير"
          onChange={(e)=>setLname(e.target.value)}
        />
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="الجنس"
          onChange={(e)=>setGender(e.target.value)}
        />
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="البريد الإلكتروني"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="الموبايل"
          onChange={(e)=>setPhone(e.target.value)}
        />
      </div>
      <button onClick={()=>setNextForm(false)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#990707] hover:bg-red-600 text-white">
        التالي
      </button>
    </div>
    <div className={`${nextForm ? "hidden" : "space-y-4" }`}>
      <div className={"space-y-4"}>
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="كلمة المرور"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <input
          className="flex h-10 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full text-right"
          placeholder="تأكيد كلمة المرور"
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />
      </div>

      <button onClick={()=>handleSignup()} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#990707] hover:bg-red-600 text-white">
        تسجيل
      </button>
      <button onClick={()=>setNextForm(true)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#990707] hover:bg-red-600 text-white">
        رجوع
      </button>
    </div>
    </>
  );
};
export default Content;
