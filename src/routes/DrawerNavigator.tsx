import React from 'react'
import CustomDrawer from './content/CustomDrawer'
import TabNavigator from './TabNavigator'
import { DrawerNavigatorProvider } from '../context/DrawerContext'

const DrawerNavigator = () => {
    return (
        <DrawerNavigatorProvider>
            <CustomDrawer>
                <TabNavigator />
            </CustomDrawer>
        </DrawerNavigatorProvider>
    )
}

export default DrawerNavigator