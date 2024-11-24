/* 
Hàm xử lý reducer mảng danh sách booking để tránh trùng lặp đơn dịch vụ

@param [bookings] danh sách booking nhận về từ firebase

@return [bookings] Danh sách booking được gom lại theo bookingCode giống nhau

*/

const BookingsListMiddleware = (bookings) => {
  const bookingMap = new Map();

  if (bookings && bookings?.length > 0) {
    bookings.forEach((booking) => {
      const {
        BookingCode,
        BookingId,
        ClientId,
        CreateAt,
        DataService,
        LongitudeCustomer,
        LatitudeCustomer,
        OrderId,
        LatitudeStaff,
        LongitudeStaff,
        StaffName,
        StaffPhone,
        StaffId,
        StatusOrder,
      } = booking;

      // Tạo một đối tượng StaffInformation
      const staffInfo = {
        OrderId,
        LatitudeStaff: LatitudeStaff || null,
        LongitudeStaff: LongitudeStaff || null,
        StaffName: StaffName || null,
        StaffPhone: StaffPhone || null,
        StaffId: StaffId || null,
        StatusOrder: StatusOrder,
      };

      // Nếu BookingCode chưa tồn tại trong bookingMap, tạo một mục mới
      if (!bookingMap.has(BookingCode)) {
        bookingMap.set(BookingCode, {
          BookingCode,
          BookingId,
          ClientId,
          CreateAt,
          DataService,
          LatitudeCustomer,
          LongitudeCustomer,
          StaffInformation: [],
        });
      }

      // Thêm thông tin nhân viên vào danh sách StaffInformation của BookingCode hiện tại
      const currentBooking = bookingMap.get(BookingCode);
      currentBooking.StaffInformation.push(staffInfo);
    });

    // Đảm bảo rằng tất cả các đơn đều có chung định dạng các trường dữ liệu
    const formattedBookings = Array.from(bookingMap.values()).map(
      (booking) => ({
        BookingCode: booking.BookingCode,
        BookingId: booking.BookingId,
        ClientId: booking.ClientId,
        CreateAt: booking.CreateAt,
        DataService: booking.DataService,
        LatitudeCustomer: booking.LatitudeCustomer,
        LongitudeCustomer: booking.LongitudeCustomer,
        StaffInformation: booking.StaffInformation,
      })
    );

    return formattedBookings;
  } else {
    return [];
  }
};

export default BookingsListMiddleware;
