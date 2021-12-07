import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import translate from '../translate/transtalte'
import { window, bascket, deleteIcon, add, edit, arrowLeft, arrowRight } from '../constants/constants'
import Spinner from 'react-native-loading-spinner-overlay';
import { productType } from '../constants/types'
import { Text, TextInput,  } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { deleteProductSaga, searchProductSaga, storeProductSaga } from '../store/actions/productsActions'
import { storeProductsInBascket } from '../store/actions/productsInBascketActions'
import { storeCurrentProduct } from '../store/actions/currentProductActions'

type Props = {
    navigation: any
}

const MainScreen: React.FC<Props> = (props) => {
    const [isLoadding, setIsLoadding] = useState(true); 
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelector( state => state.user );
    const products = useAppSelector( state => state.products );
    const productsInBuscket = useAppSelector( state => state.productsInBascket );
    const pages = useAppSelector( state => state.pages );
    const currentCategory = useAppSelector( state => state.currentCategory );
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState( user.type === 'admin' ? true : false );
    const [dataForSearch, setDataForSearch] = useState({
        category: currentCategory,
        searchText: '',
        sortType: '',
        price: 0,
        page: 0,
        count: 5,
    })

    const getArrayOfProducts = async( page: number ) => {
        dispatch( storeProductSaga( { category: currentCategory, page: page, count: dataForSearch.count } ) );
        setIsLoadding(false)
    }

    useEffect( () => {
        translate.locale = user.locale === '' ? 'en' : user.locale;
        setIsLoadding(true);
        getArrayOfProducts(0);
    }, [currentCategory])

    

    const search = async( fieldValue: string | number, fieldName: 'category' | 'searchText' | 'sortType' | 'price' | 'page' | 'count' ) => {
        const dataForServer = {...dataForSearch};
        if(fieldName === 'price' || fieldName === 'page' || fieldName === 'count' ){
            dataForServer[fieldName] = Number(fieldValue);
        }
        else{
            dataForServer[fieldName] = String(fieldValue);
        }
        dispatch( searchProductSaga( dataForServer ) );
    }

    const addProductToBuscket = ( product: {title: string, path: string, price: number} ) => {
        let repeatIndex = -1
        let isReapeat = productsInBuscket.find( (productInBascket, productIndex) => {
            if(productInBascket.title === product.title){
                repeatIndex = productIndex
                return true
            } 
        })

        if( isReapeat ){
            let temp = [...productsInBuscket];
            for(let i = repeatIndex; i < temp.length - 1; i++){
                temp[i] = temp[i + 1];
            }
            temp.length -= 1;
            if( temp.length === 0 ){
                dispatch( storeProductsInBascket( [ { id: '', title: '', price: 0, path: '', amount: 0 } ] ) )
            }
            else{
                dispatch( storeProductsInBascket(temp) );
            }
        }

        else{
            if(productsInBuscket[0].title === ""){
                dispatch( storeProductsInBascket( [ { id: '', ...product, amount: 1 } ] ) )
            }
            else{
                dispatch( storeProductsInBascket( [ ...productsInBuscket, { id: '', ...product, amount: 1 } ]  ) )
            }
        }        
    }

    const onDeletePress = async(product: productType, index: number ) => {
        dispatch( deleteProductSaga( { productId: product.id, userId: user.id } ) ) 
    }

    const onUpdatePress = async( product: productType ) => {
        dispatch( storeCurrentProduct(product) );
        props.navigation.navigation.navigate('updateProduct');
    }

    const onPreviousPage = () => {
        if( dataForSearch.page > 0 ){
            let temp = {...dataForSearch};
            temp.page -= 1;
            setDataForSearch(temp);
            search( temp.page, 'page')
        }
    }

    const onNextPage = () => {
        if( dataForSearch.page < pages ){
            let temp = {...dataForSearch};
            temp.page += 1;
            setDataForSearch(temp);
            search( temp.page, 'page');
        }
    }

    const onSearchProductChange = ( fieldValue: string) => {
        const temp = {...dataForSearch};
        temp.searchText = fieldValue;
        setDataForSearch(temp);
        search( fieldValue, 'searchText' );
    }

    const onPriceValueChange = ( fieldValue: string) => {
        const temp = {...dataForSearch};
        if(fieldValue === 'choose price'){
            temp.price = 0;
            setDataForSearch(temp);
            search(0, 'price');
        }
        else{
            temp.price = Number(fieldValue);
            setDataForSearch(temp);
            search( Number(fieldValue), 'price' );
        }
    }

    const onSortValueChange = (fieldValue: string) => {
        const temp = {...dataForSearch};
        if( 'choose sort' === fieldValue ){
            temp.sortType = 'none';
            setDataForSearch(temp);
            search('none', 'sortType');
        }
        else{
            temp.sortType = fieldValue;
            setDataForSearch(temp);
            search(fieldValue, 'sortType')
        }
    }

    if(isLoadding){ return <Spinner visible = {isLoadding}/>}

    return(
        <ScrollView>
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <TextInput 
                        placeholder = { translate.t('searchProd') } 
                        style = { styles.headerSearch }
                        onChangeText = { (event: string) => { onSearchProductChange(event) } } 
                    />

                    <View style = {styles.headerButtonImageContainer}>
                        <TouchableOpacity onPress = { () => { props.navigation.navigation.navigate('createProduct') } }  style = { { display: isAdmin ? 'flex' : 'none' } } >
                            <Image source = {add} style = {styles.headerButtonImage} />
                        </TouchableOpacity> 
                        <TouchableOpacity onPress = { () => { props.navigation.navigation.navigate('buscket') } } >
                            <Image source = {bascket} style = {styles.headerButtonImage} />
                        </TouchableOpacity> 
                    </View> 
                </View>
                <View style = { { width: '100%', flexDirection: 'row', alignItems: 'center'} }>
                    <Text>Expensive than:</Text>
                    <RNPickerSelect
                        placeholder = { { label: 'choose price', value: 'choose price'} }
                        items = {
                            [
                                { label: '100', value: '100'},
                                { label: '500', value: '500'},
                                { label: '1000', value: '1000'},
                            ]
                        }
                        onValueChange={ (value) => onPriceValueChange(value) }
                        useNativeAndroidPickerStyle = {false}
                        style = { 
                            {
                                inputAndroid: styles.selector,
                                placeholder: styles.selectorPlaceholder
                            }
                        }
                    />
                    <Text>Sort by:</Text>
                    <RNPickerSelect
                        placeholder = { { label: 'choose sort', value: 'choose sort'} }
                        items = {
                            [
                                { label: 'min', value: 'min'},
                                { label: 'max', value: 'max'},
                            ]
                        }
                        onValueChange={ (value) => onSortValueChange(value) }
                        useNativeAndroidPickerStyle = {false}
                        style = { 
                            {
                                inputAndroid: styles.selector,
                                placeholder: styles.selectorPlaceholder
                            }
                        }
                    />
            
                </View>
                {
                    products.map( (product , index) => {
                        return(
                            <View style = {styles.productContainer} key = {index}>
                                <View style = { styles.iconContainer } >
                                    <TouchableOpacity
                                        style = { { display: isAdmin ? 'flex' : 'none' } } 
                                        onPress = { () => { onUpdatePress(product) } } 
                                    >
                                        <Image source = {edit} style = {styles.icon} />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style = { { alignSelf: 'center', display: isAdmin ? 'flex' : 'none' } } 
                                        onPress = { () => { onDeletePress(product, index) } }
                                    >
                                        <Image source = {deleteIcon} style = { [ styles.icon, { width: 30, height: 30 } ] } />
                                    </TouchableOpacity>
                                </View>
                                
                                <Image source = { { uri: product.path } } style = { styles.productImage }/>
                                <Text style = {styles.productText}>{product.title}</Text>
                                <View style = {styles.productPriceContainer}>
                                    <Text style = {styles.productPrice}>{product.price}$</Text>

                                    <TouchableOpacity style = {styles.productButton} onPress = { () => { addProductToBuscket(product) }}>
                                        <Text style = {styles.productButtonText}>
                                            { productsInBuscket.find( productInBascket => productInBascket.title === product.title ) ? translate.t('remove') : translate.t('add') }    
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    } )
                }

                <View style = { styles.pageSwitchContainer }>
                    <TouchableOpacity onPress = {onPreviousPage}>
                        <Image style = { styles.pageSwitchIcon } source = {arrowLeft}/>
                    </TouchableOpacity>
                    <Text style = { styles.pageSwitchText }>{translate.t('page')} {dataForSearch.page} {translate.t('from')} {pages}</Text>
                    <TouchableOpacity onPress = {onNextPage}>
                        <Image style = { styles.pageSwitchIcon } source = {arrowRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      minHeight: window.height,
      padding: 20,
      paddingTop: 40
    },

    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },

    icon:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 10
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },

    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%'
    },

    priceInput:{
        backgroundColor: 'white',
        width: '20%'
    },

    headerImage: {
        width: 30, 
        height: 30,
        marginRight: 10,
        borderRadius: 50, 
    },
    
    headerButtonImageContainer: {
        flexDirection: 'row',
        width: '25%',
    },


    headerButtonImage:{
        width: 30, 
        height: 30,
        marginLeft: 20 
    },

    headerText: {
        fontSize: 14
    },

    headerSearch:{
        width: '70%',
        backgroundColor: 'white'
       
    },

    productContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },

    productImage:{
        resizeMode: 'contain',
        height: 214,
        width: 170,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange'
    },

    pageSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    pageSwitchIcon:{
        resizeMode: 'contain',
        width: 40,
        height: 40
    },

    pageSwitchText:{
        marginLeft: 10,
        marginRight: 10
    },

    selector: {
        padding: 10,
        color: 'black',
        width: '100%'
    },
    
    selectorPlaceholder: {
        color: 'black',
    }
  });

export default MainScreen