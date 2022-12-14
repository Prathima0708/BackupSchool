// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
// import {
//   Avatar,
//   Title,
//   Caption,
//   Text,
//   TouchableRipple,
// } from "react-native-paper";
// import { Teacher, TeacherEmail } from "../../Login";

// const ParentsProfile = () => {
//   const navigation = useNavigation();
//   async function logoutHandler() {
//     try {
//       const value = await AsyncStorage.removeItem("token");
//       if (value == null) {
//         Alert.alert("Confirm Logout", "Are you Sure you want to logout?", [
//           {
//             text: "Cancel",

//             style: "cancel",
//             onPress: () => console.log("Data not removed"),
//           },
//           {
//             text: "Yes",
//             onPress: () => {
//               navigation.navigate("Login"), console.log("Data removed");
//             },
//           },
//         ]);
//       } else {
//         console.log("Data not removed");
//       }

//       // if (value == null) {
//       //   console.log("Token is removed"+value)
//       //   //  AsyncStorage.removeItem("token");
//       //   //  console.log(value)
//       //   //  navigation.navigate("Login");
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.userInfoSection}>
//         <View style={{ flexDirection: "row", marginTop: 15 }}>
//           <Avatar.Image
//             source={{
//               uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
//             }}
//             size={80}
//           />
//           <View style={{ marginLeft: 20 }}>
//             <Title
//               style={[
//                 styles.title,
//                 {
//                   marginTop: 15,
//                   marginBottom: 5,
//                 },
//               ]}
//             >
//               {Teacher}
//             </Title>
//             <Caption style={styles.caption}>{TeacherEmail}</Caption>
//           </View>
//         </View>
//       </View>

//       <View style={styles.userInfoSection}>
//         <View style={styles.row}>
//           <Ionicons name="location-sharp" size={20} color="black" />
//           <Text style={styles.headingStyle}>Kolkata, India</Text>
//         </View>
//         <View style={styles.row}>
//           <Ionicons name="call-sharp" size={20} color="black" />
//           <Text style={styles.headingStyle}>+91-900000009</Text>
//         </View>
//         <View style={styles.row}>
//           <Ionicons name="mail-sharp" size={20} color="black" />
//           <Text style={styles.headingStyle}>{TeacherEmail}</Text>
//         </View>
//       </View>

//       {/* <View style={styles.infoBoxWrapper}>
//         <View
//           style={[
//             styles.infoBox,
//             {
//               borderRightColor: "#dddddd",
//               borderRightWidth: 1,
//             },
//           ]}
//         >
//           <Title>???140.50</Title>
//           <Caption>Wallet</Caption>
//         </View>
//         <View style={styles.infoBox}>
//           <Title>12</Title>
//           <Caption>Orders</Caption>
//         </View>
//       </View> */}

//       <View style={styles.menuWrapper}>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Ionicons name="settings-sharp" size={25} color="#FF6347" />
//             <Text style={styles.menuItemText}>Settings</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Ionicons name="arrow-redo-sharp" size={25} color="#FF6347" />
//             <Text style={styles.menuItemText}>Tell Your Friends</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Ionicons
//               name="ios-person-circle-sharp"
//               size={25}
//               color="#FF6347"
//             />
//             <Text style={styles.menuItemText}>Support</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={logoutHandler}>
//           <View style={styles.menuItem}>
//             <Ionicons name="log-out-sharp" size={25} color="#FF6347" />
//             <Text style={styles.menuItemText}>Logout</Text>
//           </View>
//         </TouchableRipple>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ParentsProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     fontFamily: "HindRegular",
//     backgroundColor: "white",
//   },
//   headingStyle: {
//     color: "#777777",
//     marginLeft: 20,
//     fontFamily: "HindRegular",
//     fontSize: 18,
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 25,
//     fontFamily: "HindRegular",
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: "HindRegular",
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 18,
//     padding: 10,
//     paddingLeft: 0,
//     //lineHeight: 14,
//     fontFamily: "HindRegular",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 10,
//     fontFamily: "HindRegular",
//     fontSize: 18,
//   },
//   infoBoxWrapper: {
//     borderBottomColor: "#dddddd",
//     borderBottomWidth: 1,
//     borderTopColor: "#dddddd",
//     borderTopWidth: 1,
//     flexDirection: "row",
//     height: 100,
//   },
//   infoBox: {
//     width: "50%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   menuWrapper: {
//     marginTop: 10,
//   },
//   menuItem: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   menuItemText: {
//     color: "#5D6D7E",
//     marginLeft: 18,
//     fontFamily: "HindRegular",
//     fontSize: 20,
//     lineHeight: 26,
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import StudentItem from "../../../components/StudentItem/StudentItem";
import StudentProfile from "../../../components/StudentItem/StudentProfile";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import { Teacher, TeacherEmail } from "../../Login";
import { studentList } from "../ParentsLoginScreen";

