import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const port = 3001;

// Configurar o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
// Middleware para receber dados em JSON (ex: AJAX)
app.use(express.json());
// Middleware para cookies
app.use(cookieParser());
// Middleware para arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', async (req, res) => {
  const access_token = req.cookies.access_token;

  const response = await axios.get("http://localhost:3000/users", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  console.log(response.data)

  res.render('index', { mensagem: "Olá, novo mundo!" });
});

// Rota GET para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota POST para processar o login
app.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  console.log("Email:",email,"Senha:",pass);

  const response = await axios.post("http://localhost:3000/auth/login", {
    email: email,
    pass: pass,
  });
  
  const {access_token}= response.data;
  console.log(access_token);

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
  });

  res.redirect('/');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
