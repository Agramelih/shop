import React from 'react'
import { View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store/store'

type Props = {
    onSelectorPick: any,
    getRef: any,
    placeholder: string
}

const CustomPicker: React.FC<Props> = (props) => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const categories = useAppSelector( state => state.categories );

    return(
        <View style = { styles.selectorWrapper }>
            <RNPickerSelect 
                ref = { ( ref ) => { props.getRef(ref) } }
                onValueChange={ (value) => props.onSelectorPick(value) }
                useNativeAndroidPickerStyle = {false}
                placeholder = { { label: props.placeholder, value: null } }
                items={
                    categories.map( (category) => {
                        return { label: category.name, value: category.name }
                    })
                }
                style = { 
                    {
                        inputAndroid: styles.selector,
                        placeholder: styles.selectorPlaceholder
                    }
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    selectorWrapper:{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,

    },

    selector: {
        padding: 10,
        color: 'black',
        width: '100%'
    },
    
    selectorPlaceholder: {
        color: 'black',
    }
})

export default CustomPicker