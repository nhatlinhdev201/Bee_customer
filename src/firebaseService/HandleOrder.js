import { firebase } from "@react-native-firebase/database";

export const databaseOrder = firebase
  .app()
  .database(
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
  )
  .ref("/order");

// Lắng nghe thay đổi đơn hàng cho khách hàng
export const listenForOrderUpdates = (clientId, setClientOrder) => {
  // console.log("Listening for order updates for client:", clientId);
  databaseOrder
    .orderByChild("ClientId")
    .equalTo(clientId)
    .on("value", (snapshot) => {
      const orders = snapshot.val();
      // console.log("Orders snapshot received:", orders);
      if (orders) {
        Object.keys(orders).forEach((orderId) => {
          const order = orders[orderId];
          setClientOrder(order); // Cập nhật trạng thái đơn hàng cho khách hàng
        });
      } else {
        setClientOrder(null); // Nếu không có đơn hàng nào
      }
    });

  // Lắng nghe sự kiện xóa đơn hàng
  databaseOrder
    .orderByChild("ClientId")
    .equalTo(clientId)
    .on("child_removed", (snapshot) => {
      console.log("Order removed:", snapshot.val());
      setClientOrder(null); // Khi đơn hàng bị xóa, cập nhật trạng thái
      // xóa dưới database
    });
};
export const OVG_FBRT_ListenOrderUpdate = (
  staffId,
  customerId,
  onUpdate,
  onDelete
) => {
  const orderRef = firebase
    .app()
    .database()
    .ref("/orders")
    .orderByChild("StaffId")
    .equalTo(staffId);

  const handleUpdate = (snapshot) => {
    const orders = snapshot.val();
    for (const key in orders) {
      if (orders[key].CustomerId === customerId) {
        onUpdate({ ...orders[key], key });
      }
    }
  };

  const handleDelete = (snapshot) => {
    const orders = snapshot.val();
    for (const key in orders) {
      if (orders[key].CustomerId === customerId) {
        console.log(`Order ${key} đã bị xóa`);
        onDelete(key);
      }
    }
  };

  orderRef.on("child_added", handleUpdate);
  orderRef.on("child_changed", handleUpdate);
  orderRef.on("child_removed", handleDelete);

  return () => {
    orderRef.off("child_added", handleUpdate);
    orderRef.off("child_changed", handleUpdate);
    orderRef.off("child_removed", handleDelete);
  };
};
export const placeOrder = async (
  clientId,
  orderId,
  dataBooking,
  latitudeCustomer,
  longitudeCustomer,
  bookingCode
) => {
  const newOrder = {
    ClientId: clientId,
    OrderId: orderId,
    DataService: dataBooking,
    StaffId: "",
    StaffName: "",
    StaffPhone: "",
    LatitudeCustomer: latitudeCustomer,
    LongitudeCustomer: longitudeCustomer,
    CreateAt: Date.now(),
    BookingCode: bookingCode,
    StatusOrder: 0,
  };
  try {
    setTimeout(() => {
      
    })
    await databaseOrder.child(orderId).set(newOrder);
    console.log("Order placed successfully:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error placing order: ", error);
    return null;
  }
};
// Lắng nghe đơn hàng mới cho nhân viên

// Xóa đơn hàng sau 10 phút
export const deleteOrderIfNotAccepted = (orderId, createAt) => {
  const currentTime = Date.now();
  if (currentTime - createAt > 10 * 60 * 1000) {
    databaseOrder.child(orderId).remove();
    console.log("Order deleted due to timeout:", orderId);
  }
};

// Kiểm tra và xóa đơn hàng chưa nhận sau 10 phút
export const checkAndDeleteExpiredOrders = () => {
  console.log("Checking and deleting expired orders");
  databaseOrder.on("value", (snapshot) => {
    const orders = snapshot.val();
    console.log("Orders snapshot received for deletion check:", orders);
    if (orders) {
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        if (order.StaffId === "") {
          deleteOrderIfNotAccepted(orderId, order.createAt);
        }
      });
    }
  });
};
