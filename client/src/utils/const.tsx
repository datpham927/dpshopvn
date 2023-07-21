export const path = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    DETAILPRODUCT: '/:slug/:pid',
    PAGE_CATEGORY: '/danh-muc/:category_slug/:cid',
    PAGE_BRAND: '/thuong-hieu/:brand_slug',
    PAGE_SEARCH: '/tim-kiem/:title',
    PAGE_SHOP: '/cua-hang/:name_shop/:sid',
    PAGE_USER: '/user/account',
    PAGE_CART: '/cart',
    PAGE_PAYMENT: '/payment',
};

export const SEARCH_UTILITY = [
    {
        id: 1,
        image: danhchoban,
        title: 'Dành cho bạn',
    },
    {
        id: 2,
        image: bachhoa,
        title: 'Bách hóa dưới 99k',
    },
    {
        id: 3,
        image: dealsieuhot,
        title: 'Siêu hot',
    },
    {
        id: 4,
        image: hangmoi,
        title: 'Hàng mới',
    },
    {
        id: 5,
        image: revodoi,
        title: 'Rẽ vô đối',
    },
];

export const RATING_REVIEW = [
    { start: 1, text: 'Rất tệ' },
    { start: 2, text: 'Tệ ' },
    { start: 3, text: 'Bình thường' },
    { start: 4, text: 'Tốt ' },
    { start: 5, text: 'Rất tốt' },
];

export const SORT_BAR = [
    {
        id: 0,
        label: 'tất cả',
        sortBy: {
            sort: '',
        },
    },
    {
        id: 1,
        label: 'Phổ biến',
        sortBy: {
            sort: '-star',
        },
    },
    {
        id: 2,
        label: 'Bán chạy',
        sortBy: {
            sort: '-sold',
        },
    },
    {
        id: 3,
        label: 'Giá thấp đến cao',
        sortBy: {
            sort: 'newPrice',
        },
    },
    {
        id: 4,
        label: 'Giá cao đến thấp',
        sortBy: {
            sort: '-newPrice',
        },
    },
];

import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellIcon from '@mui/icons-material/Sell';
import { bachhoa, danhchoban, dealsieuhot, hangmoi, imgPayInCash, imgPayInVnpay, revodoi } from '../assets';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
export const SIDEBAR_USER = [
    {
        label: 'Thông tin tài khoản',
        path_name: 'profile',
        icon: <PersonIcon fontSize="small" style={{ color: 'rgb(155,155,155)' }} />,
    },
    {
        label: 'Đơn mua',
        path_name: 'purchase',
        icon: <ShoppingBasketIcon fontSize="small" style={{ color: 'rgb(155,155,155)' }} />,
    },
    {
        label: 'Quản lý bán hàng',
        path_name: 'sell',
        icon: <SellIcon fontSize="small" style={{ color: 'rgb(155,155,155)' }} />,
    },{
        label: 'Quản lý sản phẩm',
        path_name: 'sell',
        icon: <ProductionQuantityLimitsIcon fontSize="small" style={{ color: 'rgb(155,155,155)' }} />,
    },
];

export const PAYMENT_METHOD = {
    title: 'Chọn hình thức thanh toán',
    method: [
        {
            code: 'CASH',
            label: 'Thanh toán tiền mặt khi nhận hàng',
            img: imgPayInCash,
        },
        {
            code: 'VNPAY',
            label: 'Thanh toán bằng VNPAY',
            img: imgPayInVnpay,
        },
    ],
};
export const DELIVERY_METHOD = {
    title: 'Chọn hình thức giao hàng',
    method: [
        {
            code: 'FAST',
            label: 'Giao tiết kiệm',
        },
        {
            code: 'NOW',
            label: 'Giao siêu tốc',
        },
    ],
};

export const PURCHASE_TAB = [
    {
        tab: 1,
        title: 'Tất cả',
    },
    {
        tab: 2,
        title: 'Chờ xác nhận',
    },
    {
        tab: 3,
        title: 'Vận Chuyển',
    },
    {
        tab: 4,
        title: 'Đang giao',
    },
    {
        tab: 5,
        title: 'Hoàn thành',
    },
    {
        tab: 6,
        title: 'Đã hủy',
    },
];

export const SELL_TAB = [
    {
        tab: 1,
        title: 'Tất cả',
    },
    {
        tab: 2,
        title: 'Xác nhận đơn hàng',
    },
    {
        tab: 3,
        title: 'Vận Chuyển',
    }, 
    {
        tab: 4,
        title: 'Hoàn thành',
    },
    {
        tab: 5,
        title: 'Đã hủy',
    },
];
