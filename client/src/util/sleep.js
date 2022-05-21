/**
 * Sleep timer. Call await on its return value.
 * @param {*} ms Milliseconds to sleep for
 * @returns A promise that resolves in `ms` time.
 */
export function sleep(ms) {
  //  https://www.tutorialspoint.com/javascript-sleep-function
  return new Promise((resolve) => setTimeout(resolve, ms));
}
