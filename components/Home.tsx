"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Products from '@/app/(pages)/products/Products';
const HomeComponent = () => {
const router = useRouter();
const goToProducts = ()=>{
    router.push('./products');
}
const goToCheckout =()=>{
    router.push('./checkout');
}
  return (
    <div>
        <Products />
    </div>
  )
}

export default HomeComponent