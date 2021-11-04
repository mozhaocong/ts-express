import express, { Express, Request, Response, NextFunction } from 'express';
const PORT: number = 3000;
const app: Express = express();

const data = 1
const dataA = data ?? 2
console.log(dataA)
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        code: 0,
        message: 'success',
    });
});

app.listen(PORT, () => {
    console.log(`服务已经启动:localhost:${PORT}`);
});

