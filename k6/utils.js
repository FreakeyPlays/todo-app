import { SLEEP } from './constants.js'

export function randomSleep() {
  return Math.floor(Math.random() * (SLEEP.MAX - SLEEP.MIN + 1) + SLEEP.MIN)
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomBool() {
  return Math.random() >= 0.5
}
