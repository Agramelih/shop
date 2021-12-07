import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {TextInput, Title} from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';
import asyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {RootState} from '../store/store'
import {storeUser} from '../store/actions/userActions'
import {storeCurrentCategory} from '../store/actions/currentCategoryActions'
import { searchCategorySaga } from '../store/actions/categoriesActions'

type Props = {
    drawerNav: any,
    navigator: any,
}

const DrawerContent:React.FC<Props> = (props) => {
    const [dataForSearch, setDataForSearch] = useState({
        minProductAmount: 0,
        searchText: '',
        sortBy: 'sort type'
    })
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = useAppSelector( state => state.user ) 
    const categories = useAppSelector( state => state.categories )
    const dispatch = useDispatch()

    const search = async( searchData: { searchText: string, minProductAmount: number, sortBy: string  } ) => {
        dispatch( searchCategorySaga( searchData ) );
    }

    const onTextChange = ( text: string ) => {
        const temp = {...dataForSearch};
        temp.searchText = text;
        setDataForSearch(temp);
        search(temp);
    }

    const onMinValueChange = ( value: string) => {
        const temp = {...dataForSearch};
        if('more then'  !== value ){
            temp.minProductAmount = Number(value)
            setDataForSearch(temp);
            search(temp);
        }
        else{
            temp.minProductAmount = 0;
            setDataForSearch(temp);
            search(temp);
        }
        
    }

    const onSortTypeChange = ( value: string) => {
        const temp = {...dataForSearch};
        if( 'sort type' !== value){
            temp.sortBy = value;
            setDataForSearch(temp);
            search(temp);
        }
        else{
            temp.sortBy = '';
            setDataForSearch(temp);
            search(temp);
        }
    }

    const onLogOutPress = async() => {
        await asyncStorage.setItem('token', '');
        await asyncStorage.setItem('refreshToken', '');
        await asyncStorage.setItem('googleToken', '');
   
        dispatch( storeUser( { 
            id: '',
            login: '',
            locale: '',
            type: '' 
        } ) )
        props.navigator.navigate('login')
    }

    const onCategoryClick = ( category: string ) => {
        dispatch( storeCurrentCategory(category) );
        props.drawerNav.navigate( category )
    }

    const onAllCategoryClick = () => {
        dispatch( storeCurrentCategory('all') );
        props.drawerNav.navigate( 'all categories' )
    }

    return(
        <View style = {styles.container}>
            <DrawerContentScrollView>
                <View>
                    <Title>{user.login}</Title>
                    <TextInput 
                        style = {styles.input} 
                        placeholder = "categoty name"
                        onChangeText = { ( text ) => { onTextChange(text) } }
                    />
                    <RNPickerSelect
                        placeholder = { { label: 'more then', value: 'more then'} }
                        items = {
                            [
                                { label: '5', value: '5'},
                                { label: '10', value: '10'},
                            ]
                        }
                        onValueChange={ (value) => { onMinValueChange(value) } }
                        useNativeAndroidPickerStyle = {false}
                        style = {
                            {
                                placeholder : styles.placeholder,
                                inputAndroid: styles.selector
                            }
                        }
                    />

                    <RNPickerSelect
                        placeholder = { { label: 'sort type', value: 'sort type'} }
                        items = {
                            [
                                { label: 'A-Z', value: 'A-Z'},
                                { label: 'Z-A', value: 'Z-A'},
                            ]
                        }
                        onValueChange={ (value) => { onSortTypeChange(value) } }
                        useNativeAndroidPickerStyle = {false}
                        style = {
                            {
                                placeholder : styles.placeholder,
                                inputAndroid: styles.selector
                            }
                        }
                    />
                    

                    {
                        user.type === 'admin' &&  (
                            <DrawerItem
                                label = "create"
                                onPress = { () => { props.drawerNav.navigate('create') } }
                                inactiveTintColor = 'green'
                            />
                            
                        )
                    }

                    {
                        user.type === 'admin' &&  (
                            <DrawerItem
                                label = "update"
                                onPress = { () => { props.drawerNav.navigate('update') } }
                                inactiveTintColor = 'green'
                            />
                        )
                    }

                    {
                        user.type === 'admin' &&  (
                            <DrawerItem
                                label = "delete"
                                onPress = { () => { props.drawerNav.navigate('delete') } }
                                inactiveTintColor = 'green'
                            />
                        )
                    }

                    <DrawerItem
                        label = "all categories"
                        onPress = { () => { onAllCategoryClick() } }
                        inactiveTintColor = 'black' 
                    />

                    {
                        categories.map( (category) => {
                            return(
                                <DrawerItem
                                    inactiveTintColor = 'black'
                                    label = {category.name}
                                    key = {category.id}
                                    onPress = { () => { onCategoryClick( category.name ) } }
                                />
                            )
                        })
                    }
                </View>
            </DrawerContentScrollView>
            <View>
                <DrawerItem 
                    label = "Log Out"
                    onPress = { () => { onLogOutPress() } }
                    inactiveTintColor = 'black'
                    icon = { ( props: {size: number, color: string} ) => (
                        <Icon
                            name = "exit-to-app"
                            color = {props.color}
                            size = {props.size}                                        
                        />
                    )}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },

    input: {
        backgroundColor: 'white'
    },

    placeholder:{
        color: 'black',
        marginBottom: 10
    },

    selector:{
        padding: 5,
        color: 'black',
        borderBottomWidth: 1,
    },

    categories: {
        color: 'black'
    }
})

export default DrawerContent