import { Dimensions } from "react-native";
import { useRoute, getFocusedRouteNameFromRoute, RouteProp, NavigationState } from "@react-navigation/native";


// Window dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export { windowHeight, windowWidth }

// Recursive function to get the deepest active route state
// @ts-ignore
const getActiveRouteState = (route: NavigationState): Route<string> => {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
        // @ts-ignore
        return route as Route<string>; // Return if no further routes
    }

    // Get the current active child route
    // @ts-ignore
    const childActiveRoute = route.routes[route.index] as NavigationState;

    // Check if this child route has a nested state
    // @ts-ignore
    if (childActiveRoute.state) {
        // Recursive call if there's a nested state
        // @ts-ignore
        return getActiveRouteState(childActiveRoute.state as NavigationState);
    }

    // If no nested state, return the current child route
    // @ts-ignore
    return childActiveRoute as Route<string>;
};

// Function to get the current route name and any nested route names
const getCurrentRouteName = (route: NavigationState): { topLevelRoute: string; nestedRoute?: string } => {
    const activeRoute = getActiveRouteState(route); // Get the deepest active route
    console.log(activeRoute)
    // Get the top-level route name
    const topLevelRoute = activeRoute.name;

    // Initialize nested route name to undefined
    let nestedRoute: string | undefined;

    // If the top-level route is Homestack, check for a nested route
    if (activeRoute.name === 'Homestack' && activeRoute.state) {
        const nestedActiveRoute = getActiveRouteState(activeRoute.state as NavigationState);
        nestedRoute = nestedActiveRoute.name; // Get the name of the nested route
    }

    return { topLevelRoute, nestedRoute };
};



// Get the route name
const RouteName = () => {
    const route = useRoute();
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName
}

export { RouteName, getActiveRouteState, getCurrentRouteName }


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