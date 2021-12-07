import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/mainScreen'
import TabForkScreen from './screens/tabForkScreen'
import BuscketScreen from './screens/buscketScreen'
import LoginScreen from "./screens/loginScreen"
import RegistrationScreen from './screens/regScreen'
import CreateProductScreen from './screens/createProductScreen'
import UpdateProductScreen from './screens/updateProductScreen'
import { Provider } from 'react-redux'
import { store }  from './store/store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store = {store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'login' screenOptions = { {headerShown: false} }  >

          <Stack.Screen name = 'registration'>
            { (navigation) => <RegistrationScreen navigation = {navigation}/> }
          </Stack.Screen>

          <Stack.Screen name = 'login'>
            { (navigation) => <LoginScreen navigation = {navigation} /> }
          </Stack.Screen>

          <Stack.Screen name = 'main'>
            { (navigation) => <MainScreen 
              navigation = {navigation}
              category = {'all'}
            /> }
          </Stack.Screen>

          <Stack.Screen name = 'tabFork'>
            { (navigation) => <TabForkScreen 
              navigation = {navigation}
            /> }
          </Stack.Screen>

          <Stack.Screen name = 'buscket'>
            { (navigation) => <BuscketScreen/> }
          </Stack.Screen>

          <Stack.Screen name = 'createProduct'>
            { (navigation) => <CreateProductScreen 
              navigation = {navigation}
            /> }
          </Stack.Screen>

          <Stack.Screen name = 'updateProduct'>
            { (navigation) => <UpdateProductScreen 
              navigation = {navigation}
            /> }
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}

