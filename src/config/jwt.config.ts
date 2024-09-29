export const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
export const ACCESS_TOKEN_PUBLIC = process.env.ACCESS_TOKEN_PUBLIC!;
export const REFRESH_TOKEN_PUBLIC = process.env.REFRESH_TOKEN_PUBLIC!;

export const ACCESS_TOKEN_EXPIRES_IN = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 60;
export const REFRESH_TOKEN_EXPIRES_IN = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 60;
