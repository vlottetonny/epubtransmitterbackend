import express, { Express, Request, Response } from "express";
import cors from 'cors';
import epubRoutes from "./routes/epub.routes";
import codeRoutes from "./routes/code.routes";

const port = process.env.PORT || 8000;
const app: Express = express();

// Enable CORS for client-side at http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

// Parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Backend server is running!');
});

// Use your routes
app.use('/code', codeRoutes);
app.use('/epub', epubRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
