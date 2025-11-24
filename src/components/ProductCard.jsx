import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function ProductCard({ assinatura, onDelete }) {
  const { nome, observacoes, vencimento, tipo, status, preco } = assinatura

  const iniciais = nome.slice(0, 2).toUpperCase()

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {observacoes || "Sem descrição"}
          </Text>
          <Text style={styles.details}>
            Venc.: {vencimento || "-"} • {tipo} • {status}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>R$ {preco?.toFixed(2) || "0.00"}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#27272a",
    borderWidth: 1,
    borderColor: "#3f3f46",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#e4e4e7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#18181b",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#a1a1aa",
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    color: "#71717a",
    fontSize: 12,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#3f3f46",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 8,
    padding: 8,
  },
  playButton: {
    backgroundColor: "#3f3f46",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 8,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    padding: 8,
  },
})
