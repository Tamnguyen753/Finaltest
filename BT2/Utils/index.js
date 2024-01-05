import jwt from 'jsonwebtoken'
const SECRET_KEY ="TT111402"
const getToken = (data) => {
    const token = jwt.sign(data,SECRET_KEY, {
        expiresIn: 1000 * 60 *3
    });
    return token;
}
export {
    getToken
}