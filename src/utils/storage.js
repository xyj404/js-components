const prefix = 'xiaobang';

const storage = {
  get: key => localStorage.getItem(`${prefix}-${key}`),
  set: (key, value) => (localStorage[`${prefix}-${key}`] = value),
  del: key => localStorage.removeItem(`${prefix}-${key}`),
  clear: () => localStorage.clear()
};

export default storage;
