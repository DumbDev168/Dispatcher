import React from "react"
import { Button, Shadows, Spacings, ButtonProps } from "react-native-ui-lib"

interface IProps {
    title: string;
    onPress: () => void;
    buttonProps?: ButtonProps
}

const CustomButton = ({ title, onPress, buttonProps }: IProps) => {
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
        {...buttonProps}

    />
}
export default CustomButton