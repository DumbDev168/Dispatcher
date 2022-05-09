import React from "react"
import { View, Text, Incubator, Colors } from "react-native-ui-lib"
import { s, ms } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"
import CountryPicker from 'react-native-country-picker-modal'
import { styles } from "@utils/customStyles"



const { TextField } = Incubator
const Register: ScreenComponent<PreviousScreenProps> = ({ componentId, shouldPop }) => {

    const onSelectCountry = (val: any) => {
        console.warn(val)
    }

    const { withFrame, inputContainer } = styles;

    return <View flex bg-bgColor>
        <View marginB-90 flex centerV paddingH-20>

            <Text textColor center style={{
                fontSize: ms(23),
                fontWeight: "bold",
            }}>{`Sign up with Dispatcher today\nfor DumbDev channel.`}</Text>
            <Text center marginB-15 marginT-8 textColorLight font13>{`Register with Dispatcher today to startconnection\nwith your family and friends\naround the world :).`}</Text>

            <View centerH marginT-30 marginB-20>
                <TextField
                    placeholder="Username"
                    style={{
                        paddingLeft: s(15),
                        fontSize: ms(14),
                    }}
                    fieldStyle={withFrame}
                    //@ts-ignore
                    containerStyle={inputContainer}
                />
                <TextField
                    placeholder="Enter Phone Number"
                    fieldStyle={withFrame}
                    //@ts-ignore
                    containerStyle={inputContainer}
                    style={{
                        fontSize: ms(14),
                    }}
                    keyboardType="number-pad"
                    placeholderTextColor={Colors.grey20}
                    leadingAccessory={(<View>
                        <CountryPicker
                            containerButtonStyle={{
                                paddingHorizontal: ms(10)
                            }}
                            onSelect={onSelectCountry}
                            // theme={DARK_THEME}
                            countryCode="US"
                            withFilter
                            withFlag
                            withCallingCode
                            withCallingCodeButton
                        /></View>)}
                />

                <TextField
                    secureTextEntry
                    placeholder="Password"
                    style={{
                        paddingLeft: s(15),
                        fontSize: ms(14),
                    }}
                    fieldStyle={withFrame}
                    //@ts-ignore
                    containerStyle={inputContainer}
                />
                <TextField
                    secureTextEntry
                    placeholder="Confirm password"
                    style={{
                        paddingLeft: s(15),
                        fontSize: ms(14),
                    }}
                    fieldStyle={withFrame}
                    //@ts-ignore
                    containerStyle={inputContainer}
                />
            </View>
            <CustomButton
                onPress={() => screens.push(componentId, 'RegisterOPT')} title="Register" />
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