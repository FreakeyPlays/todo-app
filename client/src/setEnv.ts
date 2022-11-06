const { writeFile, readFileSync, existsSync, mkdirSync } = require('fs')
const { argv } = require('yargs')
const path = require('path')
require('dotenv').config()

const environmentVariablesInKeyValuePairs = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith('NG_APP_'))
)

const environment = argv.environment
const isProduction = environment === 'prod'

const folderPath = './src/environments'
if (!existsSync(folderPath)) {
  mkdirSync(folderPath, { recursive: true })
}

const envFile = '/environment.ts'
if (!existsSync(folderPath + envFile)) {
  writeFile(folderPath + envFile, '', (err: any) => {
    if (err) {
      console.warn(err)
      process.exit(-1)
    }
    console.log(`Created ${envFile} at ${folderPath}`)
  })
}

const prodEnvFile = '/environment.prod.ts'
if (!existsSync(folderPath + prodEnvFile)) {
  writeFile(folderPath + prodEnvFile, '', (err: any) => {
    if (err) {
      console.warn(err)
      process.exit(-1)
    }
    console.log(`Created ${prodEnvFile} at ${folderPath}`)
  })
}

const targetPath = isProduction
  ? `${folderPath}/environment.prod.ts`
  : `${folderPath}/environment.ts`

let environmentFileContent = `export const environment = {\n  production: ${isProduction}`

for (const [key, value] of Object.entries(
  environmentVariablesInKeyValuePairs
)) {
  environmentFileContent += `,\n  ${key}: ${
    typeof value === 'string' ? '"' + value + '"' : value
  }`
}

environmentFileContent += '\n}'

writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) {
    console.warn(err)
    process.exit(-1)
  }
  console.log(`Wrote variables to ${targetPath}`)
})
