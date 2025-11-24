import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from "react-native"

export default function ModalProduct({ isOpen, onClose, onSave }) {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [tipo, setTipo] = useState("Mensal")
  const [status, setStatus] = useState("Ativa")
  const [vencimento, setVencimento] = useState("")
  const [observacoes, setObservacoes] = useState("")

  const limparCampos = () => {
    setNome("")
    setPreco("")
    setTipo("Mensal")
    setStatus("Ativa")
    setVencimento("")
    setObservacoes("")
  }

  const handleSalvar = () => {
    if (!nome || !preco) {
      Alert.alert("Erro", "Preencha pelo menos o nome e o preço")
      return
    }

    const dados = {
      nome,
      preco: parseFloat(preco.replace(",", ".")),
      tipo,
      status,
      vencimento,
      observacoes,
    }

    onSave(dados)
    limparCampos()
  }

  const handleClose = () => {
    limparCampos()
    onClose()
  }

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Nova assinatura</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Netflix"
                placeholderTextColor="#71717a"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Preço mensal (R$)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#71717a"
                value={preco}
                onChangeText={setPreco}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Tipo</Text>
                <View style={styles.picker}>
                  <Text style={styles.pickerText}>{tipo}</Text>
                </View>
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Status</Text>
                <TouchableOpacity
                  style={styles.picker}
                  onPress={() => {
                    Alert.alert("Status", "Escolha o status:", [
                      {
                        text: "Ativa",
                        onPress: () => setStatus("Ativa"),
                      },
                      {
                        text: "Pausada",
                        onPress: () => setStatus("Pausada"),
                      },
                      { text: "Cancelar", style: "cancel" },
                    ])
                  }}
                >
                  <Text style={styles.pickerText}>{status}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de cobrança</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Dia 15"
                placeholderTextColor="#71717a"
                value={vencimento}
                onChangeText={setVencimento}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Observações</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Observações adicionais..."
                placeholderTextColor="#71717a"
                value={observacoes}
                onChangeText={setObservacoes}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSalvar}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#27272a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#d4d4d8",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
  },
  picker: {
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#3f3f46",
    borderWidth: 1,
    borderColor: "#52525b",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
