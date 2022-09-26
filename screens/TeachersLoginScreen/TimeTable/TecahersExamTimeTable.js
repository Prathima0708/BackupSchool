import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Input from "../../../components/UI/Input";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../TeachersHome";
import Button from "../../../components/UI/Button";
import { DataTable } from "react-native-paper";
const TecahersExamTimeTable = () => {
  const [selectedExamTimeTable, setSelectedExamTimeTable] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedExamTimeTable.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [datemode, setDateMode] = useState("date");
  const [ExamTimeTableData, setExamTimeTableData] = useState([]);

  const [examName, setEnteredExamName] = useState("");
  const [enteredExamNameTouched, setEnteredExamNameTouched] = useState(false);
  const enteredExamNameIsValid = examName.trim() !== "";
  const selectExamNameIsInValid =
    !enteredExamNameIsValid && enteredExamNameTouched;

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

  const [totalMarks, setEnteredTotalMarks] = useState("");
  const [enteredMarksTouched, setEnteredMarksTouched] = useState(false);
  const enteredMarksIsValid = totalMarks.trim() !== "";
  const marksInputIsInValid = !enteredMarksIsValid && enteredMarksTouched;

  const [hour, setEnteredHour] = useState("");
  const [enteredHourTouched, setEnteredHourTouched] = useState(false);
  const enteredHourIsValid = hour.trim() !== "";
  const hourInputIsInValid = !enteredHourIsValid && enteredHourTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [showform, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(true);
  const [showExamData, setShowExamData] = useState([]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      // console.log(keyboardStatus);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      //  console.log(keyboardStatus);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Exam/`);
        console.log(res.data);

        setShowExamData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }, []);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/school/Studentclass/")
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });

        setExamTimeTableData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function addExamTimeTableHandler() {
    let selectedData = selectedExamTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    const FormData = {
      exam_name: examName,
      start_date: fromDate,
      end_date: toDate,
      Total_marks: totalMarks,
      hour: hour,
      class_name: class_name,
    };
    console.log(FormData);

    setEnteredExamNameTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredMarksTouched(true);
    setEnteredHourTouched(true);
    setEnteredSelectedTouched(true);
    if (!enteredExamNameTouched) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }
    if (!enteredHourIsValid) {
      return;
    }
    if (!enteredMarksIsValid) {
      return;
    }
    if (!enteredSelcetdIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(
            "http://10.0.2.2:8000/school/Exam/",
            dataForm,
            {
              headers: headers,
            }
          );
          const token = resLogin.data.token;
          const userId = resLogin.data.user_id;
          console.log(token);
          // Token = token;
          // UserId = userId;
        } catch (error) {
          console.log(error);
        }
      }
      storeData();

      setEnteredExamName("");
      setFromText("");
      setToText("");
      setEnteredTotalMarks("");
      setEnteredHour("");
      setEnteredExamNameTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredMarksTouched(false);
      setEnteredHourTouched(false);
      setEnteredSelectedTouched(false);
      setShowExamList(true);
      setShowForm(false);
    }
  }
  function examNameChangeHandler(enteredValue) {
    setEnteredExamName(enteredValue);
  }

  function totalMarksChangeHandler(enteredValue) {
    setEnteredTotalMarks(enteredValue);
  }
  function hourChangeHandler(enteredValue) {
    setEnteredHour(enteredValue);
  }
  function classNameChangeHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setDateMode(currentToMode);
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
    }

    // console.log(fDate);
  };

  function viewExam() {
    setShowForm(true);
    setShowExamList(false);
  }

  function examBlurHandler() {
    setEnteredExamNameTouched(true);
  }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHanlder() {
    setEnteredtoDateTouched(true);
  }
  function markBlurHanlder() {
    setEnteredMarksTouched(true);
  }
  function hourBlurHanlder() {
    setEnteredHourTouched(true);
  }

  return (
    <>
      {showExamList && (
        <>
          <View style={styles.timetablebtn}>
            <Button onPress={viewExam}>Add new</Button>
          </View>
          <ScrollView horizontal={true}>
            <DataTable style={styles.container}>
              <DataTable.Header style={styles.tableHeader}>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> EXAM NAME</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> START DATE</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> END DATE</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>TOTAL MARKS</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>HOUR</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> CLASSNAME</Text>
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
              {showExamData.map((data, key) => (
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 20,
                    }}
                  >
                    {data.exam_name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.start_date}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.end_date}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.Total_marks}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.hour}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.class_name}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 110,
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
                      //marginLeft: 15,
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
        </>
      )}
      {showform && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Input
              style={selectExamNameIsInValid && styles.errorBorderColor}
              onChangeText={examNameChangeHandler}
              value={examName}
              placeholder="Exam Name"
              blur={examBlurHandler}
              onSubmitEditing={Keyboard.dismiss}
            />
            {selectExamNameIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter exam name</Text>
            )}
            <View
              style={[
                styles.container,
                {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 15,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText}
                  placeholder="Enter From Date"
                  blur={fromDateBlurHandler}
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                />
                {fromDateInputIsInValid && (
                  <Text style={{ color: "red", left: 20 }}>
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
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 20,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  value={toText}
                  placeholder="Enter To Date"
                  blur={toDateBlurHanlder}
                  style={toDateInputIsInValid && styles.errorBorderColor}
                />
                {toDateInputIsInValid && (
                  <Text style={{ color: "red", left: 20 }}>Enter to date</Text>
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
            <Input
              onChangeText={totalMarksChangeHandler}
              value={totalMarks}
              placeholder="Total Marks"
              style={marksInputIsInValid && styles.errorBorderColor}
              onSubmitEditing={Keyboard.dismiss}
              blur={markBlurHanlder}
            />
            {marksInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter to date</Text>
            )}
            <Input
              onChangeText={hourChangeHandler}
              placeholder="Hour"
              value={hour}
              style={hourInputIsInValid && styles.errorBorderColor}
              onSubmitEditing={Keyboard.dismiss}
              blur={hourBlurHanlder}
            />
            {hourInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter to date</Text>
            )}
            <Text style={styles.labels}>Class Name</Text>

            <View style={{ width: 350, fontSize: 18, marginTop: 3 }}>
              <SelectList
                setSelected={setSelectedExamTimeTable}
                data={ExamTimeTableData}
                placeholder="select class"
                style={{ fontSize: 16 }}
                boxStyles={selectInputIsInValid && styles.errorSelectedColor}
              />
            </View>
            <View style={styles.btnSubmit}>
              <Button onPress={addExamTimeTableHandler}>
                Add Exam TimeTable
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
      {keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )}
    </>
  );
};

export default TecahersExamTimeTable;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    fontSize: 24,
  },
  title: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -10,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    //margin: 5,
  },
  labels: {
    margin: 5,
    fontFamily: "HindRegular",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    flexDirection: "row",
    marginTop: 27,
    marginBottom: 69,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  timetablebtn: {
    width: "40%",

    paddingVertical: 20,
    paddingHorizontal: 0,

    marginLeft: 230,
  },
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 5,
    marginRight: 13,
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
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
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
  errorSelectedColor: {
    borderColor: "red",
  },
});
