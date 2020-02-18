import 'dotenv/config';
import express from 'express';
import Telegraf from 'telegraf';

import config from './config';

const { TOKEN_DEV } = config;

const app = express();
const telegraf = new Telegraf(TOKEN_DEV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/bot', async (req, res) => {
  try {
    const { body } = req;
    console.log('\n', body);

    await telegraf.handleUpdate(body, res);

    res.send(body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(80, () => {
  console.log('Webhook listening on port 80');
});
