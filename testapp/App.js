import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView,TextInput } from 'react-native';

export default function App() {

  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
  };
  

  return (
        <ScrollView>
          <Text>Some text</Text>
          <View>
            <Text>Some more text</Text>
            <Image source={logo} />
          </View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            defaultValue="You can type in me"
          />
        

          <View style={{
              width: "100%",
              height: "100%",
              backgroundColor: 'powderblue',
            }}>
            <Text>Test</Text>
          </View>
        </ScrollView>

  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    color:"white",
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer:{
    alignItems: 'center',
    justifyContent: 'center',
  }
});
