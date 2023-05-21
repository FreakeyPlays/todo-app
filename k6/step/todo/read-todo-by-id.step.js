import http from 'k6/http'
import { TODO_ENDPOINT } from '../../data/endpoint.js'

export default function (id) {
  const url = TODO_ENDPOINT.todo.returnTodoById(id)

  const params = {
    headers: {
      'Content-Type': 'application-json'
    }
  }

  return http.get(url, undefined, params)
}
