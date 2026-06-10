import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import chatRoutes from './routes/chat.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'API Route endpoint not found.' });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Spur Customer Engagement API Core running on port ${env.PORT}`);
});

export default app;