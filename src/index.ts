import express, { Express, Request, Response } from "express";

const port = 8000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/test', (req: Request, res: Response) => {
    res.send('Testing all Worlds!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
