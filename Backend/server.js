const express = require('express');
const cors = require('cors');
const campanhas = require('./campanhas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'API online', timestamp: new Date() });
});

app.get('/api/campanhas', (req, res) => {
  res.json(campanhas);
});

app.post('/api/campanhas', (req, res) => {
  const nova = req.body;
  campanhas.push(nova);
  res.status(201).json({ mensagem: 'Campanha adicionada com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`API da LightSpark rodando na porta ${PORT}`);
});

