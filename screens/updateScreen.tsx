import React, {useState, useRef} from 'react'
import { View, StyleSheet } from 'react-native'
import CustomInput from '../components/customInput'
import titleFieldSchema from '../schemes/titleFieldSchema'
import CustomPicker from '../components/customPicker'
import translate from '../translate/transtalte'
import { TextInput } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import {RootState} from '../store/store'
import { updateCategorySaga } from '../store/actions/categoriesActions'

const UpdateCategoryScreen = () => {

    const [newTitle, setNewTitle] = useState( { id: '', title: '', name: '' } )
    const pickerRef = useRef<RNPickerSelect | null>(null);
    const inputRef = useRef<TextInput | null>(null);
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelector( state => state.user );
    const categories = useAppSelector( state => state.categories )
    const dispatch = useDispatch()

    const updateCategory = async() => {
        if( newTitle.title === newTitle.name ){
            alert('New and old name are same')
        }
        else{  
            dispatch( updateCategorySaga( { ...newTitle, userId: user.id } ) );
 
            if( null !== pickerRef.current ){
                pickerRef.current.setState( { label: '', value: '' } );
            }

            if( null !== inputRef.current ){
                inputRef.current.setNativeProps( { text: '' } );
            }
        }  
    }

    const onSelectorPick = ( event: string ) => {
        let temp = categories.find( (category) => {
            if( event === category.name ){
                return true
            }
            else{
                return false
            }
        })

        if(temp){
            setNewTitle( { title: newTitle.title, ...temp } );
        }
    }

    const getPickerRef = ( ref: RNPickerSelect ) => {
        pickerRef.current = ref;
    }

    const getInputRef = ( ref: TextInput ) => {
        inputRef.current = ref
    }

    return(
        <View style = { styles.container } >
            <CustomInput
                userData = {newTitle}
                setUserData = {setNewTitle}
                field = {'title'}
                schema = {titleFieldSchema}
                isSecure = {false}
                keyboardType = {'default'}
                defaultValue = {''}
                getRef = {getInputRef}
                placeholder = { translate.t('enterTitle') }
            />
        
            <CustomPicker
                onSelectorPick = { onSelectorPick }
                getRef = {getPickerRef}
                placeholder = { translate.t('selectItem') }
            />
            
            <Button mode = 'contained' onPress = {updateCategory} style = {styles.button} labelStyle = { styles.buttonLabel } >
                { translate.t('update') }
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

export default UpdateCategoryScreen