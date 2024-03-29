// currencyUtils.js

export const convertToUSD = (vndAmount: any) => {
  const exchangeRate = 0.000043; // Ví dụ: tỷ giá 1 VNĐ = 0.000043 USD
  return vndAmount * exchangeRate;
};
