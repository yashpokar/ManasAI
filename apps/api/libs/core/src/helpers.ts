import path from 'path'
import * as fs from 'fs'

export const getPrompt = (filename: string): string => {
  const templatePath = path.join(__dirname, `./prompts/${filename}.tpl`)

  return fs.readFileSync(templatePath, 'utf8')
}
