const { writeFile, readFileSync, existsSync, mkdirSync } = require('fs')
const { argv } = require('yargs')
const path = require('path')

const environmentVariablesInKeyValuePairs = readFileSync(
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
    console.log(`Created ${envFile} at ${targetPath}`)
  })
}

const prodEnvFile = '/environment.prod.ts'
if (!existsSync(folderPath + prodEnvFile)) {
  writeFile(folderPath + prodEnvFile, '', (err: any) => {
    if (err) {
      console.warn(err)
      process.exit(-1)
    }
    console.log(`Created ${prodEnvFile} at ${targetPath}`)
  })
}

const targetPath = isProduction
  ? `${folderPath}/environment.prod.ts`
  : `${folderPath}/environment.ts`

let environmentFileContent = `export const environment = {\n  production: ${isProduction}`

for (let keyValuePair of environmentVariablesInKeyValuePairs) {
  environmentFileContent += `,\n  ${keyValuePair[0]}: ${keyValuePair[1]}`
}

environmentFileContent += '\n}'

writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) {
    console.warn(err)
    process.exit(-1)
  }
  console.log(`Wrote variables to ${targetPath}`)
})
