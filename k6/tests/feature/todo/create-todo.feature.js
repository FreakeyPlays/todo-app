import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js'
import {
  chai,
  describe,
  expect
} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js'
import { sleep } from 'k6'
import { CREATE_TODO_DATA } from '../../../data/todo/create-todo.data.js'
import * as Step from '../../../step/index.js'
import { randomSleep } from '../../../utils.js'

initContractPlugin(chai)

export default function () {
  describe('Create ToDo : Success', () => {
    const response = Step.createToDo(
      CREATE_TODO_DATA.label,
      CREATE_TODO_DATA.priority(),
      CREATE_TODO_DATA.done(),
      CREATE_TODO_DATA.position
    )

    if (response.status != 201) {
      console.log(response.body)
    }

    expect(response.status, 'API status code').to.equal(201)
    expect(response).to.have.validJsonBody()

    sleep(randomSleep())
  })
}
