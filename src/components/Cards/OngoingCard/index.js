import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare,
  faWindowClose,
} from '@fortawesome/free-regular-svg-icons';
import { TaskContext } from '../../../contexts/TaskContext';

//this component should:
//1. update status of according task to complete => done: true
//2. delete the imcomplete tasks

const OngoingCard = (props) => {
  const { updateList, setUpdateList } = React.useContext(TaskContext);
  function checkUpdate() {
    if (updateList) {
      setUpdateList(false);
    } else {
      setUpdateList(true);
    }
  }
  const taskComplete = function (id) {
    let taskList = new Map(JSON.parse(window.localStorage.getItem('taskList')));
    //update stat
    let formValue = taskList.get(id);
    formValue.status = true;
    taskList.set(id, formValue);
    //post updated taskList
    window.localStorage.setItem(
      'taskList',
      JSON.stringify(Array.from(taskList))
    );
    checkUpdate();
  };

  const handleDelete = function (id) {
    let taskList = new Map(JSON.parse(window.localStorage.getItem('taskList')));
    taskList.delete(id);
    window.localStorage.setItem(
      'taskList',
      JSON.stringify(Array.from(taskList))
    );
    checkUpdate();
  };

  return (
    <div className="OngoingCard-Background">
      <div className="OngoingCard-Actions">
        <div className="OngoingCard-Actions-status">
          <FontAwesomeIcon icon={faCogs} />
        </div>
        <div className="OngoingCard-button button-Actions">
          <button onClick={() => taskComplete(props.id)}>
            <FontAwesomeIcon icon={faCheckSquare} />
          </button>
          <button onClick={() => handleDelete(props.id)}>
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
        </div>
      </div>
      <p className="OngoingCard-task">{props.data}</p>
    </div>
  );
};

export default OngoingCard;
