import React, {useState, useRef} from 'react'
import { View, StyleSheet } from 'react-native'
import CustomInput from '../components/customInput'
import titleFieldSchema from '../schemes/titleFieldSchema'
import { TextInput } from 'react-native-gesture-handler'
import translate from '../translate/transtalte'
import { Button } from 'react-native-paper'
import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux'
import { RootState } from '../store/store'
import { createCategorySaga } from '../store/actions/categoriesActions'

const CreateNewScreen = () => {
    const [categoryData, setCategoryData] = useState( { title: ''} )
    const inputRef = useRef<TextInput | null>(null)
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = useAppSelector( store => store.user )
    const dispatch = useDispatch();

    const createCategory = async() => {
        dispatch( createCategorySaga( { ...categoryData, userId: user.id } ) )
        if( null !== inputRef.current ){
            inputRef.current.setNativeProps( { text: '' } );
        }
    }

    const getInputRef = ( ref: TextInput ) => {
        if( null !== inputRef.current){
            inputRef.current = ref;
        }  
    }

    return(
        <View style = { styles.container } >
            <CustomInput
                userData = {categoryData}
                setUserData = {setCategoryData}
                field = {'title'}
                schema = {titleFieldSchema}
                isSecure = {false}
                keyboardType = {'default'}
                defaultValue = {''}
                getRef = {getInputRef}
                placeholder = { translate.t('enterTitle') }
            />
       
            <Button mode = 'contained' onPress = {createCategory} style = {styles.button} labelStyle = { styles.buttonLabel } >
                { translate.t('create') }
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
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
})

export default CreateNewScreen