// Importando as dependências necessárias para o projeto
import express from "express";
import multer from "multer";
import cors from "cors";
import {
  atualizarNovoPost,
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configuração do multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  // Define o destino onde os arquivos serão salvos
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Salva os arquivos na pasta "uploads/"
  },
  // Define o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  },
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para analisar dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  // O parâmetro "upload.single('imagem')" indica que estamos esperando um único arquivo chamado "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exportando a função routes para ser utilizada em outros módulos
export default routes;
