import { getRepository } from 'typeorm';
import { User } from '../infrastructure/schemas/user.schema';
import { compare, getUserByToken } from './bcrypt.service';

class UserService {
    userRepo;
    constructor() {
        this.userRepo = getRepository(User);
    }

    async getUser(refresh_token: string) {
        const username = getUserByToken(refresh_token);
        console.log('user', username);

        const user = await this.userRepo.getUserByUsername(username);

        const isRefreshTokenMatching = await compare(refresh_token, user.hash_refresh_token);
        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }
}

export default new UserService();
