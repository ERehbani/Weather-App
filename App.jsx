import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [search, setSearch] = useState({
    city: '',
    country: '',
  });
  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [bgcolor, setbgColor] = useState('rgb(71, 149, 212)');

  const {city, country} = search;

  const showAlert = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o país', [
      {text: 'Ok'},
    ]);
  };

  useEffect(() => {
    const consultWeather = async () => {
      if (consult) {
        const appid = 'ae222c77a8713a698205fe736baa9e5b';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appid}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          // console.log(result);
          setResult(data);
          setConsult(false);

          // modifica los colores de fondo basado en la temperatura
        } catch (error) {
          showAlert();
        }
      }
      const kelvin = 273.15;
      const {main} = result;
      const actual = main.temp - kelvin;
      console.log(actual);
      if (actual < 10) {
        setbgColor('rgb( 105, 108, 149 )');
      } else if (actual >= 10 && actual < 25) {
        setbgColor('rgb( 71, 149, 212)');
      } else {
        setbgColor('rgb( 178, 28, 61 )');
      }
    };
    consultWeather();
  }, [consult]);

  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.content}>
            <Weather result={result} />
            <Form
              search={search}
              setSearch={setSearch}
              setConsult={setConsult}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
