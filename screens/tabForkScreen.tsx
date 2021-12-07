import React, {useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screens/mainScreen'
import CreateNewScreen from '../screens/createNewCategory'
import UpdateCategoryScreen from '../screens/updateScreen'
import DeleteCategoryScreen from '../screens/deleteCategoryScreen'
import Spinner from 'react-native-loading-spinner-overlay'
import DrawerContent from './DrawerContent'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { storeCategorySaga } from '../store/actions/categoriesActions'

const Drawer = createDrawerNavigator();

type Props = {
    navigation: any,
}

const TabForkScreen:React.FC<Props> = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelector( state => state.user );
    const categories = useAppSelector( state => state.categories );
    const dispatch = useDispatch();

    const getAllCaregories = async() => {
        dispatch( storeCategorySaga() )
        setTimeout( () => { setIsLoading(false) }, 2000)
    }

    useEffect( () => {
        getAllCaregories()
    },[])

    if( isLoading ){ return <Spinner visible = { true } />}

    return(
        <Drawer.Navigator
            initialRouteName="all categories" 
            drawerContent = { ( drawerProps ) => <DrawerContent 
                drawerNav = {drawerProps.navigation}
                navigator = {props.navigation.navigation}
            /> }
        >
            <Drawer.Screen name="all categories">
                {() => <MainScreen 
                    navigation = {props.navigation}
                />}
            </Drawer.Screen>

            {
                categories.map( ( category, index ) => {
                    return(
                        <Drawer.Screen  name = { category.name } key = {index}>
                            {() => <MainScreen 
                                navigation = {props.navigation}
                            />}
                        </Drawer.Screen>
                    )
                })
            }

            {
                user.type === 'admin' && (

                    <Drawer.Screen name = "create">
                        {() => <CreateNewScreen/>}
                    </Drawer.Screen>
                    
                )
                
            }    
            
            {
                user.type === 'admin' && (
                    <Drawer.Screen name = "update">
                        {() => <UpdateCategoryScreen/>}
                    </Drawer.Screen>
                )
            }

            {
                user.type === 'admin' && (
                    <Drawer.Screen name = "delete">
                        {() => <DeleteCategoryScreen/>}
                    </Drawer.Screen>
                )
            }

            

        </Drawer.Navigator>
    )
}

export default TabForkScreen