import React from 'react';

const defaultValue = {
  openNewCard: false,
  setOpenNewCard: () => {},
  updateList: [],
  setUpdateList: () => {},
};

export const TaskContext = React.createContext(defaultValue);

const TaskContextProvider = ({ children }) => {
  const [openNewCard, setOpenNewCard] = React.useState(false);
  const [updateList, setUpdateList] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      openNewCard,
      setOpenNewCard,
      updateList,
      setUpdateList,
    }),
    [openNewCard, updateList]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export default TaskContextProvider;
