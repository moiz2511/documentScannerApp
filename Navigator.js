import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BarCoder from "./Barcoder";
import Index from "./index";


const MainNavigator = createStackNavigator(
    {
        Index:Index,
        BarCoder: BarCoder,
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#141E8C",
        },
        headerTintColor: "white",
        headerTitle:"Yottacom Scanner App"
      },
    }
  );
  export default createAppContainer(MainNavigator);