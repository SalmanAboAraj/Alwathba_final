    import Image from "next/image";
    import bgCard from "/public/Logo.jpg";
    import Link from "next/link";
import Header from "@/component/header"
import Footer from "@/component/footer";
    export default function Home() {
        return (<div className="flex flex-col gap-5 bg-[#0c243b]">
                <div className="bg-[#0c243b] flex ">
                <main className="bg-[#0c243b] h-100vh  font-Kumbh px-[25px] py-[100px] relative  flex items-center justify-center">
                  <div className="flex flex-col gap-5">
                    <div className="bg-[#0c243b] text-white p-10"><h1 className="text-3xl text-center mb-6">عن النادي</h1><p className="mb-4 text-right">
                    نادي الوثبة الرياضي هو نادي رياضي سوري مقره في حمص. تأسس النادي في عام 1937 ويعتبر أحد أقدم وأنجح الأندية الرياضية في سوريا. يشتهر النادي بفريقه لكرة القدم الذي حقق العديد من البطولات المحلية والإقليمية. كما يضم النادي فروعا للعديد من الرياضات الأخرى مثل كرة السلة والطائرة والملاكمة والشطرنج والتنس والسباحة.   
                    </p><p className="mb-4  text-right">
                            يقدم النادي العديد من البرامج التدريبية وورش العمل والمحاضرات. فهدفه الأساسي هو تطوير مهارات اللاعبين وتعزيز
                            قدراتهم البدنية والذهنية والمهارية. ويحظى النادي بقيادة فريق من الخبراء المتمرسين الذين يكرسون وقتهم لتحقيق
                            الأهداف الرياضية والتعليمية والاجتماعية للنادي واللاعبين.
                        </p><p className="mb-4 text-right">يعتبر نادي الوثبة الرياضي رمزا للمقاومة والصمود في وجه الظلم والاضطهاد. فقد شهد تاريخ النادي العديد من المحن والمصاعب التي لم تثنه عن مواصلة نشاطه الرياضي والاجتماعي. كما أن النادي يحظى بشعبية كبيرة بين أبناء حمص وسوريا والعالم العربي، ويتميز بروح الأخوة والتضامن بين أعضائه وجماهيره. </p>
                        <br/><br/>
                        <h1 className="text-2xl text-center mt-10">الأعضاء</h1></div>
                 <div className="flex flex-row gap-5 justify-center   ">
                    <div className=" max-w-[250px] max-h-[275px] gap-5">
                        <div className="relative h-40 gap-5">
                            <Image  
                                src={bgCard}
                                alt="bgCardPatern"
                                className=" rounded-t-2xl w-full "
                            ></Image>
                        </div>
                        <div className="bg-[#FFFFFF] flex flex-col items-center pb-[28px] pt-[56px]">
                            <h1 className="font-bold text-[18px] mt-[10px]">
                                malaz
                                <div>منصب العضو</div>
                            </h1>
                        </div>
                        <div className="bg-[#FFFFFF] flex border-t-2 border-[#969696]/20 justify-evenly rounded-b-2xl p-[18px]">
                            <Link href={'/aboutplayer'} className="cursor-pointer bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                                المزيد من المعلومات
                            </Link>

                        </div>

                    </div>
                    <div className="   max-w-[250px] max-h-[275px] ">
                        <div className="relative h-40">
                            <Image  
                                src={bgCard}
                                alt="bgCardPatern"
                                className=" rounded-t-2xl w-full "
                            ></Image>
                        </div>
                        <div className="bg-[#FFFFFF] flex flex-col items-center pb-[28px] pt-[56px]">
                            <h1 className="font-bold text-[18px] mt-[10px]">
                                malaz
                                <div>منصب العضو</div>
                            </h1>
                        </div>
                        <div className="bg-[#FFFFFF] flex border-t-2 border-[#969696]/20 justify-evenly rounded-b-2xl p-[18px]">
                            <Link href={'/aboutplayer'} className="cursor-pointer bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                                المزيد من المعلومات
                            </Link>

                        </div>

                    </div>
                    <div className=" max-w-[250px] max-h-[275px] gap-5 ">
                        <div className="relative h-40">
                            <Image  
                                src={bgCard}
                                alt="bgCardPatern"
                                className=" rounded-t-2xl w-full "
                            ></Image>
                        </div>
                        <div className="bg-[#FFFFFF] flex flex-col items-center pb-[28px] pt-[56px]">
                            <h1 className="font-bold text-[18px] mt-[10px]">
                                malaz
                                <div>منصب العضو</div>
                            </h1>
                        </div>
                        <div className="bg-[#FFFFFF] flex border-t-2 border-[#969696]/20 justify-evenly rounded-b-2xl p-[18px]">
                            <Link href={'/aboutplayer'} className="cursor-pointer bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                                المزيد من المعلومات
                            </Link>

                        </div>

                    </div>
                    </div>
                    </div>
                </main>
                </div>
            </div>
        );
    }
