import React, { useState, useRef, useEffect } from 'react'
import { ImageBackground, SafeAreaView, Text, TextInput, View, StyleSheet, StatusBar } from 'react-native'
import BackPageButton from '../../components/buttons/backPageButton'
import ButtonTwo from '../../components/buttons/buttonTwo'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window').width;
import SelectDropdown from 'react-native-select-dropdown';

const StyledScrollView = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'space-between'
    },
}))``;

const AddAddress = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const citiesDropdownRef = useRef();

    
    useEffect(() => {
        setTimeout(() => {
            setCountries([
                { title: 'Egypt', cities: [{ title: 'Cairo' }, { title: 'Alex' }] },
                { title: 'Canada', cities: [{ title: 'Toronto' }, { title: 'Quebec City' }] },
            ]);
        }, 1000);
    }, []);
    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <StatusBar translucent backgroundColor={'transparent'} />
            <StyledScrollView className='h-full bg-white flex'>
                <View>
                    <ImageBackground className='h-[20vh] px-[2vh] pt-[6vh]' source={require("../../assets/authBgImage.png")}>
                        <View className='flex flex-col items-start'>
                            <BackPageButton />
                            <Text className='text-[#fff] text-[37px] mt-4'>Add your Address</Text>
                        </View>
                    </ImageBackground>
                    <View className='px-[2vh] mt-1'>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">Full names</Text>
                            <TextInput keyboardType='email-address' style={{ borderRadius: 10 }} aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' defaultValue='Peace Ishimwe' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for phone number" className='text-base text-textMainColor font-medium' nativeID="email">Mobile number</Text>
                            <TextInput keyboardType='phone-pad' style={{ borderRadius: 10 }} aria-labelledby="phone" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='(+91) 972-585-3396' defaultValue='(+91) 972-585-3396' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">State</Text>
                            <SelectDropdown
                                data={countries}
                                search={true}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    citiesDropdownRef.current.reset();
                                    setCities([]);
                                    setCities(selectedItem.cities);
                                }}
                                defaultButtonText={'Select country'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.title;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.title;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#34A853'} size={16} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                            />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">City</Text>
                            <SelectDropdown
                                ref={citiesDropdownRef}
                                data={cities}
                                search={true}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                }}
                                defaultButtonText={'Select city'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.title;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.title;
                                }}
                                buttonStyle={styles.dropdown2BtnStyle}
                                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#34A853'} size={16} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown2DropdownStyle}
                                rowStyle={styles.dropdown2RowStyle}
                                rowTextStyle={styles.dropdown2RowTxtStyle}
                            />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">Street (Include farm index number)</Text>
                            <TextInput keyboardType='email-address' style={{ borderRadius: 10 }} aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: KN 197' defaultValue='Street' />
                        </View>
                        <View className='my-10'>
                            <ButtonTwo name='SAVE' />
                        </View>
                    </View>
                </View>
            </StyledScrollView>
        </SafeAreaView>
    )
}

export default AddAddress


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
    viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10%',
    },
    dropdownsRow: { flexDirection: 'row', width: '100%', paddingHorizontal: '5%' },

    dropdown1BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#0DFF4D',
        width: '100%',
        marginTop: 10,
        height: 55,
        borderRadius: 10
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    divider: { width: 12 },
    dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#0DFF4D',
        width: '100%',
        marginTop: 10,
        height: 55,
        borderRadius: 10
    },
    dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown2DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { color: '#444', textAlign: 'left' },
});