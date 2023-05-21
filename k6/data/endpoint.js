import { config } from '../env.js'

export const TODO_ENDPOINT = {
  todo: {
    createToDo: `${config().host.toDoApi}/todo`,
    returnTodoById: id => {
      return `${config().host.toDoApi}/todo/${id}`
    },
    returnAllToDo: `${config().host.toDoApi}/todo`,
    editToDo: id => {
      return `${config().host.toDoApi}/todo/${id}`
    },
    deleteToDo: id => {
      return `${config().host.toDoApi}/todo/${id}`
    },
    deleteAllToDo: `${config().host.toDoApi}/todo/remove/all`
  }
}
