export const SLEEP = {
  MIN: 1,
  MAX: 5
}

/**
 * For this Project the virtual uses and duration are set to small values.
 * To see Real world examples see: https://k6.io/docs/test-types/load-test-types/
 */
export const TEST_TYPES = {
  smoke: {
    // Test the minimal load
    vus: 3, // Little virtual Users
    duration: '15s' // Only a few iterations
  },
  load: {
    // Test the average load
    stages: [
      { duration: '5s', target: 5 }, // Ramp-up from 1 to 10 virtual users
      { duration: '30s', target: 5 }, // Stay at 10 virtual users for 90s
      { duration: '5s', target: 0 } // Ramp-down to 0 virtual users
    ]
  },
  stress: {
    // Test heavy load
    stages: [
      { duration: '30s', target: 20 }, // Ramp-up from 1 to 20 virtual users
      { duration: '90s', target: 20 }, // Stay at 20 virtual users for 90 seconds
      { duration: '15s', target: 0 } // Ramp-down to 0 virtual users
    ]
  },
  soak: {
    // Test average load over a longer time
    stages: [
      { duration: '30s', target: 10 }, // Ramp-up to 10 virtual users
      { duration: '1m', target: 10 }, // Stay at 10 virtual users for 1 minute
      { duration: '30s', target: 0 }, // Ramp-down to 0 virtual users
      { duration: '1m', target: 0 } // Do nothing for 1 minute
    ]
  },
  spike: {
    // Test sudden load
    stages: [
      { duration: '30s', target: 100 }, // Ramp-up to 100 virtual users
      { duration: '15s', target: 0 } // Rapidly decrease virtual users to 0
    ]
  },
  break: {
    // Find the Limits of the tested system
    executor: 'ramping-arrival-rate', // Assure load increase if the system slows
    stages: [
      { duration: '5m', target: 250 } // Slowly Ramp-up to a Huge load
    ]
  }
}
