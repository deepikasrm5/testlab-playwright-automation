export const config = {
    "baseUrl": process.env.BASE_URL,
    "valid": {
        "username": process.env.VALID_USERNAME,
        "password": process.env.VALID_PASSWORD
    },
    "invalid": {
        "username": process.env.INVALID_USERNAME,
        "password": process.env.INVALID_PASSWORD
    },
    "xss": {
        "username": process.env.XSS_USERNAME,
        "password": process.env.XSS_PASSWORD
    }
}