import { randomBool, randomInt } from '../../utils.js'

export const UPDATE_TODO_DATA = {
  label: 'Learn coding every Sunday',
  priority: () => randomInt(0, 10),
  done: randomBool,
  position: 0
}
