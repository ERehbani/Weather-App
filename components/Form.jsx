import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

function Form({search, setSearch, setConsult}) {
  const {country, city} = search;

  const [animationButton] = useState(new Animated.Value(1));

  const consultWeather = () => {
    if (country.trim() === '' || city.trim() === '') {
      showAlert();
      return;
    }

    // consultar la api
    setConsult(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la busqueda', [
      {text: 'Entendido'},
    ]);
  };

  const animationIn = () => {
    Animated.spring(animationButton, {
      toValue: 0.95,
    }).start();
  };

  const animationOut = () => {
    Animated.spring(animationButton, {
      toValue: 1,
      //   friction: 4,
      tension: 30,
    }).start();
  };

  const styleAnimated = {
    transform: [{scale: animationButton}],
  };

  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#d9d9d9"
            value={city}
            onChangeText={city => setSearch({...search, city})}
          />
        </View>
        <View>
          <Picker
            style={styles.picker}
            itemStyle={{height: 120, backgroundColor: 'white'}}
            selectedValue={country}
            onValueChange={country => setSearch({...search, country})}>
            <Picker.Item label="-- Seleccione un país --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Inglaterra" value="GB" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animationIn()}
          onPressOut={() => animationOut()}
          onPress={() => consultWeather()}>
          <Animated.View style={[styles.btnSearch, styleAnimated]}>
            <Text style={styles.textSearch}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  textSearch: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
  picker: {
    backgroundColor: 'white',
    padding: 30,
  },
});

export default Form;
