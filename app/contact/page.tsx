import Header from "../../component/header"
import Footer from "../../component/footer";
export default function Home() {
    return (
      
<div className="bg-[#0c243b] flex flex-col content-stretch ">
<div className="flex justify-center py-10 h-screen ">
  <div className="rounded-lg border text-card-foreground shadow-sm w-[800px] bg-white p-8" data-v0-t="card">
    <div className="flex flex-col space-y-1.5 p-6 text-right">
      <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">اتصل بنا</h3>
      <p className="text-sm text-muted-foreground">أي سؤال أو ملاحظات؟ فقط اكتب لنا رسالة!</p>
    </div>
    <div className="p-6">
      <form className="grid gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="first-name" className="text-sm font-medium text-right">
              الاسم الأخير
            </label>
            <input
              className="text-right flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="first-name"
              placeholder="الاسم الأخير"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="last-name" className="text-sm font-medium text-right">
              الاسم الأول
            </label>
            <input
              className="text-right flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="last-name"
              placeholder="الاسم الأول"
            />
          </div>
        </div>
        <div className="text-right flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-right">
            البريد الإلكتروني
          </label>
          <input
            className="text-right flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="البريد الإلكتروني"
            type="email"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-right">
            رقم الهاتف
          </label>
          <input
            className="text-right flex  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  "
            id="phone"
            placeholder="رقم الهاتف"
            type="tel"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium text-right">
            الرسالة
            </label>
            <input
              className="text-right flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="message"
              placeholder="الرسالة "
            />
          </div>
        
        <button className="inline-flex  items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto ">
              إرسال
            </button>
      </form>
      
    </div>
  </div>
</div>
</div>    )
    }