import Image from "next/image";
import bgCard from "../../../public/Logo.jpg";
import Header from "../../component/header"
import Footer from "../../component/footer";
import axios from 'axios';
import { useEffect, useState } from "react";
export default function Home() {



  // const updateUser = async (userId: any, userData: any) => {
  //   try {
  //     const response = await axios.post(/api/users/${userId}, userData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     throw error;
  //   }
  // };
  // const UpdateUserForm = ({ userId }) => {
  //   const [formData, setFormData] = useState({
  //     Fname: '',
  //     Lname: '',
  //     email: '',
  //     mobile: '',
  //     password: '',
  //   });
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState(null);
  
  //   const handleChange = (e: { target: { name: any; value: any; }; }) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };
  // const handleSubmit = async (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   setSuccessMessage(null);

  //   try {
  //     const response = await updateUser(userId, formData);
  //     setSuccessMessage(response.message);
  //   } catch (error) {
  //     setError('Failed to update user information');
  //   } finally {
  //     setLoading(false);
  //   }
  //   }  };

  return (
 
   <>
   
    <div className="bg-[#0c243b] flex flex-col justify-center" dir="rtl">
   {/* <form onSubmit={handleSubmit}> */}
      <div className="bg-[#0c243b] flex justify-center h-screen " dir="rtl">
        <div className="bg-[#ffff] rounded-lg border bg-card text-card-foreground shadow-sm w-[60%] h-[80%] m-auto   ">
          <div className=" flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              الملف الشخصي
            </h3>
            <p className="text-sm text-muted-foreground">
              قم بتحديث معلومات ملفك الشخصي.
            </p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 items-start gap-8">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  الاسم
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="Fname"
                  placeholder="الاسم الأول"
                />
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="Lname"
                  placeholder="الاسم الثاني"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  البريد الإلكتروني
                </label>
                <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="أدخل بريدك الإلكتروني"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="mobile"
              >
                رقم الهاتف المحمول
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mobile"
                placeholder="أدخل رقم هاتفك المحمول"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                   كلمة المرور   
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mobile"
                placeholder=" كلمة المرور"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                صورة الملف الشخصي
              </label>
              <img
                alt="صورة الملف الشخصي"
                className="rounded-full bg-black"
                height="128"
                src="/placeholder.svg"
                width="128"
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                تحميل صورة جديدة
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center p-2">
          
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto">
            حفظ
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 float-left">
              الغاء
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
</div>
    </>
  );
}