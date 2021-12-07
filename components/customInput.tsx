import React, {useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {TextInput, HelperText} from 'react-native-paper'

type Props = {
    userData: any,
    field: 'login' | 'password' | 'title' | 'price',
    schema: any,
    setUserData: any,
    isSecure: boolean,
    keyboardType: 'numeric' | 'default',
    defaultValue: string
    getRef: any,
    placeholder: string
}

const CustomInput: React.FC<Props> = (props) => {
    const [errorMessage, setErrorMessage] = useState('')

    const changeFieled = async(newValue: string) => {
        let temp = {...props.userData};
        temp[props.field] = newValue;
        props.setUserData(temp);
        try {
            await props.schema.validate(  { [props.field] : newValue } )
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return(
        <View style = { styles.inputContainer }>
            <TextInput 
                mode = 'outlined'
                style = {styles.input} 
                placeholder = {props.placeholder} 
                onChangeText = { (event) => { changeFieled( event ) } }
                secureTextEntry = { props.isSecure }
                keyboardType = { props.keyboardType }
                defaultValue = { props.defaultValue }
                ref = { ( ref ) => { props.getRef(ref) } }
            />
            <HelperText type = 'error' visible = { errorMessage ? true : false} >
                {errorMessage}
            </HelperText>
        
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        width: '80%',
        marginBottom: 10
    },

    input: {
        width: '100%',
    },

    inputErrorText:{
        fontSize: 12,
        color: 'red'
    },
})

export default CustomInput