import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Datail from './page/Detail';
import Incidents from './page/Incidents';

const AppStack = createStackNavigator();


export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false}}>
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Datail" component={Datail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}