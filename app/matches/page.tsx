"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Matchs(){
  const[matches,setMatches] = useState([])





  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://alwathba.vercel.app/api/matchdetails/4')
        .then(data=>{
          setMatches(data.data.test)
        
        })
      } catch (error) {
        console.error('Failed to fetch users:', error);     
      }
    };
    fetchNews();
  }, []);


   const showData = matches.map((matche,key)=>{
    return(<tr className="border-b">
      <td className="px-4 py-3 font-medium">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.jpg"}
            alt="Home Team Logo"
            width={32}
            height={32}
            className="rounded-full"
            style={{ aspectRatio: "32/32", objectFit: "cover" }}
          >
              </Image>
          <span>الوثبة</span>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex flex-col">
          <span>{matche.matchDate.slice(0,10)}</span>
          <span className="text-muted-foreground">{matche.matchTime}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-center font-bold text-primary">{!matche.resultTeam1 ?0:matche.resultTeam1} - {!matche.resultTeam2?0:matche.resultTeam2}</td>
      <td className="px-4 py-3 text-right font-medium">
        <div className="flex items-center gap-2 justify-end">
          <span>{matche.team.name}</span>
          <Image
            src={"/logoo.jpg"}
            alt="Away Team Logo"
            width={32}
            height={32}
            className="rounded-full"
            style={{ aspectRatio: "32/32", objectFit: "cover" }}
          >
              </Image>
         
        </div>
      </td>
    </tr>
      
    )
   })

    return (

<div className="bg-[#0c243b]  text-red-50  bg-background rounded-lg border p-6 w-full ">
<div className="flex flex-row items-center justify-between mb-6 w-full">
  <h2 className="text-2xl font-bold">Football Matches</h2>
  <div className="flex items-center gap-2">
  </div>
</div>
<div className="overflow-x-auto">
  <table className="w-full table-auto">
    <thead>
      <tr className="bg-muted text-muted-foreground">
        <th className="px-4 py-3 text-left font-medium">Home Team</th>
        <th className="px-4 py-3 text-center font-medium">Date & Time</th>
        <th className="px-4 py-3 text-center font-medium">Score</th>
        <th className="px-4 py-3 text-right font-medium">Away Team</th>
      </tr>
    </thead>
    <tbody>
     
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
        {showData}
    </tbody>
  </table>
</div>
</div>
    )}