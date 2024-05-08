import { Stack } from "expo-router";

const PublicLayout = () => {
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