const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const games = [
  "Grand chase",
  "Dota 2",
  "League of legends",
  "Warcraft 3",
  "Magic"
];


app.get('/', (req, res) => {
  res.send('Boas vindas!!!.');
});


app.get('/games', (req, res) => {
    res.send(games);
});


app.get('/games/:id', (req, res) => {
  const id = req.params.id - 1;
  const gameid = games[id];

  if(!gameid) {
    res.send('Jogo não encontrado :(');
  }
  res.send(gameid);
});


app.post('/games', (req, res) => {
  const gameid = req.body.gameid;
  const id = games.length;
  games.push(gameid);

  res.send(`Jogo adicionado com sucesso! parabens!: ${gameid}. 
  A identificação do jogo é ${id}`)
});

app.put('/games/:id', (req, res) => {
  const id = req.params.id -1;
  const gameid = req.body.gameid;
  const nomeAnterior = games[id];
  games[id] = gameid;
  res.send(`Jogo anterior: ${nomeAnterior}, atualizado com sucesso para: ${gameid}.`)
});

app.delete('/games/:id', (req, res) => {
  const id = req.params.id -1;
  const gameid = games[id];
  if(!gameid) {
    res.send('Jogo não encontrado :((');
  }
  delete games[id];
  res.send("Jogo deletado com sucesso");
});

// //sugestao da galera SPLICE
// app.delete('/filmesSplice/:id', (req,res)=>{
//   const id = req.params.id-1;
//   filmes.splice(id,1)
//   //delete filmes[id]
//   res.send("Filme excluido com sucesso.")
// });

app.listen(port, function() {
  console.info(`http://localhost:${port}/`);
});