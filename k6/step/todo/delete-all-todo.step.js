import http from 'k6/http'
import { TODO_ENDPOINT } from '../../data/endpoint.js'

export default function () {
  const url = TODO_ENDPOINT.todo.deleteAllToDo

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return http.del(url, undefined, params)
}
