export const calculateDiscount = (vouchers, originalAmount) => {
  if (vouchers?.length === 0 || originalAmount === 0) {
    return {
      totalDiscount: 0,
      finalAmount: originalAmount,
    };
  }

  let totalDiscount = 0;

  vouchers.forEach((voucher) => {
    if (voucher?.TypeDiscount === 2) {
      // Fixed amount discount
      totalDiscount += voucher.Discount;
    } else if (voucher?.TypeDiscount === 1) {
      // Percentage discount
      totalDiscount += (originalAmount * voucher.Discount) / 100;
    }
  });

  // Ensure total discount does not exceed original amount
  totalDiscount = Math.min(totalDiscount, originalAmount);

  const finalAmount = originalAmount - totalDiscount;

  return {
    totalDiscount,
    finalAmount,
  };
};
