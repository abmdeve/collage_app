import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CollageScreen from "../screens/CollageScreen";
import TemplatePreviewScreen from "../screens/TemplatePreviewScreen";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import CreateScreen from "./CreateScreen";
import EditScreen from "./EditScreen";


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = () => (


    <Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen 
        name="Collage" 
        component={CollageScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen 
        name="TemplatePreview" 
        component={TemplatePreviewScreen} options={{
            headerShown: false
        }} />
    </Stack.Navigator>
)

const TabBarIcon = ({name, focused, isPlus}: {name: any, focused: boolean, isPlus?: boolean}) => {
    return(
        <View style={[styles.iconConatainer, isPlus && styles.plusIconConatainer]}>
            <Ionicons name={name} size={isPlus ? 30 : 24} color={isPlus ? "#FFF" : focused ? "#FF5A5F" : "#8E8E93"} />
        </View>
    )
}

export default function AppNaivagator() {

return(
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel
    }}
    >
        <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
            tabBarIcon: ({focused}) => (
                <TabBarIcon name={"home-outline"} focused={focused} />
            ),
            tabBarLabel: "Home",
            headerShown: false
        }}
         />
        <Tab.Screen 
        name="Create" 
        component={CreateScreen}
        options={{
            tabBarIcon: ({focused}) => (
                <TabBarIcon name={"add"} focused={focused} isPlus />
            ),
        }}
         />
        <Tab.Screen 
        name="My Works" 
        component={EditScreen}
        options={{
            tabBarIcon: ({focused}) => (
                <TabBarIcon name={"folder-outline"} focused={focused} />
            ),
            tabBarLabel: "Home",
            headerShown: false
        }}
         />
    </Tab.Navigator>
)

}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 8,
        shadowRadius: .1,
        shadowOpacity: .1,
        shadowOffset: {width: 8, height: -2},
        paddingBottom: 5
    },

    iconConatainer: {
        alignItems: 'center',
        justifyContent: "center"
    },
    plusIconConatainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FF5A5F",
        marginTop: -20
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 5,
        color: "#8E8E93"
    }
})