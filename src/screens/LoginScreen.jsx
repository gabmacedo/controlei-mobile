import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { loginUser } from "../firebase/firebase"

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos")
      return
    }

    setLoading(true)
    try {
      await loginUser(email, password)
      // A navegação será feita automaticamente pelo AuthContext
    } catch (error) {
      let mensagem = "Erro ao fazer login"
      if (error.code === "auth/invalid-credential") {
        mensagem = "Email ou senha incorretos"
      } else if (error.code === "auth/user-not-found") {
        mensagem = "Usuário não encontrado"
      }
      Alert.alert("Erro", mensagem)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topSection}>
          <LinearGradient
            colors={["#2563eb", "#1d4ed8"]}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.title}>
                Controle seus{"\n"}pequenos gastos.
              </Text>
              <Text style={styles.subtitle}>
                Organize suas finanças e descubra para onde vai o seu dinheiro.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Login</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                placeholderTextColor="#71717a"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#71717a"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Ainda não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text style={styles.registerLink}>Registrar-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    height: "40%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  headerContent: {
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: "#d4d4d8",
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27272a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#52525b",
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  eyeIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#d4d4d8",
  },
  registerLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})
