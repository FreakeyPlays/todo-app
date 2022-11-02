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
