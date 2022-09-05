import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Apploader from './Apploader';

export default function Index(props) {
  const [barCode, setBarcode] = useState(false)
  const [loginPending, setLoadingPending] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  ////////////////////////




  ////////////////////////
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState([]);
  const [num, setNum] = useState(0)
  const [scanned, setScanned] = useState(true);
  const [data, setData] = useState("")
  // const [type, setType] = useState(Camera.Constants.Type.back);

  const bodyFunc = (url) => {
    setLoadingPending(true);
    let formdata = new FormData();
    console.log(url)
    console.log('up is url')
    image.forEach((img, i) => {
      let photo = { uri: img.uri }

      formdata.append("images", { uri: photo.uri, name: 'image.jpg', type: 'image/jpeg' })

    })
    console.log(formdata)
    reqFunc(url,formdata)

  }
  const reqFunc = async (url,formdata) => {
    try {
      console.log("1");
      console.log("2");
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata
      });

      const json = await response.json();
      console.log(json)
      setLoadingPending(false)
      alert(`Uploaded Successfully to house: ${json.data.house.name}`);
      setImage([])

    } catch (err) {
      console.log(err);
      setLoadingPending(false)
      alert(`failed`);

    }
  }

  const takeImgHandler = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === 'granted') {
        let result = await ImagePicker.launchCameraAsync(
          {
            allowsEditing: true,
            // aspect: [4, 3],
            allowsMultipleSelection: true,
            quality: 1,
          });
        console.log(result)
        if (!result.cancelled) {
          result.key = num;
          setNum(num + 1)
          setImage([...image, result]);

        }
      }
    } else {
      let result = await ImagePicker.launchCameraAsync(
        {
          allowsEditing: true,
          // aspect: [4, 3],
          allowsMultipleSelection: true,
          quality: 1,
        });
      console.log(result)
      if (!result.cancelled) {
        result.key = num;
        setNum(num + 1)
        setImage([...image, result]);

      }
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setData(data);
  };
  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <View style={{ margin: 10 }}>

        <TouchableOpacity onPress={() => {
          // setImage(image.splice(item.key,1))
          let arr = image.filter(item1 => item1.key !== item.key)
          setImage(arr)

        }}>
          <MaterialCommunityIcons
            name="close"
            size={50}
            color={"red"}

          />
        </TouchableOpacity>
        <Image source={{ uri: item.uri }} style={{ width: 50, height: 100 }} />
      </View>

    )
  }
  // const imageFunc = () => {

  //   for (const x in image) {
  //     console.log(`${property}: ${object[property]}`);
  //   }
  // }


  return (
    <>
    <View style={styles.container}>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height:400,width:400 }}
        canAskAgain={true}
      />  */}
      <View style={{alignSelf:'flex-end',margin:10}}>

        <TouchableOpacity onPress={() => { props.navigation.navigate('BarCoder',{
          myFunc:bodyFunc
        }) }}>
          <MaterialCommunityIcons
            name="qrcode"
            size={50}

          />
        </TouchableOpacity>
      </View>
      <>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => takeImgHandler()}
        >
          <Text style={{color:'white', fontWeight:'bold'}}>Take Image</Text>
        </TouchableOpacity>
        {/* <Text>Your Images</Text>
        <Text>{data}</Text>

        <TouchableOpacity onPress={() => { bodyFunc }}>
          <Text>Body Func</Text>
        </TouchableOpacity> */}


        <View style={styles.bottomView}>

          <FlatList
            horizontal={true}
            data={image}
            renderItem={renderItem}

          />
        </View>
      </>
 {/* </SafeAreaView> */}

      <StatusBar style="auto" />

    </View>
    {loginPending ? <Apploader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop:50
  },
  bottomView: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  btn:{
    backgroundColor:'green',
    width:'80%',
    height:100,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:5
  }
});
