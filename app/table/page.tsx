import { JSX, SVGProps } from "react"

export default function table(){
return (
    <div className="bg-[#0c243b] text-red-50 rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">جدول ترتيب الدوري</h2>
        <div className="flex items-center gap-2">
          <TrophyIcon className="w-6 h-6 text-primary" />
          <span className="text-primary font-medium">الدوري السوري</span>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="px-4 py-2 text-lift">الفريق</th>
              <th className="px-4 py-2 text-right">النقاط</th>
              <th className="px-4 py-2 text-right">المباريات</th>
              <th className="px-4 py-2 text-right">فوز</th>
              <th className="px-4 py-2 text-right">تعادل</th>
              <th className="px-4 py-2 text-right">خسارة</th>   
              <th className="px-4 py-2 text-right">الاهداف له</th>
              <th className="px-4 py-2 text-right">الاهداف عليه</th>
              <th className="px-4 py-2 text-right">الفارق</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center font-bold">الوثبة</td>
              <td className="px-4 py-2 text-right font-bold">90</td>
              <td className="px-4 py-2 text-right font-bold">38</td>
              <td className="px-4 py-2 text-right ">29</td>
              <td className="px-4 py-2 text-right">3</td>
              <td className="px-4 py-2 text-right">6</td>
              <td className="px-4 py-2 text-right">93</td>
              <td className="px-4 py-2 text-right">40</td>
              <td className="px-4 py-2 text-right">53</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center ">الجيش</td>
              <td className="px-4 py-2 text-right">84</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">26</td>
              <td className="px-4 py-2 text-right">6</td>
              <td className="px-4 py-2 text-right">6</td>
              <td className="px-4 py-2 text-right">88</td>
              <td className="px-4 py-2 text-right">51</td>
              <td className="px-4 py-2 text-right">37</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">الفتوة</td>
              <td className="px-4 py-2 text-right">75</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">23</td>
              <td className="px-4 py-2 text-right">6</td>
              <td className="px-4 py-2 text-right">9</td>
              <td className="px-4 py-2 text-right">73</td>
              <td className="px-4 py-2 text-right">57</td>
              <td className="px-4 py-2 text-right">16</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">تشرين</td>
              <td className="px-4 py-2 text-right">73</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">22</td>
              <td className="px-4 py-2 text-right">7</td>
              <td className="px-4 py-2 text-right">9</td>
              <td className="px-4 py-2 text-right">65</td>
              <td className="px-4 py-2 text-right">40</td>
              <td className="px-4 py-2 text-right">25</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center"> حطين</td>
              <td className="px-4 py-2 text-right">69</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">21</td>
              <td className="px-4 py-2 text-right">6</td>
              <td className="px-4 py-2 text-right">11</td>
              <td className="px-4 py-2 text-right">67</td>
              <td className="px-4 py-2 text-right">63</td>
              <td className="px-4 py-2 text-right">4</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">الوحدة</td>
              <td className="px-4 py-2 text-right">67</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">18</td>
              <td className="px-4 py-2 text-right">13</td>
              <td className="px-4 py-2 text-right">7</td>
              <td className="px-4 py-2 text-right">72</td>
              <td className="px-4 py-2 text-right">47</td>
              <td className="px-4 py-2 text-right">25</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">الطليعة</td>
              <td className="px-4 py-2 text-right">66</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">19</td>
              <td className="px-4 py-2 text-right">9</td>
              <td className="px-4 py-2 text-right">10</td>
              <td className="px-4 py-2 text-right">66</td>
              <td className="px-4 py-2 text-right">46</td>
              <td className="px-4 py-2 text-right">20</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">النواعير</td>
              <td className="px-4 py-2 text-right">59</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">16</td>
              <td className="px-4 py-2 text-right">11</td>
              <td className="px-4 py-2 text-right">11</td>
              <td className="px-4 py-2 text-right">54</td>
              <td className="px-4 py-2 text-right">49</td>
              <td className="px-4 py-2 text-right">5</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">جبلة</td>
              <td className="px-4 py-2 text-right">59</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">16</td>
              <td className="px-4 py-2 text-right">11</td>
              <td className="px-4 py-2 text-right">11</td>
              <td className="px-4 py-2 text-right">55</td>
              <td className="px-4 py-2 text-right">52</td>
              <td className="px-4 py-2 text-right">3</td>
            </tr>
            <tr className="border-b hover:bg-muted/20 font-bold">
              <td className="px-4 py-2 text-center">الشرطة</td>
              <td className="px-4 py-2 text-right">58</td>
              <td className="px-4 py-2 text-right">38</td>
              <td className="px-4 py-2 text-right">16</td>
              <td className="px-4 py-2 text-right">10</td>
              <td className="px-4 py-2 text-right">12</td>
              <td className="px-4 py-2 text-right">55</td>
              <td className="px-4 py-2 text-right">53</td>
              <td className="px-4 py-2 text-right">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


