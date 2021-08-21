const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

function Carro(modelo, marca, tipo, comb, ano) {
  this.modelo = modelo;
  this.marca = marca;
  this.tipo = tipo;
  this.comb = comb;
  this.ano = ano;
}

const carros = [];

const msgInicio = [
  "Boas vindas!",
  "Sejam muito mais que bem vindos ao meu servidor de nodejs!"
];

app.get("/carros", (req, res) => {
  res.send(carros);
});

app.get("/carros/:id", (req, res) => {
  const id = req.params.id - 1;

  if (!carros[id]) {
    res.send("Veiculo não encontrado, tente novamente");
  }
  res.send(carros[id]);
});

app.post("/carros", (req, res) => {
  const modelo = req.body.modelo;
  const marca = req.body.marca;
  const cat = req.body.cat;
  const comb = req.body.comb;
  const ano = req.body.ano;

  const id = carros.length;
  const carro = new Carro(modelo, marca, cat, comb, ano);

  carros[id] = carro;

  res.send(`Carro adicionado com sucesso: ${modelo}. 
    a id do carro é ${id + 1}`);
});

app.put("/carros/:id", (req, res) => {
  const id = req.params.id - 1;

  if (!carros[id]) {
    res.send("Carro não encontrado, tente novamente");
  }

  const modelo = req.body.modelo;
  const modeloAnterior = carros[id].modelo;
  const marca = req.body.marca;
  const cat = req.body.cat;
  const comb = req.body.comb;
  const ano = req.body.ano;

  carros[id].modelo = modelo;
  carros[id].marca = marca;
  carros[id].cat = cat;
  carros[id].comb = comb;
  carros[id].ano = ano;

  res.send(`Veiculo atualizado com sucesso,  veiculo anterior: ${modeloAnterior}, substituido por: ${modelo}`);
});

app.delete("/carros/:id", (req, res) => {
  const id = req.params.id - 1;

  if (!carros[id]) {
    res.send("Veiculo não encontrado, tente novamente");
  }
  delete carros[id];
  res.send("Veiculo excluido com sucesso.");
});

app.listen(port, function () {
  console.info(`porta http://localhost:${port}/`);
});