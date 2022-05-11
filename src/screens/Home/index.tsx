import React from "react"
import { View, Text, Image } from "react-native-ui-lib"
import { vs, s, ms } from "react-native-size-matters"
import CustomButton from "@components/CustomButton";
import { screens } from ".."
import { ScreenComponent } from "rnn-screens"

const _imageSize = 300;
const Home: ScreenComponent = ({ componentId }) => {
    return <View flex bg-white>
        <View marginB-90 flex center paddingH-20>
            <Image
                resizeMode="stretch"
                style={{
                    width: s(_imageSize),
                    height: s(_imageSize)
                }}
                assetName="chat" />
            <Text textColor center style={{
                fontSize: ms(17),
                fontWeight: "600",
                letterSpacing: 1.5
            }}>{`Connect easily with\nyour family and friends\naround the world!`}</Text>
        </View>
        <View height={vs(120)} centerV paddingH-20>
            <Text center marginB-15 textColor font12m>Terms & Policy Privacy</Text>
            <CustomButton onPress={() => screens.push(componentId, 'Register')} title="Get Started" />
        </View>

    </View>
}

export default Home;