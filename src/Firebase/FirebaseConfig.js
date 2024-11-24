import { firebase } from "@react-native-firebase/database";
import Firebase from "../Constants/Firebase";

export const databaseOrder = firebase
  .app()
  .database(Firebase.DATABASE_URL)
  .ref("/order");

  
