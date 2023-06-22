interface Category {
    category: string;
    category_code: string;
    category_image: string;
    category_slug: string;
}
interface CardProductItem {
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
    category_name: string;
}

interface ProductDetail extends CardProductItem {
    description: Array<string>;
    brand: string;
    category_code: string;
    userBought: Array<string>;
    infoProduct: [
        {
            name: string;
            value: string;
        },
    ];
    createdby: {
        _id: string;
        createdAt: string;
        firstName: string;
        lastName: string;
        followers: Array<string>;
        avatar_url: string;
        email: string;
    };
}

interface UserInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    address: string;
    mobile: string;
    avatar_url: string;
    confirm: boolean;
    totalProduct: number;
    createdAt: string;
    followings: Array<string>;
}

interface Review {
    _id: string;
    comment: string;
    createdAt: string;
    images: Array<string>;
    likes: Array<string>;
    rating: number;
    createdby: {
        _id: string;
        avatar_url: string;
        email: string;
        lastName: string;
        firstName: string;
        createdAt: string;
        followers: Array<string>;
    };
    __v: 0;
}

interface ProductInCart {
    _id: string;
    createdby: string;
    shopId: string;
    quantity: string;
    unitPrice: number;
    totalPrice: number;
}

export type { Category, UserInterface, CardProductItem, ProductDetail, Review, ProductInCart };
