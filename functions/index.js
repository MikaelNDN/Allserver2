// Arquivo: backend/functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin"); // Necessário para Firestore e Gatilhos
const express = require("express");
const cors = require("cors"); // Necessário para permitir acesso do frontend

// Inicialize o Firebase Admin SDK (apenas uma vez)
if (admin.apps.length === 0) {
    admin.initializeApp();
}
// Obtenha uma referência ao Firestore
const db = admin.firestore();

// Crie o aplicativo Express
const app = express();

// --- CONFIGURAÇÃO CORS ---
// Define quais URLs de frontend podem acessar este backend
const allowedOrigins = [
    "http://localhost:5173", // URL do Vite em desenvolvimento
    // Adicione a URL do seu site deployado aqui depois (ex: "https://seu-projeto-id.web.app")
];
app.use(cors({
    origin: function(origin, callback) {
        // Permite requisições sem 'origin' (ex: Postman) ou se a origem estiver na lista
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error('Origem não permitida pelo CORS:', origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
}));
// --- FIM DA CONFIGURAÇÃO CORS ---

// Middleware para entender requisições com corpo JSON
app.use(express.json());

// --- ROTAS DA API ---
// O 'firebase.json' redireciona /api/** para este 'app'

// Rota GET /api/profissionais - Busca todos os usuários com role 'bartender'
app.get("/profissionais", async (req, res) => {
    try {
        // Cria uma query na coleção 'users' buscando por role 'bartender'
        const q = db.collection("users").where('role', '==', 'bartender');
        const snapshot = await q.get(); // Executa a query

        if (snapshot.empty) {
            // Se não encontrar nenhum, retorna um array vazio
            return res.status(200).json([]);
        }
        // Mapeia os resultados, adicionando o ID do documento aos dados
        const professionalsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Retorna a lista de profissionais com status 200 (OK)
        res.status(200).json(professionalsList);
    } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
        // Retorna um erro 500 (Erro Interno do Servidor) se algo falhar
        res.status(500).send("Erro interno ao buscar profissionais.");
    }
});

// Rota GET /api/profissionais/:id - Busca um usuário específico pelo ID
app.get("/profissionais/:id", async (req, res) => {
    try {
        const userId = req.params.id; // Pega o ID da URL
        const docRef = db.collection("users").doc(userId); // Referência ao documento
        const doc = await docRef.get(); // Tenta buscar o documento

        // Verifica se o documento existe
        if (!doc.exists) {
            return res.status(404).json({ message: "Profissional não encontrado." });
        }
        
        // Verifica se o usuário tem o papel 'bartender' (opcional mas recomendado)
        if (doc.data().role !== 'bartender') {
             return res.status(404).json({ message: "Usuário não é um profissional." });
        }
        
        // Retorna os dados do profissional com status 200 (OK)
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Erro ao buscar profissional:", error);
        res.status(500).send("Erro interno ao buscar profissional.");
    }
});

// (Adicione aqui mais rotas no futuro, como POST /api/pedidos, etc.)

// --- Exportar a API como uma Cloud Function ---
// O nome 'api' deve corresponder ao 'function' no firebase.json (rewrites)
exports.api = functions.https.onRequest(app);

// --- FUNÇÃO DE GATILHO (TRIGGER) ---
// Roda automaticamente quando um novo usuário é criado no Firebase Authentication
exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
    try {
        // Cria um documento na coleção 'users' usando o UID do usuário como ID do documento
        await db.collection("users").doc(user.uid).set({
            email: user.email, // Salva o email
            role: "cliente", // Define o papel padrão como 'cliente'
            createdAt: admin.firestore.FieldValue.serverTimestamp(), // Salva a data de criação
        });
        console.log(`Documento criado para o usuário: ${user.uid} com papel 'cliente'.`);
    } catch (error) {
        console.error("Erro ao criar documento do usuário no Firestore:", error);
    }
});