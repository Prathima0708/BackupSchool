import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
var Title;
function CategoryGridTile({ title, color, icon, onPress, txtclr }) {
  Title = title;
  return (
    <View style={[styles.gridItem, { backgroundColor: color }]}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Image source={{ uri: icon }} style={styles.icon} />

        <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  gridItem: {
    marginHorizontal: 7,
    marginVertical: 10,
    padding: 7,
    //paddingTop: 0,

    width: 150,
    right:deviceWidth > 360 ? 1 : 20,
    height: deviceHieght < 600 ? 110 : 130,
    borderRadius: 18,
    elevation: 5,
    shadowColor: "black",

    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  icon: {
    width: 60,
    height: 60,
    borderWidth: 3,
    top: 15,
    left: 10,
  },
  sub: {
    fontSize: 18,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  buttton: {
    flex: 1,
  },
  title: {
    top: 17,

    left: 10,
    fontFamily: "HindMedium",
    letterSpacing: 0.7,

    fontSize: deviceWidth < 370 ? 16 : 20,
    left: 10,
  },
});
