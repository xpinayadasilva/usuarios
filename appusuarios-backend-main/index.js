import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoute from './routes/users.route.js'

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(usersRoute);


app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${PORT}`);
});
