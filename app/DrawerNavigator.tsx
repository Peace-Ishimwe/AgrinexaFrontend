import React from 'react'
import CustomDrawer from '@/container/CustomDrawer'
import TabNavigator from './(tabs)/_layout'
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