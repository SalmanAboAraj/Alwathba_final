"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";




export default function Store() {
      const [products,setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://alwathba.vercel.app/api/products')
      .then((data)=>

        {
          console.log(data.data)
          // setProducts(data.data);
    });
    } catch (error) {
      console.error('Failed to fetch products:', error);     
    }
  };
  fetchProducts();
}, []);

const showData = products.map((product,key)=>{
  const SIZE =product.productClassification[1]?.sizeId
  console.log(SIZE)
  const size= SIZE==1?'s':SIZE==2?'m':SIZE==3?'l':'xl'
  return(
  <div key={key} className="flex flex-col items-center">
        <img src={product.productMedia[0]?.imagePath}  alt="ladies T-Shirt(black)" className="h-52" />
        <p className="text-lg">{product.name}</p>
        <p className="text-xl font-bold">{size}</p>
        <p className="text-xl font-bold">{product.price}</p>
      </div>
)})



// console.log(products)
      return(
    <div className="min-h-screen bg-gray-900 p-8 text-white">
    <h1 className="text-3xl font-bold mb-8">Clothes</h1>
    <div className="grid grid-cols-2 gap-8">
      {showData}
      {/* <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="ladies T-Shirt(white)" className="h-52" />
        <p className="text-lg">ladies T-Shirt(white)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div> */}
      {/* <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="Men T-Shirt(black)" className="h-52" />
        <p className="text-lg">Men T-Shirt(black)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div> */}
      {/* <div className="flex flex-col items-center">
        <img src="/logoo.jpg" alt="Men T-Shirt(white)" className="h-52" />
        <p className="text-lg">Men T-Shirt(white)</p>
        <p className="text-xl font-bold">25.17 $</p>
      </div> */}
    </div>
  </div>)
};