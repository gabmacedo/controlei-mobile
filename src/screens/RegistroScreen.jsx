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
import { registerUser } from "../firebase/firebase"

export default function RegistroScreen({ navigation }) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleRegistro = async () => {
    if (!nome || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos")
      return
    }

    if (nome.length <= 2) {
      Alert.alert("Erro", "Insira um nome válido")
      return
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres")
      return
    }

    setLoading(true)
    try {
      await registerUser(email, password, nome)
      Alert.alert(
        "Sucesso!",
        "Cadastro realizado com sucesso. Faça login para continuar.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      )
    } catch (error) {
      let mensagem = "Erro ao criar conta"
      if (error.code === "auth/email-already-in-use") {
        mensagem = "Este email já está em uso"
      } else if (error.code === "auth/invalid-email") {
        mensagem = "Email inválido"
      } else if (error.code === "auth/weak-password") {
        mensagem = "Senha muito fraca"
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
          <Text style={styles.formTitle}>Registre-se</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#71717a"
                value={nome}
                onChangeText={setNome}
              />
            </View>
          </View>

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
            <Text
              style={[
                styles.passwordHint,
                password.length >= 6
                  ? styles.passwordValid
                  : styles.passwordInvalid,
              ]}
            >
              • Mínimo de 6 caracteres
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegistro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já possui acesso? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Entrar</Text>
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
    height: "35%",
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
    paddingTop: 30,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
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
  passwordHint: {
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  passwordValid: {
    color: "#86efac",
  },
  passwordInvalid: {
    color: "#fca5a5",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#d4d4d8",
  },
  loginLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})
