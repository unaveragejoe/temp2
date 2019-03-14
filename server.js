const express = require('express'),
      server = express(),
      resolve = require('path').resolve,
      morgan = require('morgan'),
      axios = require('axios'),
      bodyParser = require('body-parser');
      
server.use([
    express.static(resolve(__dirname)),
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
]);

server.get('/', (req, res) => res.sendFile(resolve(__dirname, 'client', 'public', 'index.html')));

server.get('/test', (req, res, next) => {
  res.json([
    {id: 1, username: "bobby"},
    {id: 2, username: "johnny"}
  ])
});

server.get('/user/signin/callback', (req, res) => {
  const { query } = req;
  const { code } = query;

  if(code){
    axios.post('https://github.com/login/oauth/access_token', { 
      code,
      client_id: 'e87c1c7838200c6a1f9a',
      client_secret: 'e9de7e54b416c331ad80e7724c24e55606dec49d'
    }, {
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.data)
    .then(accessObj => accessToken = accessObj.access_token)
    .then(() => res.sendFile(__dirname + '/callback.html'))
    .catch(err => console.log('Axios', err.message));
    
  } else {
    res.sendStatus(500);
  }
});

server.use((err, req, res, next) => {
  if(err) console.log(err.message);
});

server.listen(3001, console.log('listening on 3001'));