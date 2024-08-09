import Header from "../../component/header"
import Footer from "../../component/footer";
import Image from "next/image";
export default function Home() {
  return (
    <>
    <div className="bg-[#0c243b] flex flex-col justify-center" dir="rtl">
      <div className="bg-[#0c243b] flex justify-center h-screen " dir="rtl">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[60%] h-[80%] m-auto   ">
          <div className="flex flex-col space-y-1.5 p-6">
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
                  id="name"
                  placeholder="أدخل اسمك"
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
              <div className="flex flex-col items-center space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="image"
                >
                  صورة الملف الشخصي
                </label>
                <Image alt="صورة الملف الشخصي" className="rounded-full bg-black" height={128} src="/placeholder.svg" width={128} />
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  تحميل صورة جديدة
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6">
            
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto">
              حفظ
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 float-left">
              الغاء
            </button>
          </div>
        </div>
      </div>
</div>
    </>
  );
}
