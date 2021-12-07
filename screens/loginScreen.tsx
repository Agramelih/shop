import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import CustomInput from '../components/customInput'
import loginFieldSchema from '../schemes/loginFieldSchema'
import passwordFiledSchema from '../schemes/passwordFieldSchema'
import loginSchema from '../schemes/loginSchema'
import { Button, Title, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { loginGoogleSaga, storeUserSaga, tokenUserSaga, adminLoginSaga } from '../store/actions/userActions'

type Props = {
    navigation: any,
}


const LoginScreen: React.FC<Props> = (props) => {
    const [userData, setUserData] = useState( { login: '', password: '', locale: '' } );
    const [errorMessages, setErrorMessages] = useState( { login: '', password: ''} )
    const dispatch = useDispatch();

    const logByToken = async( ) => {
        dispatch( tokenUserSaga( props.navigation.navigation ) )
    } 

    useEffect( () => {
        logByToken();
    }, [])

    const login = async() => {
        try {
            await loginSchema.validate( userData, { abortEarly: false } );
            setErrorMessages( { login: '', password: '' } );
            const navigator = props.navigation.navigation 
            dispatch( storeUserSaga( {  userData , navigator  } ) );
        } catch ( error: any ) {
            let temp = {...errorMessages};
            error.inner.reverse().forEach( (error: { path: 'login' | 'password', message: string } ) => {
                temp[error.path] = error.message;
                console.log(error.path, error.message)
            });
            setErrorMessages(temp);
        }
    }

    const googleLogin = async() => {
        dispatch( loginGoogleSaga( props.navigation.navigation ) );
    }

    const logAsAdmin = async() => {
        await loginSchema.validate( userData );
        setErrorMessages( { login: '', password: '' } );
        const navigator = props.navigation.navigation 
        dispatch( adminLoginSaga( {  userData , navigator  } ) )
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.main}>
                <Title style = { styles.title } >Login To Your Account</Title>
                <CustomInput 
                    userData = {userData}
                    setUserData = {setUserData}
                    field = 'login'
                    isSecure = {false}
                    schema = {loginFieldSchema}
                    keyboardType = {'default'}
                    defaultValue = {''}
                    getRef = { () => {} }
                    placeholder = { 'Enter your login' }
                />
                <CustomInput
                    userData = {userData}
                    setUserData = {setUserData}
                    field = 'password'
                    isSecure = {true}
                    schema = {passwordFiledSchema}
                    keyboardType = {'default'}
                    defaultValue = {''}
                    getRef = { () => {} }
                    placeholder = { 'Enter your password' }
                />

                <Button mode = 'contained' onPress = {login} style = {styles.button} labelStyle = { styles.buttonLabel } >
                    Login
                </Button>

                <Button mode = 'contained' onPress = {googleLogin} style = {styles.button} labelStyle = { styles.buttonLabel } >
                    Log In by Google
                </Button>

                <Button mode = 'contained' onPress = {logAsAdmin} style = {styles.button} labelStyle = { styles.buttonLabel } >
                    Log As Admin
                </Button>

            </View>
           
            <View style = {styles.footer}>
                <View style = {styles.footerWrapper}>
                    <Text style = {styles.commonText}>Don't have account ? </Text>
                    <TouchableOpacity onPress = { () => { props.navigation.navigation.navigate('registration') } }>
                        <Text style = {styles.linkText}>Sing Up</Text>
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
        marginBottom: 30,
        alignSelf: 'center'
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        padding: 10,
        marginBottom: 20
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

export default LoginScreen