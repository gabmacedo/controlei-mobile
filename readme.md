# Controle de Assinaturas - Mobile

Aplicação mobile em React Native com Expo para controle de assinaturas e gastos mensais, compartilhando o mesmo banco de dados Firebase da versão web.

## ✨ Funcionalidades

- ✅ Login e registro de usuários
- ✅ Autenticação compartilhada com versão web
- ✅ Criar novas assinaturas
- ✅ Visualizar lista de assinaturas
- ✅ Deletar assinaturas
- ✅ Calcular gasto mensal total
- ✅ Design responsivo e moderno
- ✅ Pull to refresh

## 🔐 Firebase

O aplicativo usa o mesmo projeto Firebase da versão web:

- **Authentication**: Email/Password
- **Firestore**: Coleção "assinaturas"

Os usuários podem fazer login tanto na web quanto no mobile com as mesmas credenciais.

## 📱 Compatibilidade

- ✅ iOS 13+
- ✅ Android 5.0+

## 📝 Notas

- A aplicação mobile e web compartilham o mesmo banco de dados
- Os dados são sincronizados em tempo real entre as plataformas
- Todas as assinaturas criadas em uma plataforma aparecem na outra
