import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native'
import CustomInput from '../components/customInput'
import titleFieldSchema from '../schemes/titleFieldSchema'
import priceFieldSchema from '../schemes/priceFieldSchema'
import * as ImagePicker from 'expo-image-picker';
import createProductSchema from '../schemes/createProduct';
import CustomPicker from '../components/customPicker'
import translate from '../translate/transtalte'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { createProductSaga } from '../store/actions/productsActions'

type Props = {
    navigation: any,
}

const CreateProductScreen: React.FC<Props> = (props) => {
    const [productData, setProductData] = useState( { title: '', price: '', category: '', image: '../assets/placeholder.png' } )
    const [errorMessages, setErrorMessages] = useState( { id: '', title: '', price: '', image: '' } );
    const useAppSelecetor: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelecetor( state => state.user );
    const dispatch = useDispatch();

    useEffect( () => {
        askPermission();
    }, [])

    const askPermission = async() => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

    const getImageFromLibrary = async() => {
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if( !result.cancelled ){
            let temp = {...productData};
            temp.image = result.uri;
            setProductData(temp)
        }
    }

    const createNewProduct = async() => {
        try {
            await createProductSchema.validate( { 
                title: productData.title, 
                price: Number(productData.price), 
                image: productData.image 
            }, { abortEarly: false } )    
            setErrorMessages( { id: '', title: '', price: '', image: '' } );
            const navigator = props.navigation.navigation
            dispatch( createProductSaga( { ...productData, userId: user.id }, navigator ) );
        } catch (error) {
            let temp = {...errorMessages};
            error.inner.reverse().forEach( (error: { path: 'title' | 'price' | 'image', message: string } ) => {
                temp[error.path] = error.message;
                console.log(error.path, error.message)
            });
            setErrorMessages(temp);
        }
        
    }

    const onCategoryChoose = ( event: string) => {
        const temp = { ...productData };
        temp.category = event;
        setProductData(temp);
    }

    const getRef = () => {

    }
    
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>{ translate.t('addNewProd') }</Text>
            <CustomInput
                userData = {productData}
                setUserData = {setProductData}
                field = {'title'}
                schema = {titleFieldSchema}
                isSecure = {false}
                keyboardType = {'default'}
                defaultValue = {''}
                getRef = {getRef}
                placeholder = { translate.t('enterTitle')  }
            />
            <CustomInput
                userData = {productData}
                setUserData = {setProductData}
                field = {'price'}
                schema = {priceFieldSchema}
                isSecure = {false}
                keyboardType = {'numeric'}
                defaultValue = {''}
                getRef = {getRef}
                placeholder = { translate.t('enterPrice')  }
            />
            <CustomPicker
                onSelectorPick = {onCategoryChoose}
                getRef = {getRef}
                placeholder = { translate.t('selectItem') }
                
            />
            <TouchableOpacity style = { styles.imagePicker } onPress = { () => { getImageFromLibrary() }}>
                <Text>{ translate.t('chooseImage') }</Text>
                <Text style = {styles.textError}>{errorMessages.image}</Text>
            </TouchableOpacity>
            <Image style = { styles.image }  source = { {uri: productData.image} }/> 

            <TouchableOpacity style = {styles.button} onPress = { () => { createNewProduct() } } >
                <Text>{ translate.t('create') }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 30
    },

    button: {
        alignItems: 'center',
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },

    imagePicker: {
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        padding: 10,
        marginBottom: 20,
    },

    image:{
        resizeMode: 'contain',
        width: 200,
        height: 250, 
        marginBottom: 20
    },

    textError: {
        color: 'red',
        fontSize: 12
    }
})

export default CreateProductScreen
