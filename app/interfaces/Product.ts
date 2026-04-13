interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  sku: string;
  weight: number | null; // since your object didn't show a value
  minimumOrderQuantity: number;

  availabilityStatus: string;
  returnPolicy: string;
  shippingInformation: string;
  warrantyInformation: string;

  tags: string[];
  images: string[];
  thumbnail: string;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };

  reviews: Review[];
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductCardProps {
  item: Product;
}
interface NavbarProps{
    setCart : ()=>{}
}