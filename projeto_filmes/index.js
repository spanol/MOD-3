const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const filmes = [
  "spiderwick",
  "Ultimato",
  "Homem aranha de volta ao lar",
  "Homem de Ferro 3",
  "Hulk"
];

app.get('/', (req, res) => {
  res.send('Olá, boas vindas ao nosso site!');
});

app.get('/filmes', (req, res) => {
    res.send(filmes);
});

app.get('/filmes/:id', (req, res) => {
  const id = req.params.id - 1;
  const filme = filmes[id];

  if(!filme) {
    res.send('Filme não Encontrado');
  }
  res.send(filme);
});

//crud
app.post('/filmes', (req, res) => {
  const filme = req.body.filme;
  const id = filmes.length;
  filmes.push(filme);

  res.send(`Filme adicionado ao catalogo com sucesso: ${filme}. 
  A id do filme é ${id}`)
});

app.put('/filmes/:id', (req, res) => {
  const id = req.params.id -1;
  const filme = req.body.filme;
  const nomeAnterior = filmes[id];
  filmes[id] = filme;
  res.send(`Filme: ${nomeAnterior}, atualizado com sucesso para: ${filme}.`)
});

app.delete('/filmes/:id', (req, res) => {
  const id = req.params.id -1;
  const filme = filmes[id];
  if(!filme) {
    res.send('Filme não Encontrado :(');
  }
  delete filmes[id];
  res.send("Filme excluido com sucesso!");
});

app.listen(port, function() {
  console.info(`App rodando na porta http://localhost:${port}/`);
});