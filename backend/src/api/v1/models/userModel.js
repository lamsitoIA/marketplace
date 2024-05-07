import pool from "../../../../config/db/connectionDb.js";
import bcrypt from "bcryptjs";

export const createUser = async ({name, rut, email, password, address, url_icons}) => {
    const hashedPassword = bcrypt.hashSync(password)
    const SQLquery = {
        text: "INSERT INTO users (name,rut,email,password,address,url_icons) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        values: [name, rut, email, hashedPassword, address, url_icons]
    }
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

export const byEmail = async ({email}) => {
    const SQLquery = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    }
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

