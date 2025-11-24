import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

// criar assinatura
export const criarAssinatura = async (userId, dados) => {
  try {
    const docRef = await addDoc(collection(db, "assinaturas"), {
      ...dados,
      userId,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    })
    console.log("Assinatura criada com ID:", docRef.id)
    return { id: docRef.id, ...dados }
  } catch (error) {
    console.error("Erro ao criar assinatura:", error)
    throw error
  }
}

// buscar assinaturas do usuário
export const buscarAssinaturas = async (userId) => {
  try {
    const q = query(
      collection(db, "assinaturas"),
      where("userId", "==", userId)
    )

    const snapshot = await getDocs(q)

    const assinaturas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return assinaturas || []
  } catch (error) {
    console.error("Erro ao buscar assinaturas:", error)
    return []
  }
}

// deletar assinatura
export const deletarAssinatura = async (id) => {
  try {
    await deleteDoc(doc(db, "assinaturas", id))
    console.log("Assinatura deletada:", id)
  } catch (error) {
    console.error("Erro ao deletar:", error.message)
    throw error
  }
}
