import http from 'k6/http'
import { TODO_ENDPOINT } from '../../data/endpoint.js'

export default function (id, label, priority, done, position) {
  const url = TODO_ENDPOINT.todo.editToDo(id)

  const payload = JSON.stringify({
    label: label,
    priority: priority,
    done: done,
    position: position
  })

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return http.put(url, payload, params)
}
