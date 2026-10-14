export const LocalStorage = {

  /**
   * Retrieve an object from local storage.
   * @param {string} key
   */
  get(key: string) {
    const item = localStorage.getItem(key);

    return item;
  },

  /**
   * Save some value to local storage.
   * @param {string} key
   * @param {string} value
   */
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  /**
   * Remove element from local storage.
   * @param {string} key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
