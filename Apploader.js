import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const Apploader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("./lf30_editor_lgjcawpo.json")}
        autoPlay
        loop
      />
    </View>
  );
};
export default Apploader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});
