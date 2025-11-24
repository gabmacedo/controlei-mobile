import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useAuth } from "../context/AuthContext"
import {
  criarAssinatura,
  buscarAssinaturas,
  deletarAssinatura,
} from "../firebase/firebaseUtils"
import ProductCard from "../components/ProductCard"
import ModalProduct from "../components/ModalProduct"

export default function DashboardScreen() {
  const { user } = useAuth()
  const [assinaturas, setAssinaturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    carregarAssinaturas()
  }, [user])

  const carregarAssinaturas = async () => {
    if (!user?.uid) return

    try {
      const data = await buscarAssinaturas(user.uid)
      setAssinaturas(data)
    } catch (error) {
      console.error("Erro ao carregar assinaturas:", error)
      Alert.alert("Erro", "Não foi possível carregar as assinaturas")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleCriarAssinatura = async (dados) => {
    try {
      const nova = await criarAssinatura(user.uid, dados)
      setAssinaturas((prev) => [nova, ...prev])
      setIsModalOpen(false)
      Alert.alert("Sucesso", "Assinatura criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar:", error)
      Alert.alert("Erro", "Não foi possível criar a assinatura")
    }
  }

  const handleDeletarAssinatura = (id, nome) => {
    Alert.alert("Confirmar exclusão", `Deseja realmente excluir "${nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deletarAssinatura(id)
            setAssinaturas((prev) => prev.filter((a) => a.id !== id))
            Alert.alert("Sucesso", "Assinatura excluída")
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir")
          }
        },
      },
    ])
  }

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth)
          } catch (error) {
            console.error("Erro ao sair:", error)
          }
        },
      },
    ])
  }

  const onRefresh = () => {
    setRefreshing(true)
    carregarAssinaturas()
  }

  const calcularTotal = () => {
    return assinaturas
      .filter((a) => a.status === "Ativa")
      .reduce((total, a) => total + (a.preco || 0), 0)
      .toFixed(2)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Controlei</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Deslogar</Text>
        </TouchableOpacity>
      </View>

      {/* card resumo */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Gasto Mensal Total</Text>
        <Text style={styles.summaryValue}>R$ {calcularTotal()}</Text>
        <Text style={styles.summarySubtitle}>
          {assinaturas.filter((a) => a.status === "Ativa").length} assinaturas
          ativas
        </Text>
      </View>

      {/* criar assinatura */}
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.newButtonText}>Nova Assinatura</Text>
      </TouchableOpacity>

      {/* listar assinaturas */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Minhas Assinaturas</Text>
        {assinaturas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma assinatura cadastrada ainda.
            </Text>
            <Text style={styles.emptySubtext}>
              Toque em "Nova Assinatura" para começar
            </Text>
          </View>
        ) : (
          <FlatList
            data={assinaturas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                assinatura={item}
                onDelete={() => handleDeletarAssinatura(item.id, item.nome)}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <ModalProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCriarAssinatura}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#18181b",
  },
  loadingText: {
    color: "#d4d4d8",
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#27272a",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "#2563eb",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  summaryTitle: {
    color: "#bfdbfe",
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summarySubtitle: {
    color: "#bfdbfe",
    fontSize: 14,
  },
  newButton: {
    backgroundColor: "#2563eb",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  newButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#d4d4d8",
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: "#71717a",
    fontSize: 14,
  },
})
