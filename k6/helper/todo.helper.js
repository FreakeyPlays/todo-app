import { CREATE_TODO_DATA } from '../data/todo/create-todo.data.js'
import * as Step from '../step/index.js'

export default function getTodoId() {
  const response = Step.createToDo(
    CREATE_TODO_DATA.label,
    CREATE_TODO_DATA.priority(),
    CREATE_TODO_DATA.done(),
    CREATE_TODO_DATA.position
  )

  return response.json().id
}
