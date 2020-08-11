import { unAuth } from './unAuthRoutes.js';

export const router = (app) => {
    app.use('/api', unAuth);
}