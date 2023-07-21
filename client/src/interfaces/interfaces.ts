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
    quantity?: number;
}

interface ProductDetail extends CardProductItem {
    description: Array<string>;
    brand: string;
    brand_slug: string;
    category_code: string;
    userBought: Array<string>;
    views: number;
    infoProduct: [
        {
            name: string;
            value: string;
        },
    ];
    user: {
        _id: string;
        createdAt: string;
        firstName: string;
        lastName: string;
        followers: Array<string>;
        avatar_url: string;
        email: string;
    };
}

interface UserProfile {
    address: string;
    lastName: string;
    firstName: string;
    mobile: string;
    avatar_url: string;
    email: string;
}
interface UserDetail extends UserProfile {
    _id: string;
    isAdmin: boolean;
    confirm: boolean;
    totalProduct: number;
    createdAt: string;
    followings: Array<string>;
    followers: Array<string>;
}
interface Review {
    _id: string;
    comment: string;
    createdAt: string;
    images: Array<string>;
    likes: Array<string>;
    rating: number;
    user: {
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
    user: string;
    shopId: string;
    quantity: number;
    totalPrice: number;
    productId: {
        _id: string;
        title: string;
        slug: string;
        image_url: string;
        newPrice: number;
        oldPrice: number;
        discount: number;
    };
}

interface ProductByShop {
    _id: string;
    user: string;
    shopId: string;
    deliverDate: number;
    products: Array<{
        _id: string;
        title: string;
        slug: string;
        image_url: string;
        newPrice: number;
        oldPrice: number;
        discount: number;
        quantity: number;
        totalPrice: number;
    }>;
}

interface IOrderItem {
    shippingAddress: {
        fullName: string;
        detailAddress: string;
        village: string;
        district: string;
        city: string;
        phone: number;
    };
    _id: string;
    user: {
        _id: string;
        email: string;
        lastName: string;
        firstName: string;
    };
    products: Array<CardProductItem>;
    totalPrice: number;
    paymentMethod: string;
    isConfirm: boolean;
    isConfirmDelivery: boolean;
    isDelivering: boolean;
    delivery: boolean;
    isCanceled: boolean;
    isSuccess: boolean;
    shippingPrice: number;
    dateShipping: number;
    createdAt?:Date
}
export type {
    Category,
    UserProfile,
    UserDetail,
    CardProductItem,
    ProductDetail,
    Review,
    ProductInCart,
    ProductByShop,
    IOrderItem,
};
