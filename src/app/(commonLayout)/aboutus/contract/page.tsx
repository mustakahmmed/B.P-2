"use client"
import { getBlogs } from '@/app/action/blog.action';
import React, { useEffect, useState } from 'react'

export default function Contruct() {
    const [data,setData] = useState()
  console.log(data);
 
  
  

  useEffect(()=>{
  (async()=>{
    const {data} = await getBlogs();
    setData(data);
   
    
  })()
  },[])
  return (
    <div>Contruct</div>
  )
}
