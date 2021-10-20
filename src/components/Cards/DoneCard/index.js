import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { TaskContext } from '../../../contexts/TaskContext';

const DoneCard = (props) => {
  const { updateList, setUpdateList } = React.useContext(TaskContext);

  const handleDelete = function (id) {
    let taskList = new Map(JSON.parse(window.localStorage.getItem('taskList')));
    taskList.delete(id);
    window.localStorage.setItem(
      'taskList',
      JSON.stringify(Array.from(taskList))
    );

    if (updateList) {
      setUpdateList(false);
    } else {
      setUpdateList(true);
    }
  };

  return (
    <div className="DoneCard-Background">
      <div className="DoneCard-actions">
        <div className="status-done">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <button
          onClick={() => {
            handleDelete(props.id);
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      </div>
      <p className="DoneCard-task">{props.data}</p>
    </div>
  );
};

export default DoneCard;
