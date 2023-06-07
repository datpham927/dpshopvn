interface Category {
    category: string;
    category_code: string;
    category_image: string;
    category_slug: string;
}
interface CardProduct {
    image_url: string;
    images: Array<string>;
    slug: string;
    title: string;
    star: number;
    sold: number;
    inStock: number;
    discount: number;
    oldPrice: number;
    newPrice: number;
    _id: string;
}

interface ProductDetail extends CardProduct {
    description: Array<string>;
    brand: string;
    categoryCode: string;
    userBought: Array<string>;
    infoProduct: [
        {
            name: string;
            value: string;
        },
    ];
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
        followers: Array<string>;
        avatar_url: string;
        email: string;
    };
}

interface UserInterface {
    _id:string;
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

interface Review {
    _id: string;
    comment: string;
    createdAt: string;
    images: Array<string>;
    likes: Array<string>;
    rating: number;
    userId: { _id: string; avatar_url: string; email: string; lastName: string; firstName: string };
    __v: 0;
}

export type { Category, UserInterface, CardProduct, ProductDetail, Review };
