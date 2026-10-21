const handlers = new Map();
export default {
  addHandler(name, callback) { handlers.set(name, callback); },
  removeHandler(name) { handlers.delete(name); },
  emit(name, payload) { handlers.get(name)?.(payload); },
};
