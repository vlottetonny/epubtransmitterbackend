import express, { Express, Request, Response } from "express";
import epubRoutes from "./routes/epub.routes";
import codeRoutes from "./routes/code.routes";

const port = 8000;
const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/code', codeRoutes);
app.use('/epub', epubRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
