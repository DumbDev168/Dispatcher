import React from "react"
import { View, Text, Incubator, } from "react-native-ui-lib"
import { s, ms } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"
import { styles } from "@utils/customStyles"

const { TextField } = Incubator
const Login: ScreenComponent<PreviousScreenProps> = ({ componentId, shouldPop }) => {

    const onSelectCountry = (val: any) => {
        console.warn(val)
    }
    const { withFrame, inputContainer } = styles;
    return <View flex bg-bgColor>
        <View marginB-90 flex centerV paddingH-20>
            <Text textColor center style={{
                fontSize: ms(23),
                fontWeight: "bold",
            }}>{`Sign up now and become a Dumb like DumbDev\nchannel.`}</Text>
            <Text center marginB-15 marginT-8 textColorLight font13>{`Login with Dispatcher today to let you connect with your friends around the globe!`}</Text>

            <View centerH marginT-30 marginB-20>
                <TextField
                    placeholder="Enter username"
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
                    placeholder="Enter password"
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
                onPress={() => screens.push(componentId, 'RegisterOPT')} title="Sign In" />
            <Text marginT-10 font13b center grey20>
                <Text>{`Don't have an account? `}</Text>
                <Text
                    marginL-10
                    onPress={() => {
                        if (shouldPop) {
                            screens.pop(componentId)
                        } else {
                            screens.push(componentId, "Register", { shouldPop: true })
                        }
                    }}>{`Register Now!`}</Text>

            </Text>

        </View>


    </View>
}

export default Login;