"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToCart } from "@/app/redux/cartSlice";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item }: ProductCardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleAddToCart = () => {
    if (!user.name) {
      toast.warning("User needs to login first!");
      return;
    }

    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
      }),
    );
    toast.success(`${item.title} added to cart`);
  };

  return (
    <>
      <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-fit h-fit object-cover rounded-t-2xl"
          loading="lazy"
          onClick={() => router.push(`/products/${item.id}`)}
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {item.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{item.brand}</p>
        </CardHeader>
        <CardContent className="space-y-3 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">
                ${item.price}
              </span>
              <span className="text-sm text-yellow-500">⭐ {item.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {item.description}
            </p>
            <p
              className={`text-sm font-medium mt-1 ${
                item.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={item.stock === 0}
            className={`w-full mt-3 py-2 rounded-lg font-medium transition ${
              item.stock > 0
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ProductCard);
