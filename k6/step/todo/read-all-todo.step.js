import http from 'k6/http'
import { TODO_ENDPOINT } from '../../data/endpoint.js'

export default function () {
  const url = TODO_ENDPOINT.todo.createToDo

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return http.get(url, undefined, params)
}
