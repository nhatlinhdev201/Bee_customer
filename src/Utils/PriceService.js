
function calculateTotalPrice(otherService) {
  if (!otherService || otherService.length === 0) {
    return 0;
  }
  return otherService.reduce((total, detail) => {
    return total + (detail.ServicePriceDetail || 0);
  }, 0);
}

export const priceClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};

export const priceHourseClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};

export const priceOfficeClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};
export const priceClearningMachine = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceClearningAirConditioner = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairElectricity = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairAirConditioner = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairPipe = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairCamera = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairInterior = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price * values?.people + serviceOptionPrice + priceServiceDetail;
  return total;
};

export const getTotalPrice = (id, values, price) => {
  if (!values) {
    return 0;
  }
  if (id === 7 || id === 8 || id === 9) {
    let priceServiceDetail = calculateTotalPrice(values?.otherService);
    let rs = price * values?.people * values?.room + priceServiceDetail;
    return rs;
  } else {
    let priceServiceDetail = calculateTotalPrice(values?.otherService);
    let serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
    const total =
      price * values?.people + serviceOptionPrice + priceServiceDetail;
    return total;
  }
}


export const calculateTotalDetail = (data) => {
  try {
    let totalOptions = 0; // Tổng số lượng các option có TotalOption > 0
    let totalPrice = 0;   // Tổng tiền dịch vụ

    // Kiểm tra xem dữ liệu có phải là một mảng không và không rỗng
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Dữ liệu không hợp lệ.');
    }

    // Lặp qua từng đối tượng trong mảng dữ liệu
    data.forEach(item => {
      // Kiểm tra xem item có các thuộc tính cần thiết và hợp lệ
      if (
        item &&
        typeof item.TotalOption === 'number' &&
        typeof item.DetailPrice === 'number' &&
        typeof item.OptionPrice === 'number'
      ) {
        // Chỉ tính nếu TotalOption > 0
        if (item.TotalOption > 0) {
          totalOptions += item.TotalOption;
          totalPrice += item.DetailPrice + (item.OptionPrice * item.TotalOption);
        }
      } else {
        // Nếu dữ liệu không hợp lệ (thiếu thuộc tính hoặc không phải kiểu số)
        throw new Error('Dữ liệu không hợp lệ cho một hoặc nhiều item.');
      }
    });

    return { totalOptions, totalPrice };
  } catch (error) {
    // console.error('Lỗi khi tính toán tổng:', error.message);
    // Trả về 0 trong trường hợp lỗi
    return { totalOptions: 0, totalPrice: 0 };
  }
}