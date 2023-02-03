import cors from 'cors';
import express from 'express';
import { categoriesModule, cuponsModule, imagesModule, ordersModule, productsModule } from './modules';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(productsModule)
app.use(categoriesModule)
app.use(ordersModule)
app.use(imagesModule)
app.use(cuponsModule)

app.listen(process.env.PORT ?? 3333, () =>
  console.log('Servidor rodando na porta 3333')
);
