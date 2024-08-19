import Image from "next/image";
const News = () => {
  return (
    <div className="flex flex-col gap-5 bg-[#0c243b]">
      <h1 className="m-auto bg-[#0c243b] py-10  text-2xl text-white ">
        تم تعيين رامي الجبلاوي مدرباً لفريق الوثبة
      </h1>
      <div className="mx-auto flex h-[300px] w-[400px]">
        <Image
          src="/images/example.png"
          alt="example1"
          width={400}
          height={400}
        />
      </div>
      <div className="text-m mx-auto w-[650px]  bg-[#0c243b] p-10 text-center  text-white ">
        قررت إدارة نادي الوثبة تشكيل الجهاز الفني والإداري لفريق رجال كرة القدم،
        بعد استقالة المدرب ماهر دالاتي عقب نهاية المباراة التي جمعت الوثبة مع
        الطليعة وانتهت بالتعادل السلبي. وجاء قرار إدارة النادي على النحو التالي:
        عمار مغربل مدير فريق، ورامي جبلاوي مدرباً، ومنهل كوسا وهايل المحيميد
        مساعدي مدرب، وشاكر الرزج مدرب حراس، وعبد الرحمن قراجه محلل أداء، وعبد
        الدايم أبو صلاح إداري، وسامر بيطار مسؤول علاقات عامة، وأحمد شدود معالج،
        وكمال اللبابيدي منسق إعلامي، وشادي عطا الله مصور، وسمير كحيل مسؤول
        تجهيزات.
      </div>
      <form>
        <input className='flex flex-col gap-5 text-m text-center items-center' />
        <button>send</button>

      </form>
    </div>
  );
};
export default News;
