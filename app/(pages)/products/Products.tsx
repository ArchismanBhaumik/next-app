"use client";
import React, { useDeferredValue, useState } from "react";
import { UseProducts } from "../../react-query/UseProducts";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import slide1 from "@/assets/5464026.jpg";
import slide2 from "@/assets/E Commerce Shopping with Mobile App Storefront.png";
import slide3 from "@/assets/Express Delivery.png";
import slide4 from "@/assets/30121124_7674006-1-1024x614.webp";
import ProductCarousel from "./ProductCarousel";

const ProductCard = dynamic(() => import("./ProductCard"), {
  loading: () => <p>Loading card...</p>,
  ssr: false,
});

const Products = () => {
  const { data, isLoading, error, isError } = UseProducts();
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);

  if (isLoading) {
    return (
      <div className="flex items-center w-full">
        <h1 className="text-4xl font-bold w-2xl text-gray-600">Loading....</h1>
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return <h1>Error Loading data!</h1>;
  } else {
    const normalizedQuery = deferredSearchValue.trim().toLowerCase();
    const filteredProducts = data.products.filter((item: Product) => {
      if (!normalizedQuery) {
        return true;
      }

      return [item.title, item.brand, item.category, item.description]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalizedQuery));
    });

    return (
      <>
        <Navbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <ProductCarousel
          images={[slide1.src, slide2.src, slide3.src, slide4.src]}
        />
        {filteredProducts.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <h2 className="text-2xl font-semibold text-slate-800">
              No products found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try searching by product name, brand, category, or description.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item: Product) => {
            return <ProductCard item={item} key={item.id} />;
            })}
          </div>
        )}
      </>
    );
  }
};

export default Products;
