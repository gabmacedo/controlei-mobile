import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "react-native"
import AuthProvider, { useAuth } from "./src/context/AuthContext"
import LoginScreen from "./src/screens/LoginScreen"
import RegistroScreen from "./src/screens/RegistroScreen"
import DashboardScreen from "./src/screens/DashboardScreen"

const Stack = createNativeStackNavigator()

function Navigation() {
  const { user, loading } = useAuth()

  if (loading) {
    return null // ou um componente de loading
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#18181b" },
      }}
    >
      {user ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#18181b" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  )
}
