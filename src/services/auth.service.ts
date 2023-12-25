import { getRepository } from 'typeorm';
import { User } from '../infrastructure/schemas/user.schema';
import { compare, hash } from './bcrypt.service';

class AuthService {
    userRepo;
    constructor() {
        this.userRepo = getRepository(User);
    }
    async login(username: string, password: string) {
        const user = await this.userRepo.getUserByUsername(username);
        const isMatched = await compare(password, user.password);
        if (user && isMatched) {
            await this.updateLoginTime(user.username);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async updateLoginTime(username: string) {
        await this.userRepo.updateLastLogin(username);
    }

    async setRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await hash(refreshToken);
        await this.userRepo.updateRefreshToken(username, currentHashedRefreshToken);
    }
}

export default new AuthService();
