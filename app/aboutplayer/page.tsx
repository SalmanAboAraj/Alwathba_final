import Image from "next/image";
import bgCard from "/public/Logo.jpg";

import Header from "../../component/header"
import Footer from "../../component/footer";
export default function Home() {
    return (<div className="flex flex-col gap-5 bg-[#0c243b]">
        <div className="flex bg-[#0c243b]">
          
        <div className="bg-[#0c243b] text-white flex">
  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold mb-6 mt-8 text-right">اسم اللاعب</h1>
        <p className="mb-6 text-right">محمد علي هو لاعب كرة قدم سوري، يلعب في مركز الهجوم مع نادي الوثبة والمنتخب السوري. ولد في 1 يناير 2000 في حمص، وبدأ مسيرته الكروية مع نادي الوثبة في عام 2018.
        </p>
      </div>
      <div>
        <div className=" p-4">
          <Image src={bgCard}
                            alt="bgCardPatern"
                            className="rounded-t-2xl w-5/6 aspect-w-3 aspect-h-4 "></Image>
        </div>
        <div className="    "></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-right">{" هذه بعض الإنجازات الرياضية لللاعب محمد علي مع نادي الوثبة والمنتخب السوري"}</h2>
        <ul className="space-y-2">
          <li className=' text-right'>بطل الدوري السوري مرتين •</li>
          <li className=' text-right'> هداف الدوري الوري مرة •</li>
          <li className=' text-right'>تأهل لكأس اسيا مع المنتخب السوري •</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4  text-right">: هذه بعض المعلومات الشخصية عن اللاعب محمد علي</h2>
        <ul className="space-y-2">
          <li className=' text-right'>الاسم الكامل: محمد علي عبد الرحمن •</li>
          <li className=' text-right'> الوزن: 50 كيلو غرام •</li>
          <li className=' text-right'> العمر: 24 سنة •</li>
          <li className=' text-right'> الجنسية: سوري •</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
        </div>)
        }