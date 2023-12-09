interface Category {
    category: string;
    category_code: string;
    category_image: string;
    category_slug: string;
}
interface IProductItem {
    image_url: string;
    images: Array<string>;
    slug: string;
    title: string;
    star: number;
    sold: number;
    in_stock: number;
    discount: number;
    old_price: number;
    new_price: number;
    _id: string;
    quantity?: number;
    brand?: string;
}

interface ProductDetail extends IProductItem {
    description: string;
    brand_slug: string;
    category_code: string;
    category_name: string;
    userBought: Array<string> ;
    views: number;
    infoProduct: [
        {
            name: string;
            value: string;
        },
    ];
    user?: {
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
    _id: string;
    address: string;
    mobile: number;
    lastName: string;
    firstName: string;
    avatar_url: string;
    email: string;
}
interface UserDetail extends UserProfile {
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
        new_price: number;
        old_price: number;
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
        new_price: number;
        old_price: number;
        discount: number;
        quantity?: number;
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
    shop: {
        _id: string;
        email: string;
        lastName: string;
        firstName: string;
    };
    products: Array<IProductItem>;
    totalPrice: number;
    paymentMethod: string;
    is_confirm: boolean;
    is_confirm_delivery: boolean;
    is_delivering: boolean;
    is_canceled: boolean;
    is_success: boolean;
    shippingPrice: number;
    dateShipping: number;
    createdAt?: Date;
}

interface INotification {
    shopId: string;
    image_url: string;
    title: string;
    subtitle: string;
    link: string;
    userId?: string;
    user_name?: string;
    is_watched?: boolean;
}

interface Conversation {
    _id: '';
    members: Array<{
        user: UserProfile;
        isWatched: boolean;
    }>;
    updatedAt:string
}
export type {
    Conversation,
    Category,
    UserProfile,
    UserDetail,
    IProductItem,
    ProductDetail,
    Review,
    ProductInCart,
    ProductByShop,
    IOrderItem,
    INotification,
};
