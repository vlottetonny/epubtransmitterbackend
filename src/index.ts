import express, { Express, Request, Response } from "express";
import cors from 'cors';
import epubRoutes from "./routes/epub.routes";
import codeRoutes from "./routes/code.routes";

/**
 * The port on which the server will listen.
 * It defaults to 8000 if the PORT environment variable is not set.
 */
const port = process.env.PORT || 8000;

/**
 * The Express application object.
 */
const app: Express = express();

/**
 * Enable CORS for client-side at http://localhost:3000
 * This allows the client-side application to make requests to this server.
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

/**
 * Use the built-in middleware function in Express to parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Define a simple route for the root URL ("/").
 * When a GET request is made to the root URL, the server responds with a message.
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Backend server is running!');
});

/**
 * Use the routes defined in the 'codeRoutes' and 'epubRoutes' modules.
 * These routes define the API endpoints for the application.
 */
app.use('/code', codeRoutes);
app.use('/epub', epubRoutes);

/**
 * Start the server.
 * The server starts listening for connections on the specified port.
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});