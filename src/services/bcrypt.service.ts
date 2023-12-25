import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, 10);
}
export async function compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}

export function generateToken(payload: any, secretKey: string, expiresIn: string) {
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || '');
}

export function getUserByToken(token: string): string {
    const decoded: any = jwt.decode(token);
    return decoded.username;
}
