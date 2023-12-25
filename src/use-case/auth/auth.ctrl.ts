import flow from './auth.flow';

export async function login(req, res, next) {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await flow.login(username, password);
    res.cookies.set('access-token', accessToken, { httpOnly: true });
    res.cookies.set('refresh-token', refreshToken, { httpOnly: true });
    res.sendStatus(201);
}

export async function logout(req, res, next) {
    res.cookies.set('access-token', null, { httpOnly: true });
}

export async function refreshToken(req, res, next) {
    const refresh_token = req.cookies.get('refresh-token') || '';
    const accessToken = await flow.refreshToken(refresh_token);
    res.cookies.set('access-token', accessToken, {
        httpOnly: true,
    });
}
export default { login, logout };
