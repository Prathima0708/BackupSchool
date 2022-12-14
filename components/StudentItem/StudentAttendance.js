import { useNavigation } from "@react-navigation/native";
import { Checkbox } from 'react-native-paper';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import LgButton from "../UI/LgButton";

export var studentId, className, motherName, busNumber;
function StudentAttendance({
  teachers,
  class_name,
  section
  // id,
  // student_photo,
  // mother_name,
  // busnumber,
}) {

  const [present,setPresent]=useState(false);
  const [absent,setAbsent]=useState(false);
  const [holiday,setHoliday]=useState(false);
  const [statusBackground,setStatusBackground]=useState();
  const [selectedStatus,setSelectedStatus]=useState('');
  const [changePresentColor,setChangePresentColor]=useState();
  const [changeAbsentColor,setChangeAbsentColor]=useState();
  const [changeHolidayColor,setChangeHolidayColor]=useState();

  // const [test,settest]=useState('black');
  function presentBtnHandler(){
    setPresent(true);
    // setChangePresentColor("green");
    // setChangeAbsentColor('')
    // setChangeHolidayColor('')
    setSelectedStatus("Present");
    setStatusBackground("green");
  }
  function absentBtnHandler(){
    setAbsent(true);
    // setChangePresentColor('')
    // setChangeHolidayColor('')
    // setChangeAbsentColor("red");
    setSelectedStatus("Absent");
    setStatusBackground("red");
  }
  function holidatBtnGHandler(){
    setHoliday(true);
    // setChangeHolidayColor("darkblue");
    // setChangePresentColor('')
    // setChangeAbsentColor('')
    setSelectedStatus("Holiday");
    setStatusBackground("darkblue");
  }
  return (
    <>
    <ScrollView horizontal={false}>
    <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Class:</Text> */}
              {teachers}
            </Text>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Class:</Text> */}
              {section}
            </Text>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Class:</Text> */}
              {class_name}
            </Text>
          </View>
          <View style={{color:statusBackground,padding:10}}>
            <Text style={{color:'black',fontWeight:'bold'}}>{selectedStatus}</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Button title="P" color={changePresentColor} onPress={presentBtnHandler}/>
            <View style={styles.space} />
            <Button title="A" color={changeAbsentColor} onPress={absentBtnHandler}/>
            <View style={styles.space} />
            <Button title="H" color={changeHolidayColor} onPress={holidatBtnGHandler}/>
          </View>
    </View>
    </ScrollView>
    </>
  );
}
export default StudentAttendance;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  studentItem: {
    // width: "90%",

    padding: 11,
    marginVertical:  deviceWidth < 370 ? '2%' : '5%',
    // //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "#0D98BA",
    marginRight: 33,
  },
  description: {
    fontSize:  deviceWidth < 370 ? 16 : 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});
