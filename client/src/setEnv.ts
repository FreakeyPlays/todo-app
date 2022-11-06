const { writeFile, readFileSync, existsSync, mkdirSync } = require('fs')
const { argv } = require('yargs')
const path = require('path')
require('dotenv').config()

// Read Argument and set Production environment true/false.
const environment = argv.environment
const isProduction = environment === 'prod'

// Read the variables from .env File or from process.env.
let environmentVariablesInKeyValuePairs
if (isProduction) {
  environmentVariablesInKeyValuePairs = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith('NG_APP_'))
  )
} else {
  environmentVariablesInKeyValuePairs = readFileSync(
    path.resolve(__dirname, '../../.env'),
    {
      encoding: 'utf-8'
    }
  )
    .split('\n')
    .map((value: string): string => {
      return value.replace('\r', '')
    })
    .filter((value: string): boolean => {
      return value != ''
    })
    .map((keyValuePair: string): string[] => {
      return keyValuePair.split('=').map((value: string): string => {
        return value.trim()
      })
    })
}

// Create Folder if it doesn't exist.
const folderPath = './src/environments'
if (!existsSync(folderPath)) {
  mkdirSync(folderPath, { recursive: true })
}

// Create File if it doesn't exist.
const envFile = '/environment.ts'
writeToFile(
  folderPath + envFile,
  'export const environment = {\n  production: false \n}',
  `Created ${envFile} at ${folderPath}`
)

// Create File if it doesn't exist.

const prodEnvFile = '/environment.prod.ts'
writeToFile(
  folderPath + prodEnvFile,
  'export const environment = {\n  production: true \n}',
  `Created ${prodEnvFile} at ${folderPath}`
)

// Define the final Environment File target Path.
const targetPath = isProduction
  ? `${folderPath}/environment.prod.ts`
  : `${folderPath}/environment.ts`

// Write content of environment File in a String.
let environmentFileContent = `export const environment = {\n  production: ${isProduction}`
if (isProduction) {
  for (const [key, value] of Object.entries(
    environmentVariablesInKeyValuePairs
  )) {
    environmentFileContent += `,\n  ${key}: ${
      typeof value === 'string' ? '"' + value + '"' : value
    }`
  }
} else {
  for (let keyValuePair of environmentVariablesInKeyValuePairs) {
    environmentFileContent += `,\n  ${keyValuePair[0]}: ${keyValuePair[1]}`
  }
}
environmentFileContent += '\n}'

writeToFile(
  targetPath,
  environmentFileContent,
  `Wrote variables to ${targetPath}`,
  true
)

/**
 * This function writes the content to the target Path.
 * Before writing there is a check if the File exists. If it does
 * exist or the skipExistingCheck is true it will be skipped.
 * If successful a console log with successfulMessage will be
 * shown. Otherwise the Program will exit.
 * @param target String with Path to File
 * @param content String with content of the File
 * @param successfulMessage String with Successful Message
 * @param skipExistingCheck Boolean to skip the Existing check
 */
function writeToFile(
  target: String,
  content: String,
  successfulMessage: String,
  skipExistingCheck: boolean = false
): void {
  if (!existsSync(target) || skipExistingCheck) {
    writeFile(target, content, (err: any) => {
      if (err) {
        console.warn(err)
        process.exit(-1)
      }
      console.log(successfulMessage)
    })
  }
}
