import React from "react"
import { View, Text } from "react-native-ui-lib"

import { ScreenComponent } from "rnn-screens"

const Dashboard: ScreenComponent<PreviousScreenProps> = ({ componentId }) => {

    return <View flex bg-bgColor center>
        <Text primary>Authenicated Screen</Text>
    </View>
}

export default Dashboard;