import { bachhoa, danhchoban, dealsieuhot, hangmoi, revodoi } from '../assets';

export const path = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    DETAILPRODUCT: '/:slug/:pid',
    PAGE_CATEGORY: '/danh-muc/:category_slug/:cid',
    PAGE_BRAND: '/thuong-hieu/:brand_slug',
    PAGE_SHOP: '/cua-hang/:name_shop/:sid',
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
