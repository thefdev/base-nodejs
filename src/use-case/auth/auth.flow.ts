import authService from '../../services/auth.service';
import { generateToken } from '../../services/bcrypt.service';
import userService from '../../services/user.service';

class AuthFlow {
    async login(username, password) {
        const user = await authService.login(username, password);
        const payload = { id: user.id, username: user.username };
        const secretKey = process.env.JWT_SECRET || '';
        const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
        const accessToken = await generateToken(payload, secretKey, expiresIn);
        const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || '';
        const expiresInForRefreshToken = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's';
        const refreshToken = await generateToken(payload, secretKeyRefreshToken, expiresInForRefreshToken);
        await authService.setRefreshToken(refreshToken, username);
        return { accessToken, refreshToken };
    }

    async refreshToken(refresh_token: string) {
        const user = await userService.getUser(refresh_token);
        const payload = { username: user.username };
        const secretKey = process.env.JWT_SECRET || '';
        const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
        const accessToken = await generateToken(payload, secretKey, expiresIn);
        return accessToken;
    }
}

export default new AuthFlow();
