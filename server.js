const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('A szerver elindult.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`http://localhost:${PORT}`);
});
