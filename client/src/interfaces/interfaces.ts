interface Category {
    category: string;
    category_code: string;
    category_image: string;
    category_slug: string;
}
interface CartProduct {
    image: Array<string>;
    slug: string;
    title: string;
    Star: number;
    sold: number;
    inStock: number;
    discount: number;
    oldPrice: number;
    newPrice: number;
    _id: string;
}

interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    address: string;
    mobile: string;
    avatar_url: string;
    confirm: boolean;
    totalProduct: number;
}

export type { Category, UserInterface, CartProduct };
