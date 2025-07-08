import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';


const app = express();

app.use(cors());

app.get('/cnb-kurz', async (req, res) => {
  try {
    const response = await fetch('https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt');
    const data = await response.text();
    res.send(data);
  } catch (error) {
  console.error(error); 
  res.status(500).send('Chyba při načítání dat z ČNB.');
}
});

app.listen(3333, () => console.log('Lokální proxy běží na http://localhost:3333/cnb-kurz'));
