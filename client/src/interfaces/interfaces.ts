interface Category {
    category: string;
    category_code: string;
    category_image: string;
    category_slug: string;
}
interface CardProduct {
    image_url:string,
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
    categoryCode:string,
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

export type { Category, UserInterface, CardProduct, ProductDetail };
