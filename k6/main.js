import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { TEST_TYPES } from './constants.js'
import getTodoId from './helper/todo.helper.js'
import * as Step from './step/index.js'
import * as Test from './tests/index.js'

const SELECTED_TEST = TEST_TYPES[__ENV.TYPE ? __ENV.TYPE : 'smoke']
const BASE_OPTIONS = {
  tags: { type: 'API' },
  iterations: 3,
  noConnectionReuse: true,
  thresholds: {
    checks: ['rate<90'],
    http_req_duration: ['p(95)<250'],
    http_req_failed: ['rate<5']
  }
}

export let options = Object.assign({}, BASE_OPTIONS, SELECTED_TEST)

export function setup() {
  return getTodoId()
}

export default function (id) {
  Test.createToDo()
  Test.updateToDo(id)
  Test.readTodoById(id)
  Test.readAllToDo()
  Test.deleteToDo(id)
}

export function teardown() {
  Step.deleteAllToDo()
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data, {
      title: 'ToDo Test Summary',
      template: 'bootstrap'
    }),
    stdout: textSummary(data, { indent: ' ', enableColors: true })
  }
}
