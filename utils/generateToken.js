import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
    
    try {
        const token = jwt.sign(user, "jwtsecretkey");
        return token;
    } catch (error) {
        console.log(error);
        return error;
    }
    return token;
}