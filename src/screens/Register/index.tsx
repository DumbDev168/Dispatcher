import React from "react"
import { View, Text } from "react-native-ui-lib"
import { ms } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"
import CountryPicker from 'react-native-country-picker-modal'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomTextField from "@components/CustomTextField"

interface IRegister {
    username: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
}

const schema = yup.object().shape({
    username: yup.string().min(4, 'Username must be at least 4 chars.').required('Please enter your username.'),
    phone_number: yup.string().min(8, 'Please enter a valid phone number.').required('Please enter your phone number.'),
    password: yup.string().min(6, 'Password requires at least 6 chars').required('Please enter your password'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Password must be match').required('Please enter a password confiramtion')
});



const Register: ScreenComponent<PreviousScreenProps> = ({ componentId, shouldPop }) => {

    const { control, formState, handleSubmit } = useForm<IRegister>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })


    const onSubmit = (data: IRegister) => {
        console.warn('data', data)
    }

    const onSelectCountry = (val: any) => {
        console.warn(val)
    }



    return <View flex bg-bgColor>
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
                        placeholder: "Username"
                    }}
                />
                <CustomTextField
                    name="phone_number"
                    control={control}
                    textFieldProps={{
                        placeholder: "Enter Phone Number",
                        keyboardType: "number-pad",
                        leadingAccessory: (<View>
                            <CountryPicker
                                containerButtonStyle={{
                                    paddingHorizontal: ms(10)
                                }}
                                onSelect={onSelectCountry}
                                countryCode="US"
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
                        placeholder: "Password",
                        secureTextEntry: true
                    }}
                />

                <CustomTextField
                    name="password_confirmation"
                    control={control}
                    textFieldProps={{
                        placeholder: "Password Confirmation",
                        secureTextEntry: true
                    }}
                />
            </View>
            <CustomButton
                onPress={handleSubmit(onSubmit)} title="Register" />
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
}

export default Register;