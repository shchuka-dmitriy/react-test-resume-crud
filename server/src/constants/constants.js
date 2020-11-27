export const NAME_PATTERN = /^[A-Z][a-z]{0,255}$/;
export const SALT_ROUNDS = 6;
export const JWT_SECRET = process.env.JWT_SECRET || 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4' /* show here only for testing project */;
export const ACCESS_TOKEN_TIME = 60 * 60 * 24;
export const ANONYMOUS_PHOTO = 'anon.png';
