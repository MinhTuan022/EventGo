// currencyUtils.js

export const convertToUSD = (vndAmount: any) => {
  const exchangeRate = 0.000043; // Ví dụ: tỷ giá 1 VNĐ = 0.000043 USD
  return (vndAmount * exchangeRate).toFixed(2);
};

export const formatCurrency = (amount:number) => {
  // Định dạng số tiền thành chuỗi, thêm dấu phẩy phân cách hàng nghìn
  const formattedAmount = amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
  return `${formattedAmount} đ`;
};
