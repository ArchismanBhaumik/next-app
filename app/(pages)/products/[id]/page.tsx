"use client";
import React from "react";
import { useParams } from "next/navigation";
import { UseProduct } from "@/app/react-query/UseProducts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../Navbar";

const ProductPage = ({ item }: ProductCardProps) => {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, error, isError } = UseProduct(productId);
  console.log(data);
  if (isLoading) {
    return <>Product Details Loading!</>;
  }
  if (isError) {
    return <>Error Loading!</>;
  } else {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full h-fit max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <img
                src={data?.thumbnail}
                alt={data.title}
                className="w-full h-72 md:h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-2xl font-bold">
                    {data.title}
                  </CardTitle>
                </CardHeader>
                <p className="text-muted-foreground mb-3">{data.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-semibold text-green-600">
                    ${data.price}
                  </span>
                  <span className="text-yellow-500">⭐ {data.rating}</span>
                </div>

                <p
                  className={`font-medium ${
                    data.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <button
                disabled={data.stock === 0}
                className={`mt-5 w-full py-3 rounded-lg font-medium transition ${
                  data.stock > 0
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {data.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </Card>
        </div>
      </>
    );
  }
};

export default ProductPage;
