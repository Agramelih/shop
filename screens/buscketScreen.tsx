import React, {useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import translate from '../translate/transtalte'
import { ScrollView } from 'react-native-gesture-handler';
import { window, arrowLeft, arrowRight, publicKey } from '../constants/constants'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store/store'
import { storeProductsInBascket } from '../store/actions/productsInBascketActions'
import {purchase} from '../requests/userRequests'

const BascketScreen = () => {
    const dispatch = useDispatch();
    const useAppSelecetor: TypedUseSelectorHook<RootState> = useSelector;
    const productsInBascket = useAppSelecetor( state => state.productsInBascket );

    const setOptions = async() => {
        await Stripe.setOptionsAsync({
            publishableKey: publicKey,
            androidPayMode: 'test', 
        });
    }

    const madePurchase = async() => {
        if(productsInBascket[0].title !== ''){
            try {
                const card = await Stripe.paymentRequestWithCardFormAsync();
                if( card !== undefined ){
                    const answer = await purchase( productsInBascket, card.tokenId);
                    if(answer){
                        Alert.alert('message', answer)
                    }
                    else{
                        Alert.alert('message', 'Purchase not success')
                    }
                    
                }

            } catch (error: any) {
                console.log(error.message)
            }
        }
        else{
            Alert.alert(translate.t('nothing'))
        }
    }

    const increaseAmountOfProduct = (index: number) => {
        let temp = [...productsInBascket];
        temp[index].amount += 1;
        dispatch( storeProductsInBascket( temp ) );
    }

    const decreaseAmountOfProduct = (index: number) => {
        let temp = [...productsInBascket];
        if( temp[index].amount > 0 ){
            temp[index].amount -= 1;
            dispatch( storeProductsInBascket(temp) );
        }
    }

    useEffect( () => {
        setOptions();
    }, [])

    return(
        <ScrollView>
            <View style = {styles.container}>
            
                {   
                    productsInBascket[0].title !== '' ?
                    productsInBascket.map( (product, index) => {
                        return(
                            <View style = {styles.productContainer} key = {index}>
                                <Image source = { {uri: product.path} } />
                                <Text style = {styles.productText}>{product.title}</Text>
                                <View style = {styles.productPriceContainer}>
                                    <Text style = {styles.productPrice}>{product.price * product.amount}$</Text>

                                    <View style = { styles.productCounterContainer }>
                                        <TouchableOpacity onPress = { () => decreaseAmountOfProduct(index) } >
                                            <Image source = {arrowLeft} style = { styles.productCounterButtonImage } />
                                        </TouchableOpacity>
                                        <Text style = { styles.productCounterText }>{product.amount}</Text>
                                        <TouchableOpacity onPress = { () => increaseAmountOfProduct(index) } >
                                            <Image source = {arrowRight} style = { styles.productCounterButtonImage } />
                                        </TouchableOpacity>
                                    </View>                                
                                </View>

                                
                            </View>
                        )
                    } )
                    : 
                    <Text>{translate.t('nothing')}</Text>
                    
                }
                <View style = {styles.footerContainer}>
                    <Text style = { styles.footerText }>{ `${translate.t('total')} ${
                        productsInBascket.map( (product) => product.price * product.amount).reduce( (accumulator, price) => accumulator + price)
                        }`}$
                    </Text>
                    <TouchableOpacity style = { styles.productButton} onPress = { () => { madePurchase() } } >
                        <Text style = {styles.productButtonText}>{translate.t('buy')}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
      paddingTop: 40,
      minHeight: window.height
    },

    productContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },

    productText:{
        width: '100%',
        textAlign: 'left',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'orange'
    },

    productPriceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    productPrice:{
        fontSize: 22,
        fontWeight: 'bold'
    },

    productButton:{
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'orange',
        padding: 10
    },

    productButtonText:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
        alignSelf: 'center'
    },

    productCounterContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    productCounterText:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },

    productCounterButtonImage:{
        width: 30,
        height: 30
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 50
    },

    footerText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });

export default BascketScreen