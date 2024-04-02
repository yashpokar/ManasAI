import 'dotenv/config'

export const API_PORT = parseInt(process.env.API_PORT || '6287')
export const API_URL = process.env.API_URL || `http://localhost:${API_PORT}`

export const UI_PORT = parseInt(process.env.UI_PORT || '6288')
export const UI_URL = process.env.UI_URL || `http://localhost:${UI_PORT}`

export const WORKSPACE_DIR = process.env.WORKSPACE_DIR || 'workspaces'
