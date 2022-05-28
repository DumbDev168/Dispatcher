import React from "react"
import { Button, Shadows, Spacings, ButtonProps, Colors } from "react-native-ui-lib"
import { ActivityIndicator } from "react-native"

interface IProps {
    title: string;
    isLoading?: boolean;
    onPress: () => void;
    buttonProps?: ButtonProps
}

const CustomButton = ({ title, onPress, buttonProps, isLoading }: IProps) => {
    return <Button

        paddingV-15
        marginH-16
        label={title}
        onPress={onPress}
        fullWidth
        bg-primary
        font15b
        style={{
            borderRadius: Spacings.s10,
            ...Shadows.sh10.top
        }}
        iconSource={() => {
            return isLoading ? <ActivityIndicator style={{
                marginRight: 5
            }} color={Colors.white} /> : null
        }}
        {...buttonProps}

    />
}
export default CustomButton