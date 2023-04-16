import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';

export default function Pickerr(props){

    const [Value, setValue] = useState('null');


    return(
        <Picker
            placeholder='Selecione uma moeda'
            selectedValue={Value}
            onValueChange={(valor)=> {
                props.onChange(valor)
                setValue(valor)
            } }
        >
            <Picker.Item label='Selecione uma moeda' value='null' enabled={false} style={{color:"gray"}}/>

            {        
            props.moedas.map((item , index)=>{
                return(
                    <Picker.Item key={item.key} label={item.key} value={item.key}/>
                )
            })}
            
        </Picker>

    )
    
}


