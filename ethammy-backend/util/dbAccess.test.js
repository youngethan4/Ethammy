import { query, pool } from './dbAccess.js';
const table = 'users';

describe('simple database tests', () => {
    it('Queries the database', async () => {
        let error = false;
        const sql = `SELECT * FROM ${table} WHERE id < 100`;
        try {
            await query(sql);
        } catch(err){
            console.error(err);
            error = true;
        }
        expect(error).toEqual(false);
    });
    it('Errors out with bad query', async () => {
        let error = false;
        const sql = `SELECT * FROM ${table} WHERE id 100`;
        try {
            await query(sql);
        } catch(err){
            error = true;
        }
        expect(error).toEqual(true);
    });
    afterAll(() => {
        pool.end();
    });
});