import 'dotenv/config'

export const API_PORT = parseInt(process.env.API_PORT || '3000')
export const API_URL = process.env.API_URL || `http://localhost:${API_PORT}`
