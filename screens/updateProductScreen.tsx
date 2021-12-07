import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native'
import CustomInput from '../components/customInput'
import titleFieldSchema from '../schemes/titleFieldSchema'
import priceFieldSchema from '../schemes/priceFieldSchema'
import * as ImagePicker from 'expo-image-picker';
import createProductSchema from '../schemes/createProduct';
import translate from '../translate/transtalte'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from '../store/store' 
import { updateProductSaga } from '../store/actions/productsActions'

type Props = {
    navigation: any,
}

const UpdateProductScreen: React.FC<Props> = (props) => {
    const [productData, setProductData] = useState( { id: '', title: '', price: '', path: ''} )
    const [errorMessages, setErrorMessages] = useState( { id: '', title: '', price: '', image: '' } );
    const useAppSelecetor: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelecetor( state => state.user );
    const currentProduct = useAppSelecetor( state => state.currentProduct)
    const dispatch = useDispatch();

    useEffect( () => {
        askPermission();
        setProductData( {
            id: currentProduct.id, 
            title: currentProduct.title,
            price: String(currentProduct.price),
            path: currentProduct.path
        } )
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
            temp.path = result.uri;
            setProductData(temp)
        }
    }

    const updateProduct = async() => {
        try {
            await createProductSchema.validate( { 
                title: productData.title, 
                price: Number(productData.price), 
                image: productData.path 
            }, { abortEarly: false } )    
            setErrorMessages( { id: '', title: '', price: '', image: '' } );
            const navigator = props.navigation.navigation;
            dispatch( updateProductSaga( { ...productData, userId: user.id }, navigator ) );
        } catch (error) {
            let temp = {...errorMessages};
            error.inner.reverse().forEach( (error: { path: 'title' | 'price' | 'image', message: string } ) => {
                temp[error.path] = error.message;
                console.log(error.path, error.message)
            });
            setErrorMessages(temp);
        }
        
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Update Product</Text>
            <CustomInput
                userData = {productData}
                setUserData = {setProductData}
                field = {'title'}
                schema = {titleFieldSchema}
                isSecure = {false}
                keyboardType = {'default'}
                defaultValue = { productData.title }
                getRef = { () => {} }
                placeholder = { translate.t('enterTitle')  }
            />
            <CustomInput
                userData = {productData}
                setUserData = {setProductData}
                field = {'price'}
                schema = {priceFieldSchema}
                isSecure = {false}
                keyboardType = {'numeric'}
                defaultValue = { productData.price }
                getRef = { () => {} }
                placeholder = { translate.t('enterPrice')  }
            />
            <TouchableOpacity style = { styles.imagePicker } onPress = { () => { getImageFromLibrary() }}>
                <Text>Choose image from library</Text>
                <Text style = {styles.textError}>{errorMessages.image}</Text>
            </TouchableOpacity>
            <Image style = { styles.image }  source = { {uri: productData.path ? productData.path : '../assets/placeholder.png'} }/> 

            <TouchableOpacity style = {styles.button} onPress = { () => { updateProduct() } } >
                    <Text>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 200,
        height: 300, 
        marginBottom: 20
    },

    textError: {
        color: 'red',
        fontSize: 12
    }
})

export default UpdateProductScreen
