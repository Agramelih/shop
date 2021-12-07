import React, {useState, useRef} from 'react'
import { View, StyleSheet } from 'react-native'
import CustomPicker from '../components/customPicker'
import translate from '../translate/transtalte'
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import {RootState} from '../store/store'
import {deleteCategorySaga} from '../store/actions/categoriesActions'

const DeleteCategoryScreen = () => {

    const [productforDelete, setProductForDelete] = useState( { name: '', id: '' } );
    const pickerRef = useRef<RNPickerSelect | null>(null);
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = useAppSelector( state => state.user );
    const categories = useAppSelector( state => state.categories );
    const dispatch = useDispatch();

    const deleteCategory = async() => {
        dispatch( deleteCategorySaga( {...productforDelete, userId: user.id } ) );
    }

    const getRef = ( ref: RNPickerSelect ) => {
        pickerRef.current = ref;
    }

    const selectProductForDelete = ( event: string ) => {
        let temp = categories.find( (category) => {
            if( event === category.name ){
                return true
            }
            else{
                return false
            }
        })

        if(temp){
            setProductForDelete( temp )
        }
    }

    return(
        <View style = { styles.container } >
            <CustomPicker
                onSelectorPick = { selectProductForDelete }
                getRef = {getRef}
                placeholder = { translate.t('selectItem') }
            />

            <Button mode = 'contained' onPress = {deleteCategory} style = {styles.button} labelStyle = { styles.buttonLabel } >
                { translate.t('delete') }
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

export default DeleteCategoryScreen