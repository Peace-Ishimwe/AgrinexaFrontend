import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" />
            <Stack.Screen name="RegisterWithEmail" />
            <Stack.Screen name="RegisterWithPhone" />
            <Stack.Screen name="ResetPassword" />
            <Stack.Screen name="VerificationCode" />
        </Stack>
    )
}

export default AuthLayout;