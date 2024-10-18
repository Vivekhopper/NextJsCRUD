"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

function page() {
 
  const router=useRouter();
  function handlefun(){
   
      router.push('/allProducts');
  }
  return (
    <>
      <h1 style={{textAlign:"center"}}>welcome</h1>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button onClick={() => router.push("/allProducts")} style={{backgroundColor:"#0070f3",color:"white"}}>
          Go to Mobile Details
        </button>
      </div>
    </>
  )
}

export default page
