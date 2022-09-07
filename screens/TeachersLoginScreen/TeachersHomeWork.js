import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import SelectList from "react-native-dropdown-select-list";
import { Alert, Button as Btn, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

const TeachersHomework = () => {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);

  const [selectedsection, setSelectedsection] = useState("");
  const [sectiondata, setSectionData] = useState([]);

  const [classname, setEnteredClassName] = useState("");
  const [section, setEnteredSection] = useState("");
  const [subject, setEnteredSubject] = useState("");

  const [remark, setEnteredRemark] = useState();
  const [hw, setHW] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/school/Studentclass/")
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            //   key: item.id,
            value: item.class_name,
          };
        });
        let newArray1 = response.data.map((item) => {
          return {
            //   key: item.id,
            value: item.section,
          };
        });

        setData(newArray);
        setSectionData(newArray1);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  function classNameHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }
  function sectionHandler(enteredValue) {
    setEnteredSection(enteredValue);
  }
  function subjectChangeHandler(enteredValue) {
    setEnteredSubject(enteredValue);
  }

  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }
  function hwChangeHandler(enteredValue) {
    setHW(enteredValue);
  }

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();
    setFromText(fDate);
    //console.log(fDate);
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
    setToText(tDate);
    // console.log(fDate);
  };

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDERTERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffcient Permissions",
        "You need to grant camera permission to use this app."
      );
      return false;
    }
    return true;
  }
  async function takeImageHanlder() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  }
  let imagePreView = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreView = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  function buttonPressedHandler() {
    console.log(selected);
    console.log(selectedsection);
    // console.log(pickedImage);
    const formdata = {
      class_name: selected,
      section: selectedsection,
      subject: subject,
      homework_date: fromDate,
      due_date: toDate,
      homework_photo: pickedImage,
      remark: remark,
      description: hw,
    };
    console.log(formdata);

    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(
          "http://10.0.2.2:8000/school/Homework/",
          formdata,
          {
            headers: headers,
          }
        );

        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }

    storeData();
    setData("");
    setSectionData("");
    setEnteredSubject("");
    setFromText("");
    setToText("");
    setPickedImage("");
    setEnteredRemark("");
    setHW("");
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton>Add HomeWork</BgButton>
      </View>

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>CLASS NAME</Text>
          {/* <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={classNameHandler}
            value={classname}
          /> */}
          <View style={{ width: 250 }}>
            <SelectList
              setSelected={setSelected}
              data={data}
              placeholder="select class"
              // onSelect={() => alert(selected)} //{label: '', classname:'', section:''}
            />
          </View>
          <Text style={styles.labels}>SECTION</Text>

          <View style={{ width: 250 }}>
            <SelectList
              setSelected={setSelectedsection}
              data={sectiondata}
              placeholder="select section"
              //  value={sectiondata}
            />
          </View>
          <Text style={styles.labels}>SUBJECT</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={subjectChangeHandler}
            value={subject}
          />
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
              }}
            >
              HOMEWORK DATE:
            </Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showFromMode("date")}
            />
          </View>
          <TextInput style={styles.inputStyle} value={fromText} />

          {fromShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fromDate}
              mode={frommode}
              is24Hour={true}
              display="default"
              onChange={fromDateChangeHandler}
            />
          )}

          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
              }}
            >
              HOMEWORK DUE DATE:
            </Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showToMode("date")}
            />
          </View>
          <TextInput style={styles.inputStyle} value={toText} />
          {toShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={toDate}
              mode={tomode}
              is24Hour={true}
              display="default"
              onChange={toDateChangeHandler}
            />
          )}

          <Text style={styles.labels}>REMARK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={remarkChangeHandler}
            value={remark}
          />
          <Text style={styles.labels}>HOMEWORK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={hwChangeHandler}
            value={hw}
          />
          <View>
            <Text style={styles.labels}>UPLOAD IMAGE</Text>

            <View style={styles.imagePreView}>{imagePreView}</View>

            <Btn title="take image" onPress={takeImageHanlder} />
          </View>
          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Homework</Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TeachersHomework;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },

  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
        color: "black",
    borderWidth: 2,
    borderColor: "grey",
    // paddingHorizontal: 15,
    // paddingVertical: 7,
    borderRadius: 10,
    fontSize: 18,
    // margin:5
  },
  labels: {
    marginTop: 17,
  },
  btnSubmit: {
    marginTop: 17,
  },
  imagePreView: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
