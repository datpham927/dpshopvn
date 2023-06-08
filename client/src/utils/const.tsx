import { bachhoa, danhchoban, dealsieuhot, hangmoi, revodoi } from '../assets';

export const path = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    DETAILPRODUCT:"/:slug/:pid"
};

export const searchUtility = [
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


export const ratingReview = [
    { start: 1, text: 'Rất tệ' },
    { start: 2, text: 'Tệ ' },
    { start: 3, text: 'Bình thường' },
    { start: 4, text: 'Tốt ' },
    { start: 5, text: 'Rất tốt' },
];