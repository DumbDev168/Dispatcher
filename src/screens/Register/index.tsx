import React, { useState, useEffect } from "react"
import { View, Text, Colors } from "react-native-ui-lib"
import { ms } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"
import CountryPicker, { CountryCode, CallingCode, Country } from 'react-native-country-picker-modal'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomTextField from "@components/CustomTextField"
import { ScrollView } from "react-native"
import useDynamicRef from "use-dynamic-refs"
import generateRef, { IRefKey } from "@utils/generateOnSubmitRef"
import _isEmpty from "lodash/isEmpty"
import { useStore } from "@stores/useStore"

interface IRegister {
    username: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
}

const schema = yup.object().shape({
    username: yup.string().min(4, 'Username must be at least 4 chars.').required('Please enter your username.'),
    phone_number: yup.number().typeError("Phone number must be a number.").min(8, 'Please enter a valid phone number.').required('Please enter your phone number.'),
    password: yup.string().min(6, 'Password requires at least 6 chars').required('Please enter your password'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Password must be match').required('Please enter a password confiramtion')
});



const refKeys: IRefKey[] = [
    {
        ref: "_usernameRef",
        nextRef: "_phoneNumerRef",
        returnKeyType: "next",
        blurOnSubmit: false
    },
    {
        ref: "_phoneNumerRef",
        nextRef: "_passwordRef",
        returnKeyType: "next",
        blurOnSubmit: false
    },
    {
        ref: "_passwordRef",
        nextRef: "_passwordConfirmationRef",
        returnKeyType: "next",
        blurOnSubmit: false
    },
    {
        ref: "_passwordConfirmationRef",
        returnKeyType: "done",
        blurOnSubmit: true
    },
]


const Register: ScreenComponent<PreviousScreenProps> = ({ componentId, shouldPop }) => {

    const { register, isLoading, registerSuccess } = useStore(state => state);

    // console.warn('isLoading', isLoading)
    const { control, formState, handleSubmit } = useForm<IRegister>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const { isValid, dirtyFields, errors } = formState;
    const [countryCode, setCountryCode] = useState<CountryCode>("US")
    const [callingCode, setCallingCode] = useState<CallingCode>("1")

    const [getRef, setRef] = useDynamicRef();
    const generateOnSubmitRef = (index: number): Object => {
        return generateRef(index, refKeys, setRef, getRef)
    }

    useEffect(() => {
        if (registerSuccess) {
            screens.push(componentId, "RegisterOPT")
        }
    }, [registerSuccess])

    const onSubmit = (data: IRegister) => {
        const dataSend = {
            ...data,
            phone_number: `+${callingCode}${data.phone_number}`
        }
        register(dataSend);
    }

    const onSelectCountry = (val: Country) => {
        //  console.warn(val)
        setCountryCode(val.cca2)
        setCallingCode(val.callingCode[0]);
    }

    return <ScrollView keyboardShouldPersistTaps="handled">
        <View flex bg-bgColor paddingT-20>
            <View marginB-90 flex centerV paddingH-20>

                <Text textColor center style={{
                    fontSize: ms(23),
                    fontWeight: "bold",
                }}>{`Sign up with Dispatcher today\nfor DumbDev channel.`}</Text>
                <Text center marginB-15 marginT-8 textColorLight font13>{`Register with Dispatcher today to startconnection\nwith your family and friends\naround the world :).`}</Text>

                <View centerH marginT-30 marginB-20>
                    <CustomTextField
                        name="username"
                        control={control}
                        textFieldProps={{
                            placeholder: "John Cena",
                            label: "Username",
                            ...generateOnSubmitRef(0)
                        }}
                    />
                    <CustomTextField
                        name="phone_number"
                        control={control}
                        textFieldProps={{
                            ...generateOnSubmitRef(1),
                            placeholder: "########",
                            label: "Phone Number",
                            keyboardType: "number-pad",
                            leadingAccessory: (<View>
                                <CountryPicker

                                    containerButtonStyle={{
                                        paddingHorizontal: ms(10)
                                    }}
                                    onSelect={onSelectCountry}
                                    countryCode={countryCode}
                                    withFilter
                                    withFlag
                                    withCallingCode
                                    withCallingCodeButton
                                /></View>)
                        }}
                    />

                    <CustomTextField
                        name="password"
                        control={control}
                        textFieldProps={{
                            ...generateOnSubmitRef(2),
                            placeholder: "******",
                            label: "Password",
                            secureTextEntry: true
                        }}
                    />

                    <CustomTextField
                        name="password_confirmation"
                        control={control}
                        textFieldProps={{
                            ...generateOnSubmitRef(3),
                            placeholder: "******",
                            label: "Password Confirmation",
                            secureTextEntry: true
                        }}
                    />
                </View>
                <CustomButton
                    isLoading={isLoading}
                    onPress={handleSubmit(onSubmit)}
                    title="Register"
                    buttonProps={{
                        disabled: isLoading || !isValid || !_isEmpty(errors) || _isEmpty(dirtyFields)
                    }}
                />
                <Text marginT-10 font13b center grey20>
                    <Text>{`Already has an account? `}</Text>
                    <Text
                        marginL-10
                        onPress={() => {
                            if (shouldPop) {
                                screens.pop(componentId)
                            } else {
                                screens.push(componentId, "Login", { shouldPop: true })
                            }
                        }}>{`Login Now!`}</Text>
                </Text>

            </View>
        </View>
    </ScrollView>
}

export default Register;