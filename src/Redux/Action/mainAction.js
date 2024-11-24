import mainTypes from "./mainTypes";

export function closeError(params) {
  return {
    type: mainTypes.ERROR,
    params,
  };
}

export function API_spCallPostImage(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.PostImage,
      params,
      resolve,
      reject,
    });
  });
}
export function locationUpdate(location, dispatch) {
  return dispatch({
    type: mainTypes.LOCATION_TIME,
    payload: location,
  });
}

export function API_spCallServer(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CallServer,
      params,
      resolve,
      reject,
    });
  });
}

export function userLogin(user, dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: user,
  });
}

export function userLogout(dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: {},
  });
}

export function menuService(data, dispatch) {
  return dispatch({
    type: mainTypes.MENU_SERVICE,
    payload: data,
  });
}

export function slideShow(data, dispatch) {
  return dispatch({
    type: mainTypes.SLIDE_SHOW,
    payload: data,
  });
}

export function serviceNews(data, dispatch) {
  return dispatch({
    type: mainTypes.SERVICE_NEWS,
    payload: data,
  });
}

export function saveServiceConfirm(data, dispatch) {
  return dispatch({
    type: mainTypes.SERVICE_CONFIRM,
    payload: data,
  });
}

export function checkPermission(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CHECK_PERMISSION,
      params,
      resolve,
      reject,
    });
  });
}
// SERVICE_LIST
export function serviceList(data, dispatch) {
  return dispatch({
    type: mainTypes.SERVICE_LIST,
    payload: data,
  });
}

export function setMyOrdersAccepted(orders, dispatch) {
  return dispatch({
    type: mainTypes.MY_ORDER_ACCEPTED,
    payload: orders,
  });
}

export function acceptedOrder(order, dispatch) {
  return dispatch({
    type: mainTypes.ACCEPTED_ORDER,
    payload: order,
  });
}

export function customerId(CustomerId, dispatch) {
  return dispatch({
    type: mainTypes.CUSTOMER_ID,
    payload: CustomerId,
  });
}

export function DecryptString(params, dispatch) {
  //debugger
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.DecryptString,
      params,
      resolve,
      reject,
    });
  });
}

export function checkPermissioniOS(permissions, dispatch) {
  return dispatch({
    type: mainTypes.CHECK_PERMISSION_IOS,
    payload: permissions,
  });
}
