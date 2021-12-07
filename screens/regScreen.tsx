import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import regSchema from '../schemes/registrationSchema'
import CustomInput from '../components/customInput'
import loginFieldSchema from '../schemes/loginFieldSchema'
import passwordFiledSchema from '../schemes/passwordFieldSchema'
import { Button, Title, Text } from 'react-native-paper';
import { regUser } from '../requests/userRequests'

type Props = {
    navigation: any
}

const RegistrationScreen: React.FC<Props> = (props) => {
    const [userData, setUserData] = useState( { login: '', password: '' } )

    const registration = async() => {
        try {
            await regSchema.validate(userData);
            const answer = await regUser(userData);
            if( !answer ){
                console.log("unsuccess registration",answer)
            }
            else{
                console.log(answer)
                alert('Success ! Now you can log in ')
                props.navigation.navigation.navigate('login')
            }
        } catch (error: any) {
            console.log( error.message )
        }  
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.main}>
                <Title style = {styles.title}>Registrate New Account</Title>
                <CustomInput
                    userData = {userData}
                    setUserData = {setUserData}
                    field = { 'login' }
                    schema = { loginFieldSchema }
                    isSecure = { false }
                    keyboardType = { 'default' }
                    defaultValue = {''}
                    getRef = { () => {} }
                    placeholder = { 'Enter your login' }
                />

                <CustomInput
                    userData = {userData}
                    setUserData = {setUserData}
                    field = { 'password' }
                    schema = {passwordFiledSchema}
                    isSecure = {true}
                    keyboardType = { 'default' }
                    defaultValue = {''}
                    getRef = { () => {} }
                    placeholder = { 'Enter your password' }
                />
                
                <Button mode = 'contained' onPress = {registration} style = {styles.button} labelStyle = { styles.buttonLabel }>
                    Registration
                </Button>
            </View>
           
            <View style = {styles.footer}>
                <View style = {styles.footerWrapper}>
                    <Text style = {styles.commonText}>Already have account ? </Text>
                    <TouchableOpacity onPress = { () => { props.navigation.navigation.navigate('login') } }>
                        <Text style = {styles.linkText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    main: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 100
    },

    title: {
        marginBottom: 30
    },

    inputContainer:{
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
    },

    input: {
        width: '100%',
    },

    inputErrorText:{
        fontSize: 12,
        color: 'red'
    },

    button: {
        alignItems: 'center',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },

    buttonLabel: {
        width: '100%',
    },

    footer: {
        width: '100%',
        justifyContent: 'flex-end',
    },

    footerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
    },

    commonText: {
        color: 'black',
        fontSize: 14
    },

    linkText: {
        color: 'red',
        fontSize: 14
    },
})

export default RegistrationScreen