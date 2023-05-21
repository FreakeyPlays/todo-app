export const env = {
  dev: {
    host: {
      toDoApi: 'http://localhost:8081'
    }
  },
  prod: {
    host: {
      toDoApi: 'https://todo-api.chrismerck.me'
    }
  }
}

const DEV = 'dev'
const PROD = 'prod'

export const config = () => {
  switch (__ENV.STAGE) {
    case DEV:
      return env.dev
    case PROD:
      return env.prod
    default:
      throw `[k6] - Stage ${__ENV.STAGE} not found`
  }
}
