export const convertCurrencyUsd =(vndAmount:number)=> {
    const usdAmount = vndAmount / 23000; // Tỷ giá 1 USD = 23,000 VND (giả sử)
    return usdAmount.toFixed(2); // Làm tròn đến 2 chữ số thập phân
  }
  