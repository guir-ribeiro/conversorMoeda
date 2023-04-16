import { StatusBar } from 'expo-status-bar';
import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';

import Pickerr from './src/components/Pickerr';
import api from './src/services/api';

export default function App() {

  const [moedas, setMoedas]= useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0)

  const [valorConvertido, setValorConvertido] = useState(0);
  const [valorMoeda, SetValorMoeda] = useState(null);

  useEffect(()=>{
    async function loadMoeda(){
      const response = await api.get('all');

      let arrayMoedas= []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key:key,
          label:key,
          value:key
        })
      })

      setMoedas(arrayMoedas)
      setLoading(false)
    }

    loadMoeda()
  },[])

  async function Converter(){
   if(moedaSelecionada === null || moedaBValor === 0){
    alert('Por favor, Selecione uma moeda e adicione um valor')
    return;
   }

   const response = await api.get(`all/${moedaSelecionada}-BRL`)


   let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))

   setValorConvertido(`R$ ${resultado.toFixed(2)}`)
   SetValorMoeda(moedaBValor);

   Keyboard.dismiss();


  }

  if(loading){
    return(
    <View style={[styles.container, {alignItems:'center', justifyContent:'center'}]}>
      <ActivityIndicator color="#fff" size={50}/>
    </View>
    )
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.areamoeda}>
        <Text style={styles.titulo}>Selecione sua moeda</Text>
        <Pickerr moedas={moedas} onChange={(moeda)=>setMoedaSelecionada(moeda)}/>
        </View>
  
        <StatusBar style="inverted" />
        <View style={styles.areaValor}>
        <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
        <TextInput
          keyboardType='numeric'
          placeholder='Ex: 150 '
          style={styles.input}
          onChangeText={(valor)=> setMoedaBValor(valor)}
        />
        </View>
  
        <TouchableOpacity 
          style={styles.botaoArea}
          onPress={Converter}
        >
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}> {valorMoeda} {moedaSelecionada}</Text>
            <Text style={[styles.valorConvertido, {fontSize:18, margin:10}]}>Corresponde a</Text>
            <Text style={styles.valorConvertido}>{valorConvertido}</Text>
          </View>
        )}
  

  
      </View>
  
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
    paddingTop:40
  },
  areamoeda:{
    width:'90%',
    backgroundColor:'#f9f9f9',
    paddingTop:9,
    borderTopLeftRadius:9,
    borderTopRightRadius:9,
    marginBottom:1,
  },
  titulo:{
    fontSize:15,
    color:"#000",
    paddingTop:5,
    paddingLeft:5
  },
  areaValor:{
    width:'90%',
    backgroundColor:'#f9f9f9',
    paddingBottom:9,
    paddingTop:9
  },input:{
    width:'100%',
    padding:10,
    fontSize:20,
    marginTop:8,
    color:"#000"
  },
  botaoArea:{
    width:'90%',
    backgroundColor:'#fb4b57',
    height:45,
    borderBottomLeftRadius:9,
    borderBottomRightRadius:9,
    justifyContent:'center',
    alignItems:'center',
  },
  botaoTexto:{
    fontSize:18,
    color:"#fff",
    fontWeight:'bold'
  },
  areaResultado:{
    width:'90%',
    backgroundColor:'#fff',
    marginTop:35,
    alignItems:'center',
    justifyContent:'center',
    padding:25
  },
  valorConvertido:{
    fontSize:39,
    fontWeight:'bold',
    color:'#000'
  }
});
