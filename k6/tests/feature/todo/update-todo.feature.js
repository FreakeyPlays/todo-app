import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js'
import {
  chai,
  describe,
  expect
} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js'
import { sleep } from 'k6'
import { UPDATE_TODO_DATA } from '../../../data/todo/update-todo.data.js'
import getTodoId from '../../../helper/todo.helper.js'
import * as Step from '../../../step/index.js'
import { randomSleep } from '../../../utils.js'

initContractPlugin(chai)

export function setup() {
  return getTodoId()
}

export default function (id) {
  describe('Edit ToDo : Success', () => {
    const response = Step.updateToDo(
      id,
      UPDATE_TODO_DATA.label,
      UPDATE_TODO_DATA.priority(),
      UPDATE_TODO_DATA.done(),
      UPDATE_TODO_DATA.position
    )

    if (response.status != 200) {
      console.log(response)
    }

    expect(response.status, 'API status code').to.equal(200)
    expect(response).to.have.validJsonBody()

    sleep(randomSleep())
  })
}
