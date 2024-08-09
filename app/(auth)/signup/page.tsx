import Content from "@/component/content";
import Image from "next/image";
export default function Signup() {
  return (
    <div className="flex h-screen bg-[#0c243b]">
      <div className="m-auto w-full max-w-md p-6 space-y-6 rounded-lg bg-[#2c3e50] ">
        <h1 className="text-center text-xl font-bold text-white">
          ! أهلا بك في تطبيق نادي الوثبة
        </h1>
        <Content />
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-[#990707]">
        <div className="relative h-full">
          <Image src="/Logo.jpg" alt="Alwathba Sport Club" fill={true} />
        </div>
      </div>
    </div>
  );
}
