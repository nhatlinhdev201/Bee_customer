import { Dimensions, StyleSheet } from "react-native";
import { colors, themeColors } from "./Colors";

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

const MainStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title1: {
    fontSize: 15,
    fontWeight: "bold",
    color: themeColors.textMain,
    textAlign: "center",
  },
  
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: themeColors.textMain,
  },
  titleOrange: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.ORANGE_PIZAZZ,
    textAlign: "center",
  },
  titlePrimary: {
    fontSize: 12,
    fontWeight: "500",
    color: themeColors.primary,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: themeColors.lightBackground,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
  },
  cardPoint: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  titleCardPoint: {
    color: colors.MAIN_BLUE_CLIENT,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    paddingRight: SCREEN_WIDTH * 0.04,
  },
  version: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: colors.BLACK,
  },
  CardIcon: {
    width: 24,
    height: 24,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  dot: {
    width: 10,
    height: 5,
    borderRadius: 10,
    margin: 2,
    backgroundColor: colors.WHITE,
  },
  dotActive: {
    backgroundColor: colors.YELLOW,
    width: 20,
    height: 5,
    borderRadius: 5,
    margin: 2,
  },
  pagination: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
  },
  regis: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  regisSub: {
    fontSize: 15,
    marginRight: 10,
  },
  regisBtn: {
    fontSize: 16,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: "900",
  },
  containerForm: {
    margin: 15,
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
  },
  subTitleForm: {
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
    margin: 10,
    fontSize: 15,
    marginBottom: 100,
  },
  subLinkForm: {
    fontSize: 15,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: "bold",
  },
  viewSubLinkForm: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  containerFormActive: {
    justifyContent: "center",
    margin: 15,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
    padding: 10,
  },
  viewImgFormActive: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  otpFormActive: {
    justifyContent: "center",
    alignItems: "center",
  },
  textErrFormActive: {
    color: colors.PRIMARY_RED,
    textAlign: "center",
  },
  textErr: {
    color: colors.ERROR,
  },
  titleFormActive: {
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 20,
    color: colors.MAIN_BLUE_CLIENT,
  },
  titleOtpFormActive: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  subTitleFormActive: {
    fontSize: 16,
    marginTop: 20,
  },
  codeFieldRootFormActive: {
    marginTop: 20,
    width: "70%",
    marginLeft: 20,
    marginRight: 20,
  },
  cellRootFormActive: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  focusCellFormActive: {
    borderColor: "blue",
  },
  countdownTextFormActive: {
    fontSize: 14,
    margin: 30,
    color: colors.MAIN_BLUE_CLIENT,
  },
  boxFormActive: {
    height: 50,
  },
  titleForgotPasswordForm: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  containerAuthHome: {
    marginBottom: 100,
    alignItems: "center",
  },
  textAuthHome: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  titleActiveAccount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  containerLogin: {
    justifyContent: "center",
  },
  titleLogin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  containerForgot: {
    flex: 1,
  },
  contentContainerForgot: {
    paddingBottom: 20,
  },
  subTitleUpdateProfile: {
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 20,
    margin: 40,
    color: colors.MAIN_BLUE_CLIENT,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
    paddingTop: Platform.OS === "android" ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.06,
    paddingBottom: 8,
    backgroundColor: colors.PRIMARY_LIGHT
  },
  titleUpdateProfile: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 40,
    color: colors.MAIN_BLUE_CLIENT,
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowFlexEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flexRowFlexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexRowFlexStartAlignCenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    verticalAlign: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  containerClient: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  textClieni: {
    fontSize: 24,
    marginBottom: 20,
  },
  btnTitleClient: {
    fontSize: 18,
    color: colors.WHITE,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
  },
  contentContainerClient: {
    backgroundColor: colors.WHITE,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  cardConfirmContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    borderColor: colors.GRAY,
    borderWidth: 1,
  },
  cardLabelConfirm: {
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: "bold",
    color: themeColors.textMain,
  },
  cardSubLabelConfirm: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
  },
  cardTitleConfirm: {
    fontSize: 16,
    color: colors.BLACK,
  },
  cardSubTitleConfirm: {
    fontSize: 16,
    color: colors.BLACK,
  },
  txtTotalPrice: {
    fontSize: 20,
    color: themeColors.textYellow,
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  labelTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: themeColors.textMain,
  },
  cardJob: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  titleCardJob: {
    color: themeColors.textMain,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    paddingRight: SCREEN_WIDTH * 0.04,
  },
  line: {
    backgroundColor: themeColors.black,
    marginBottom: 5,
    marginTop: 5,
    height: 1,
    width: SCREEN_WIDTH * 0.7,
  },
  rowMargin: {
    marginVertical: 7,
  },
  textCardJob: {
    color: themeColors.primaryText,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "400",
    paddingRight: SCREEN_WIDTH * 0.04,
  },
  textCardLocation: {
    color: colors.MAIN_BLUE_CLIENT,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  titleContentModal: {
    color: colors.MAIN_COLOR_CLIENT,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: SCREEN_WIDTH * 0.04,
    paddingRight: SCREEN_WIDTH * 0.04,
  },
  tabContainerDefault: {
    height: 230,
    justifyContent: "center",
    borderRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    padding: 5,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  textDefault: {
    fontSize: 16,
    textAlign: "center",
    color: colors.MAIN_BLUE_CLIENT,
  },
  title_1: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  subtitle_1: {
    fontSize: 16,
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  mdBottom_modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  mdBottom_modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: SCREEN_HEIGHT * 0.6,
  },
  mdBottom_dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  mdBottom_option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  mdBottom_optionText: {
    fontSize: 16,
  },
  mdBottom_noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mdBottom_noDataText: {
    fontSize: 16,
    color: "#777",
  },
  mdBottom_closeButton: {
    padding: 15,
    backgroundColor: "#F44336",
    borderRadius: 5,
    marginTop: 10,
  },
  mdBottom_closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cardStaff: {
    padding: 5,
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardPhoneCall: {
    backgroundColor: themeColors.cancel,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    minWidth: 80,
  },
  cardBtnViewLocation: {
    backgroundColor: themeColors.confirm,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    minWidth: 80,
  },
  textCardPhoneCall: {
    color: colors.WHITE,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default MainStyles;
