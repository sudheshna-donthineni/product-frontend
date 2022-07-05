export const addNewStudent = (data) => ({
  type: "ADD_STUDENT",
  payload: data,
});

export const onFilterChange = (data) => ({
  type: "FILTER_CHANGE",
  payload: data,
});