const ParentsProfile = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const [students, setStudents] = useState([]);
  const navigation = useNavigation();
  async function logoutHandler() {
    try {
      const value = await AsyncStorage.removeItem("token");
      if (value == null) {
        Alert.alert("Confirm Logout", "Are you Sure you want to logout?", [
          {
            text: "Cancel",

            style: "cancel",
            onPress: () => console.log("Data not removed"),
          },
          {
            text: "Yes",
            onPress: () => {
              navigation.navigate("Login"), console.log("Data removed");
            },
          },
        ]);
      } else {
        console.log("Data not removed");
      }

      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      console.log(error);
    }
  }

  function editItem() {
    setShowForm(true);
    setShowList(false);
  }

  function renderStudentDetails(itemData) {
    return <StudentProfile {...itemData.item} />;
  }

  function cancelHandler() {
    setShowForm(false);
    setShowList(true);
  }

  return (
    <ScrollView persistentScrollbar={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {Teacher}
              </Title>
              <Caption style={styles.caption}>{TeacherEmail}</Caption>
            </View>
          </View>
        </View>

        {showList && (
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Ionicons name="location-sharp" size={20} color="black" />
              <Text
                style={{
                  color: "#777777",
                  marginLeft: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Kolkata, India
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="call-sharp" size={20} color="black" />
              <Text
                style={{
                  color: "#777777",
                  marginLeft: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                +91-900000009
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="mail-sharp" size={20} color="black" />
              <Text
                style={{
                  color: "#777777",
                  marginLeft: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                {TeacherEmail}
              </Text>
            </View>
            <View style={styles.row}>
              <Text
                style={{
                  color: "black",

                  fontFamily: "HindSemiBold",
                  fontSize: 20,
                  marginTop: 20,
                }}
              >
                Student Information
              </Text>
            </View>
            <ScrollView>
              <FlatList data={studentList} renderItem={renderStudentDetails} />
            </ScrollView>
          </View>
        )}

        {/* <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title>{studentList.student_name}</Title>

            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
        </View> */}

        {showList && (
          <View style={styles.menuWrapper}>
            {/* <TouchableRipple onPress={editItem}>
              <View style={styles.menuItem}>
                <Ionicons name="pencil-sharp" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Edit profile</Text>
              </View>
            </TouchableRipple> */}
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Ionicons name="settings-sharp" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Ionicons name="arrow-redo-sharp" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Tell Your Friends</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Ionicons
                  name="ios-person-circle-sharp"
                  size={25}
                  color="#FF6347"
                />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={logoutHandler}>
              <View style={styles.menuItem}>
                <Ionicons name="log-out-sharp" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        )}
        {showForm && (
          <View style={styles.inputForm}>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input placeholder="E-mail" />
            <View style={styles.btnSubmit}>
              <Button onPress={cancelHandler}>Cancel</Button>
              <Button>Update</Button>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ParentsProfile;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "HindRegular",
    backgroundColor: "white",
  },
  btnSubmit: {
    flexDirection: "row",
    marginTop: 30,
    //marginBottom: 30,
    width: "55%",
    marginLeft: deviceWidth < 370 ? 170 : 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    fontFamily: "HindRegular",
  },
  title: {
    fontSize: 24,
    fontFamily: "HindRegular",
    fontWeight: "bold",
  },
  caption: {
    fontSize: 18,
    padding: 10,
    paddingLeft: 0,
    //lineHeight: 14,
    fontFamily: "HindRegular",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#5D6D7E",
    marginLeft: 18,
    fontFamily: "HindRegular",
    fontSize: 20,
    lineHeight: 26,
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
});
