import { Dimensions } from "react-native";
import { useRoute, getFocusedRouteNameFromRoute, RouteProp, NavigationState } from "@react-navigation/native";


// Window dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export { windowHeight, windowWidth }

// Get the route name
const RouteName = () => {
    const route = useRoute();
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName
}

export { RouteName }


// Greeting based on time 
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

export { getGreeting }