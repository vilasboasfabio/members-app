import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from './src/screens/Login';
import DrawerRoutes from './src/routes/drawer.routes';
import UserRegistrationForm from './src/screens/CadastroUsuario';

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };

    checkUserToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Drawer"
            component={DrawerRoutes}
            options={{ headerShown: false }}
            initialParams={{ setUserToken }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginForm}
              options={{ headerShown: false }}
              initialParams={{ setUserToken }}
            />
            <Stack.Screen
              name="UserRegistration"
              component={UserRegistrationForm}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
