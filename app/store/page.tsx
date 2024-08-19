import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const newsArray = [
    {
      title: "تم تعيين رامي الجبلاوي مدرباً لفريق الوثبة",
      imageUrl: "/images/example.png",
      description: "قررت إدارة نادي الوثبة تشكيل الجهاز الفني والإداري لفريق رجال كرة القدم، بعد استقالة المدرب ماهر دالاتي عقب نهاية المباراة التي جمعت الوثبة مع الطليعة وانتهت بالتعادل السلبي. وجاء قرار إدارة النادي على النحو التالي: عمار مغربل مدير فريق، ورامي جبلاوي مدرباً، ومنهل كوسا وهايل المحيميد مساعدي مدرب، وشاكر الرزج مدرب حراس، وعبد الرحمن قراجه محلل أداء، وعبد الدايم أبو صلاح إداري، وسامر بيطار مسؤول علاقات عامة، وأحمد شدود معالج، وكمال اللبابيدي منسق إعلامي، وشادي عطا الله مصور، وسمير كحيل مسؤول تجهيزات."
    },];


    export default function store() {
 return(
    <div className="min-h-screen bg-gray-900 p-8 text-white">
    <h1 className="text-3xl font-bold mb-8">Clothes</h1>
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <img src="/logoo.jpg"  alt="ladies T-Shirt(black)" className="h-52" />
        <p className="text-lg">ladies T-Shirt(black)</p>
        <p className="text-xl font-bold">size:s-m-L-XL</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="ladies T-Shirt(white)" className="h-52" />
        <p className="text-lg">ladies T-Shirt(white)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="Men T-Shirt(black)" className="h-52" />
        <p className="text-lg">Men T-Shirt(black)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="Men T-Shirt(white)" className="h-52" />
        <p className="text-lg">Men T-Shirt(white)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div>
    </div>
  </div>)
};

