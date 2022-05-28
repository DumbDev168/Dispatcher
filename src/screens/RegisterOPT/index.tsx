import React, { useRef, useCallback, useEffect, useState } from "react"
import { View, Text, Colors } from "react-native-ui-lib"
import { vs, ms, s } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';
import { useStore } from "@stores/useStore";

const RegisterOPT: ScreenComponent = ({ componentId }) => {
    const otpRef = useRef<OtpInputsRef>()
    const { registeredUser, isLoading, verifyRegisterAccount } = useStore(state => state)

    // console.warn('isLoading', isLoading)
    const [code, setCode] = useState<string>();


    useEffect(() => {
        console.warn('dataSend', {
            code: code,
            phone_number: registeredUser?.phone_number || ""
        })
        if (code?.length === 6) {
            verifyRegisterAccount({
                code: code,
                phone_number: registeredUser?.phone_number || ""
            })
        }
    }, [code, registeredUser])

    useEffect(() => {
        if (!registeredUser) {
            screens.pop(componentId)
        }
    }, [registeredUser])

    useEffect(() => {
        useStore.setState({
            registerSuccess: false
        })
        focusOTP()
    }, [])

    const focusOTP = useCallback(() => {
        try {
            otpRef?.current?.focus();
        } catch (er) { }
    }, [])

    const resetOTP = useCallback(() => {
        try {
            otpRef?.current?.reset();
        } catch (er) { }
    }, [])


    return <View flex bg-bgColor>
        <View marginB-90 flex centerV paddingH-20>
            <Text textColor center style={{
                fontSize: ms(23),
                fontWeight: "bold",
            }}>{`Enter 6 digits code to verify\nyour phone number.`}</Text>
            <Text center marginB-15 marginT-8 textColorLight font13>{`We have sent you on SMS with the verification\ncode to +1XXXXXXXXX.`}</Text>

            <View
                centerH
                marginT-30
                width={"100%"}
                height={vs(100)}
                marginB-20>
                <OtpInputs
                    //@ts-ignore
                    ref={otpRef}
                    autofillListenerIntervalMS={5000}
                    clearTextOnFocus={true}
                    placeholder="#"
                    placeholderTextColor={Colors.grey30}
                    inputStyles={{
                        color: Colors.grey20,
                        fontSize: ms(30),
                        width: ms(60),

                    }}
                    inputContainerStyles={{
                        width: ms(30),
                        borderRadius: ms(15),
                        paddingHorizontal: s(5)
                    }}
                    handleChange={(code) => {
                        setCode(code)
                    }}
                    // editable={!isLoading}
                    numberOfInputs={6}
                    autofillFromClipboard
                />

            </View>

            <CustomButton
                onPress={() => console.warn('RegisterOPT')}
                title="Resend Code"
                buttonProps={{
                    disabled: isLoading
                }}

            />
            <Text font13 center marginT-5 textColorLight>Do not received the code?</Text>
        </View>


    </View>
}

export default RegisterOPT;