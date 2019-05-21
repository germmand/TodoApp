const LOCAL_STORAGE_STATE_KEY = 'todo-app-state';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, serializedState);
  } catch (err) {
    // Ignore writing errors.
  }
};

export default {
  loadState,
  saveState,
};
