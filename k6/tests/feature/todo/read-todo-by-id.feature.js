import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js'
import {
  chai,
  describe,
  expect
} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js'
import { sleep } from 'k6'
import getTodoId from '../../../helper/todo.helper.js'
import * as Step from '../../../step/index.js'
import { randomSleep } from '../../../utils.js'

initContractPlugin(chai)

export default function () {
  describe('Return ToDo By Id : Success', () => {
    const id = getTodoId()
    const response = Step.readToDoById(id)

    if (response.status != 200) {
      console.log(response.body)
    }

    expect(response.status, 'API status code').to.equal(200)
    expect(response).to.have.validJsonBody()
    expect(response.json().id, 'ToDo Id').to.equal(id)

    sleep(randomSleep())
  })
}
