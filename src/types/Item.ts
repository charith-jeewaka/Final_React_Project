export interface Item {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  imagePublicId: string;
  active: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
