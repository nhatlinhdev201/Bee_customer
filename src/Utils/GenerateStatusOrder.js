export const GenerateStatusOrder = (status) => {
  if (status === 0) {
    return "Chưa có nhân viên nhận đơn";
  }
  if (status === 1) {
    return "Nhân viên đang chuẩn bị";
  }
  if (status === 2) {
    return "Nhân viên đang di chuyển";
  }
  if (status === 3) {
    return "Nhân viên đang làm việc";
  }
  return "Chưa có nhân viên nhận đơn";
};
