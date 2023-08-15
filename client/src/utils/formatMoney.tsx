export const formatMoney= (number: number )=>number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
