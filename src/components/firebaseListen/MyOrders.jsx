import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ListenOrderChange from "./ListenOrderChange";
import ListenOrderRemove from "./ListenOrderRemove";
import { mainAction } from "../../Redux/Action";
import { OVG_FBRT_ListenMyOrders } from "../../firebaseService/ListenOrder";
import { useNavigation } from "@react-navigation/native";
import BookingsListMiddleware from "../../Utils/BookingsListMiddleware";

const MyOrders = ({ setOrders = () => { }, isListen = true, isUpdate = true }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [myOrders, setMyOrders] = useState([]);
  const navi = useNavigation();

  useEffect(() => {
    const unsubscribe = OVG_FBRT_ListenMyOrders(
      userLogin?.Id,
      setMyOrders,
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userLogin?.Id]);

  useEffect(() => {
    if (isUpdate) {
      if (myOrders?.length > 0) {
        let bookings = BookingsListMiddleware(myOrders);
        mainAction.acceptedOrder(bookings?.length, dispatch);
      } else {
        mainAction.acceptedOrder(0, dispatch);
      }
    }
  }, [myOrders?.length]);

  return (
    <View>
      {
        isListen ? (
          <>
            <ListenOrderChange
              orderChange={orderChange}
              isModalVisible={modalOrderChangeVisible}
              setModalVisible={setModalOrderChangeVisible}
              onConfirm={handleConfirmOrderChange}
            />
            <ListenOrderRemove
              orderRemove={orderRemove}
              isModalVisible={modalOrderRemoveVisible}
              setModalVisible={setModalOrderRemoveVisible}
              onConfirm={handleConfirmOrderRemove}
              navi={navi}
            />
          </>
        ) : null
      }
    </View>
  )
};

export default MyOrders;
