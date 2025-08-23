process.env.APP_STAGE = 'test';
process.env.JWT_ACCESS_TTL_SEC = process.env.JWT_ACCESS_TTL_SEC ?? '60';
process.env.JWT_REFRESH_TTL_SEC = process.env.JWT_REFRESH_TTL_SEC ?? '120';
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS ?? '10';