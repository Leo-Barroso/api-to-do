import { env } from "../env"
export const authConfig = {
    jwt: {
        secret: env.DATABASE_URL,
        expiresIn: "1d"
    }
}