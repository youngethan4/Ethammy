import unAuth from './UnAuthRoutes';

export const router = (app) => {
    app.use('/api', unAuth);
}