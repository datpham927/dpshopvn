interface Category {
    category: string;
    categoryCode: string;
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

export type { Category ,UserInterface};
