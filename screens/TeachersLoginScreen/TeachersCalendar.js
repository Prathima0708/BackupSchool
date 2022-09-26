import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
  Button as Btn,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import { getMomentsAsync } from "expo-media-library";
import moment from "moment";
import VerticalLine from "../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import FeedBackDialog from "../../components/UI/FeedBackDialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TeachersCalendar = () => {
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forCalendarList, setForCalendarList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forCalendarForm, setForCalendarForm] = useState({ color: "black" });

  const [title, setEnteredTitle] = useState("");
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const enteredTitleIsValid = title.trim() !== "";
  const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const enteredDescriptionIsValid = description.trim() !== "";
  const descriptionInputIsInValid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

  // const [createdby, setEnteredcreatedby] = useState("");
  // const [enteredCreatedByTouched,setEnteredCreatedbyTouched]=useState(false)
  // const enteredCreatedByIsValid=createdby.trim()!=='';
  // const createdByInputIsInValid=!enteredCreatedByIsValid && enteredCreatedByTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [dateIsInCorrect, setDateIsInCorrect] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSame, SetIsSame] = useState(false);
  let i = 0;

  // async function logoutHandler() {
  //   try {
  //     const value = await AsyncStorage.getItem("key");
  //     if (value == null) {

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);

        //  const id = res.data.map((id) => id.created_by);
        //  console.log(id);
        setData(res.data);
        console.log(res.data);
        // console.log(data)
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
            // console.log('false')
          }
        }
        if (test == value) {
          // console.log("is same")
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // const variable=data.createdby === AsyncStorage.getItem('key')
  // const value=AsyncStorage.getItem('key')
  // try {
  //   const value = await AsyncStorage.getItem("key");

  //   if (value !== null) {
  //     console.log("This is the token :" + value);
  //   }
  // } catch (error) {
  //   // Error retrieving data
  // }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

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
    if (event.type == "set") {
      setFromText(fDate);
    } else {
      //cancel button clicked
    }

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

    if (event.type == "set") {
      setToText(tDate);
    } else {
      //cancel button clicked
    }
    // console.log(fDate);
  };

  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }
  function createdByChangeHandler(enteredValue) {
    setEnteredcreatedby(enteredValue);
  }
  function frmDateHandler(enteredValue) {
    setFromText(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToText(enteredValue);
  }

  function updateHandler() {
    // let id=data.id;
    // console.log(id)
    const FormData = {
      description: description,
      // created_by:createdby,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };

    console.log(FormData);

    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    // setEnteredCreatedbyTouched(true);
    // setCheckFromDateTouched(true);
    // setCheckToDateTouched(true);
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    // if(!enteredCreatedByIsValid){
    //   return;
    // }
    if (!enteredFromDateIsValid) {
      return;
    }

    if (!enteredtoDateIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `http://10.0.2.2:8000/school/Calendar/7/`,
            dataForm,
            {
              headers: headers,
            }
          );
          // const token = resLogin.data.token;
          // const userId = resLogin.data.user_id;
          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredDescription("");
      setEnteredTitle("");
      setFromText("");
      setToText("");
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      // setEnteredCreatedbyTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setForCalendarList({ fontWeight: "bold", color: "black" });
      setForCalendarForm({ color: "black" });
      setForCalendarForm({ fontWeight: "bold", color: "black" });
      setForCalendarList({ color: "black" });
    }
  }

  function buttonPressedHandler() {
    const FormData = {
      description: description,
      // created_by:createdby,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };

    console.log(FormData);

    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    if (isValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            showCalendar();
          },
        },
      ]);
    }
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    // setEnteredCreatedbyTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    // setCheckFromDateTouched(true);
    // setCheckToDateTouched(true);
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    // if(!enteredCreatedByIsValid){
    //   return;
    // }
    if (!enteredFromDateIsValid) {
      return;
    }

    if (!enteredtoDateIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(
            `http://10.0.2.2:8000/school/Calendar/`,
            dataForm,
            {
              headers: headers,
            }
          );
          // const token = resLogin.data.token;
          // const userId = resLogin.data.user_id;
          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredDescription("");
      setEnteredTitle("");
      setFromText("");
      setToText("");
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      // setEnteredCreatedbyTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setForCalendarList({ fontWeight: "bold", color: "black" });
      setForCalendarForm({ color: "black" });
      setForCalendarForm({ fontWeight: "bold", color: "black" });
      setForCalendarList({ color: "black" });
    }
  }
  function titleBlurHandler() {
    setEnteredTitleTouched(true);
  }
  function descriptionBlurHandler() {
    setEnteredDescriptionTouched(true);
  }
  // function createdbyBlurHandler(){
  //   setEnteredCreatedbyTouched(true);
  // }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
  }

  function showCalendarForm() {
    setForCalendarList({ fontWeight: "bold", color: "black" });
    setForCalendarForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
  }
  function showCalendar() {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
        console.log(res.data);

        setData(res.data);

        setForCalendarForm({ fontWeight: "bold", color: "black" });
        setForCalendarList({ color: "black" });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function editItem(id) {
    console.log(id);
    const filteredDummuyData = data.find((data) => data.id == id);

    setEnteredDescription(filteredDummuyData.description);
    //  setEnteredcreatedby(filteredDummuyData.created_by);
    setFromText(filteredDummuyData.startdate);
    setToText(filteredDummuyData.enddate);
    setEnteredTitle(filteredDummuyData.titlee);
    //  setEnteredMobile(filteredDummuyData.exam_name);
    //  setEnteredRouteName(filteredDummuyData.hour);
    setForCalendarList({ fontWeight: "bold", color: "black" });
    setForCalendarForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }
  function deleteItem(id) {
    console.log(id);
    const newFilteredData = data.filter((data) => data.id != id);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Calendar/${id}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Event</BgButton>
      </View> */}
      <View style={styles.BtnContainer}>
        <BgButton onPress={showCalendarForm} style={forCalendarList}>
          Add Event
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={showCalendar} style={forCalendarForm}>
          Show Event
        </BgButton>
      </View>
      {showForm && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Input
              // keyboardType="number-pad"
              placeholder="Title"
              onChangeText={titleChangeHandler}
              blur={titleBlurHandler}
              value={title}
              onSubmitEditing={Keyboard.dismiss}
              style={titleInputIsInValid && styles.errorBorderColor}
            />
            {titleInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter the title
              </Text>
            )}
            <Input
              placeholder="Description"
              onChangeText={descriptionChangeHandler}
              blur={descriptionBlurHandler}
              value={description}
              onSubmitEditing={Keyboard.dismiss}
              style={descriptionInputIsInValid && styles.errorBorderColor}
            />
            {descriptionInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter description
              </Text>
            )}
            {/* <Input 
            // keyboardType="number-pad"
            placeholder="created by"
            onChangeText={createdByChangeHandler}
            blur={createdbyBlurHandler}
            value={createdby}
            onSubmitEditing={Keyboard.dismiss}
            style={createdByInputIsInValid && styles.errorBorderColor}
          />
          {createdByInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Created by</Text>
            )} */}
            <View style={[{ flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 22,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText || fromDate}
                  placeholder="D/M/YYYY"
                  onSubmitEditing={Keyboard.dismiss}
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                  blur={fromDateBlurHandler}
                  onChangeText={frmDateHandler}
                />
                {fromDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter from date
                  </Text>
                )}
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
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 22,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  value={toText || toDate}
                  placeholder="D/M/YYYY"
                  onSubmitEditing={Keyboard.dismiss}
                  style={toDateInputIsInValid && styles.errorBorderColor}
                  blur={toDateBlurHandler}
                  onChangeText={toDateHandler}
                />
                {toDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter to date
                  </Text>
                )}
                {toShow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={toDate}
                    mode={tomode}
                    is24Hour={true}
                    display="default"
                    onChange={toDateChangeHandler}
                    //  minimumDate={fromDate}
                  />
                )}
              </View>
            </View>
            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Event</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {showList && (
        <ScrollView horizontal={true}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>TITLE</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>DESCRIPTION</Text>
              </View>
              {/* <View style={styles.th}>
              <Text style={styles.tableTitle}>created by</Text>
            </View> */}
              <View style={styles.th}>
                <Text style={styles.tableTitle}>START DATE </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>END DATE</Text>
              </View>

              <View style={styles.th}>
                <Text
                  style={{
                    margin: 7,
                    marginLeft: 50,
                    fontFamily: "MonsterratBold",
                    fontSize: 16,
                  }}
                >
                  ACTIONS
                </Text>
              </View>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 20,
                    }}
                  >
                    {data.titlee}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.description}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.startdate}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.enddate}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 120,
                    }}
                  >
                    <Ionicons
                      name="md-pencil-sharp"
                      size={24}
                      color="green"
                      onPress={() => editItem(data.id)}
                    />
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    <Ionicons
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => deleteItem(data.id)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersCalendar;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  errorBorderColor: {
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },

  btnSubmit: {
    marginTop: 217,
  },
  space: {
    width: 20,
    height: 20,
  },
  th: {
    padding: 5,

    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 5,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
