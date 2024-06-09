import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Image } from 'react-native';
import { AuthProvider } from '../context/authContext';

import Home from "../screens/Home";
import CadastroRestaurantes from "../screens/CadastroRestaurantes";
import CadastroEquipeUsuarios from "../screens/CadastroEquipeUsuarios";
import Desenvolvedores from "../screens/Desenvolvedores";
import Contato from "../screens/Contato";
import CustomDrawerContent from "../components/CustomDrawer/CustomDrawerContent";
import CadastroUsuario from '../screens/CadastroUsuario';
import RestaurantDetails from "../screens/DetalheRestaurante";
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesPage from '../screens/FavoritosPage';
import ImageDrawer from '../components/ImageDrawer'

const Drawer = createDrawerNavigator();

const DrawerRoutes = ({route}) => {
  const { setUserToken } = route.params;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };
  return (
    <AuthProvider>
      <Drawer.Navigator
        drawerContent={(props) => <ImageDrawer {...props} />}
        screenOptions={{
          drawerActiveTintColor: "white",
          headerTintColor: "white",
          drawerLabelStyle: {
            color: "white",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right"}}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 75,
                    marginLeft: 270,
                    marginBottom: 40,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="CadastroRestaurantes"
          component={CadastroRestaurantes}
          options={{
            title: "Cadastro Restaurantes",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="CadastroEquipeUsuarios"
          component={CadastroEquipeUsuarios}
          options={{
            title: "Cadastro Equipe de Usuários",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="CadastroUsuario"
          component={CadastroUsuario}
          options={{
            title: "Cadastro de Usuários",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="Desenvolvedores"
          component={Desenvolvedores}
          options={{
            title: "Desenvolvedores",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="Contato"
          component={Contato}
          options={{
            title: "Contato",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="RestaurantDetails"
          component={RestaurantDetails}
          options={{
            drawerItemStyle: { height: 0 }, // Esconde o item no menu
            unmountOnBlur: true, // Desmonta a tela ao perder o foco
            title: "Detalhes do Restaurante",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
         <Drawer.Screen
          name="Favoritos"
          component={FavoritesPage}
          options={{
            title: "Favoritos",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerItemStyle: { height: 0 }, // Esconde o item no menu
            unmountOnBlur: true, // Desmonta a tela ao perder o foco
            title: "Login",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "right" }}>
                <Image
                  source={require("../../assets/logonova.png")}
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 270,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#04233f",
            },
            drawerStyle: {
              backgroundColor: "#04233f",
            },
          }}
        />
        <Drawer.Screen
        name="Logout"
        component={() => null}
        listeners={{
          drawerItemPress: handleLogout,
        }}
        options={{
          title: "Logout",
          drawerLabelStyle: {
            color: "white",
          },
        }}
      />
      </Drawer.Navigator>
    </AuthProvider>
  );
};

export default DrawerRoutes;