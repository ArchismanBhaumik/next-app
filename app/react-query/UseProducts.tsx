import React from 'react'
import {useQuery} from '@tanstack/react-query'


export const UseProducts= () => {
  const {data,isLoading,error,isError} =  useQuery({
    queryKey:['products'],
    queryFn:async ()=>{
      const res = await fetch("https://dummyjson.com/products?limit=100");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  })
  return {data,isLoading,error,isError}
}

export const UseProduct = (id:number)=>{
const {data,isLoading,error,isError}= useQuery({
    queryKey:['product',id],
    queryFn:async ()=>{
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      return res.json();
    }
  })
  return {data,isLoading,error,isError}
}