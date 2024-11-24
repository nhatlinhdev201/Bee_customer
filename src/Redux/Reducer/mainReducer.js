import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: {},
  userLogin: {},
  menuService: [],
  SERVICELIST: [],
  acceptedOrder: 0,
  myOrdersAccepted: [],
  serviceConfirm: {},
  serviceNews: [],
  slideShow: [],
  checkPermissioniOS: {},
  customerId: null,
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case mainTypes.LOCATION_TIME:
      return {
        ...state,
        locationTime: action.payload,
      };
    case mainTypes.USER_PROFILE:
      return {
        ...state,
        userLogin: action.payload,
      };
    case mainTypes.MENU_SERVICE:
      return {
        ...state,
        menuService: action.payload,
      };
    case mainTypes.SERVICE_LIST: // Danh sách dịch vụ của khách hàng
      return {
        ...state,
        SERVICELIST: action.payload,
      };
    case mainTypes.ACCEPTED_ORDER:
      return {
        ...state,
        acceptedOrder: action.payload,
      };
    case mainTypes.MY_ORDER_ACCEPTED:
      return {
        ...state,
        myOrdersAccepted: action.payload,
      };
    case mainTypes.CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload,
      };
    case mainTypes.CHECK_PERMISSION_IOS:
      return {
        ...state,
        checkPermissioniOS: action.payload,
      };
    default:
      return state;
  }
}
