import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";

const PublicLayout = () => {
    const { isAuthenticated }  = useAuth();
    if(isAuthenticated) {
        <Redirect href={"/(tabs)/Home"} />
    }
    return (
        <Stack initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" />
            <Stack.Screen name="CompletedSuccess" />
            <Stack.Screen name="CompletedSuccesVerified" />
            <Stack.Screen name="OnBoarding" />
            <Stack.Screen name="PersonalizeExperience" />
        </Stack>
    )
}

export default PublicLayout;