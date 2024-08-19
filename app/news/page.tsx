'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const newsArray = [
  {
    title: "تم تعيين رامي الجبلاوي مدرباً لفريق الوثبة",
    imageUrl: "/images/example.png",
    description: "قررت إدارة نادي الوثبة تشكيل الجهاز الفني والإداري لفريق رجال كرة القدم، بعد استقالة المدرب ماهر دالاتي عقب نهاية المباراة التي جمعت الوثبة مع الطليعة وانتهت بالتعادل السلبي. وجاء قرار إدارة النادي على النحو التالي: عمار مغربل مدير فريق، ورامي جبلاوي مدرباً، ومنهل كوسا وهايل المحيميد مساعدي مدرب، وشاكر الرزج مدرب حراس، وعبد الرحمن قراجه محلل أداء، وعبد الدايم أبو صلاح إداري، وسامر بيطار مسؤول علاقات عامة، وأحمد شدود معالج، وكمال اللبابيدي منسق إعلامي، وشادي عطا الله مصور، وسمير كحيل مسؤول تجهيزات."
  },
  {
    title: "تم تعيين رامي الجبلاوي مدرباً لفريق الوثبة",
    imageUrl: "/images/example.png",
    description: "قررت إدارة نادي الوثبة تشكيل الجهاز الفني والإداري لفريق رجال كرة القدم، بعد استقالة المدرب ماهر دالاتي عقب نهاية المباراة التي جمعت الوثبة مع الطليعة وانتهت بالتعادل السلبي. وجاء قرار إدارة النادي على النحو التالي: عمار مغربل مدير فريق، ورامي جبلاوي مدرباً، ومنهل كوسا وهايل المحيميد مساعدي مدرب، وشاكر الرزج مدرب حراس، وعبد الرحمن قراجه محلل أداء، وعبد الدايم أبو صلاح إداري، وسامر بيطار مسؤول علاقات عامة، وأحمد شدود معالج، وكمال اللبابيدي منسق إعلامي، وشادي عطا الله مصور، وسمير كحيل مسؤول تجهيزات."
  },
  {
    title: "تم تعيين رامي الجبلاوي مدرباً لفريق الوثبة",
    imageUrl: "/images/example.png",
    description: "قررت إدارة نادي الوثبة تشكيل الجهاز الفني والإداري لفريق رجال كرة القدم، بعد استقالة المدرب ماهر دالاتي عقب نهاية المباراة التي جمعت الوثبة مع الطليعة وانتهت بالتعادل السلبي. وجاء قرار إدارة النادي على النحو التالي: عمار مغربل مدير فريق، ورامي جبلاوي مدرباً، ومنهل كوسا وهايل المحيميد مساعدي مدرب، وشاكر الرزج مدرب حراس، وعبد الرحمن قراجه محلل أداء، وعبد الدايم أبو صلاح إداري، وسامر بيطار مسؤول علاقات عامة، وأحمد شدود معالج، وكمال اللبابيدي منسق إعلامي، وشادي عطا الله مصور، وسمير كحيل مسؤول تجهيزات."
  }
];

const News = () => {

const [news,setNews] = useState([])

useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts')
      .then(data=>data.data) // Ensure the endpoint matches your Next.js API route
       
    } catch (error) {
      console.error('Failed to fetch users:', error);     
    }
  };
  fetchNews();
}, []);

  return (
    <div className="flex flex-col gap-5 bg-[#0c243b]">
      {newsArray.map((news, index) => (
        <div key={index} className="flex flex-col items-center bg-[#0c243b] p-10 text-white">
          <h1 className="text-2xl py-4">{news.title}</h1>
          <div className="mx-auto flex h-[300px] w-[400px]">
            <Image
              src={news.imageUrl}
              alt={`example${index + 1}`}
              width={400}
              height={400}
            />
          </div>
          <Link href={`/news/${index}`}>
            <h1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto">Comment</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default News;
