import React from "react"
import { Button, Shadows, Spacings } from "react-native-ui-lib"

interface IProps {
    title: string;
    onPress: () => void;
}

const CustomButton = ({ title, onPress }: IProps) => {
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
        }} />
}
export default CustomButton