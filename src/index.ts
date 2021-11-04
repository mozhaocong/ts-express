import express, { Express, Request, Response, NextFunction } from 'express';
import router from "./router/index";

const PORT: number = 3000;
const app: Express = express();



app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        code: 0,
        message: 'success',
    });
});

app.use('/',router)

app.listen(PORT, () => {
    console.log(`服务已经启动:localhost:${PORT}`);
});

