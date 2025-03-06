export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      auth: state.auth,
    });
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};
