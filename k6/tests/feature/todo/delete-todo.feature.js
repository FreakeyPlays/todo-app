import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js'
import {
  chai,
  describe,
  expect
} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js'
import { sleep } from 'k6'
import * as Step from '../../../step/index.js'
import { randomSleep } from '../../../utils.js'

initContractPlugin(chai)

export function setup() {
  return getTodoId()
}

export default function (id) {
  describe('Delete ToDo : Success', () => {
    const response = Step.deleteToDo(id)

    if (response.status != 200) {
      console.log(response.body)
    }

    expect(response.status, 'API status code').to.equal(200)
    expect(response).to.have.validJsonBody()

    sleep(randomSleep())
  })
}
