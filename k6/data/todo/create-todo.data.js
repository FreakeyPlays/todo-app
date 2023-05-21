import { randomBool, randomInt } from '../../utils.js'

export const CREATE_TODO_DATA = {
  label: 'Learn coding every Monday',
  priority: () => randomInt(0, 10),
  done: randomBool,
  position: 0
}
