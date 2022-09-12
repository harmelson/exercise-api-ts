import { OkPacket, ResultSetHeader, RowDataPacket, Pool } from 'mysql2';
import { UserProps } from '../interfaces';
import connection from './connection';

class UserModel {

    async getAll(): Promise<UserProps[]> {
        const result = await connection.execute<RowDataPacket[]>('SELECT * FROM Users');
        const [user] = result;
        return user as UserProps[];
    }

    async getById(id: number): Promise<UserProps> {
        const result = await connection.execute<RowDataPacket[]>('SELECT * FROM Users WHERE id = ?', [id]);
        const [row] = result;
        const [user] = row as UserProps[];
        return user;
    }

    async create(user: UserProps): Promise<UserProps> {
        const { name, email, password } = user;

        const [{ insertId }] = await connection.execute<ResultSetHeader>(
            'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        return { id: insertId, ...user }
    }

    async update(id: number, user: UserProps): Promise<void> {
        const { email, name, password } = user;

        await connection.execute<OkPacket>(
            'UPDATE Users SET email=?, name=?, password=? WHERE id = ?', 
            [email, name, password, id],
        );
    }

    async remove(id: number): Promise<void> {
        await connection.execute<OkPacket>('DELETE FROM Users WHERE id = ?', [id]);
    }
}

export default UserModel;