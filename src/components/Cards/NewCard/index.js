import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusSquare,
  faWindowClose,
} from '@fortawesome/free-regular-svg-icons';
import { TaskContext } from '../../../contexts/TaskContext';

// This component should:
// 1. pull from local Storage
// 2. update local Storage
// 3. push back up to local Storage
// 4. after new data is pushed up to sotrage, should update state of component to close

const newTaskPlaceholder = 'Today I want to do...';
const formValue = {
  key: 0,
  message: '',
  status: false,
};
const NewCard = () => {
  const { setOpenNewCard, updateList, setUpdateList } =
    React.useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('task added');

    //pull from local Storage
    let taskList = window.localStorage.getItem('taskList');
    let key = 0;
    if (taskList !== null) {
      taskList = new Map(JSON.parse(taskList));
      key = JSON.parse(window.localStorage.getItem('key')) + 1;
      formValue.key = key;
      taskList.set(formValue.key, formValue);
    } else {
      taskList = new Map();
      taskList.set(key, formValue);
    }

    //push to localStorage
    window.localStorage.setItem(
      'taskList',
      JSON.stringify(Array.from(taskList))
    );
    window.localStorage.setItem('key', JSON.stringify(key));

    //set update to rerender
    if (updateList) {
      setUpdateList(false);
    } else {
      setUpdateList(true);
    }

    //close new task card
    setOpenNewCard(false);
  };
  const handleChange = (e) => {
    formValue.message = e.target.value;
  };

  const handleCancel = () => {
    setOpenNewCard(false);
  };

  return (
    <div className="NewCard-Background">
      <button
        className="NewCard-button button-cancel"
        onClick={() => {
          handleCancel();
        }}
      >
        <FontAwesomeIcon icon={faWindowClose} />
      </button>
      <form className="NewCard-form" id="NewTaskForm" onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="newTask"
          id="newTask"
          rows="8"
          cols="60"
          wrap="soft"
          placeholder={newTaskPlaceholder}
          onChange={handleChange}
        />
      </form>
      <button
        type="submit"
        form="NewTaskForm"
        className="NewCard-button button-add"
      >
        <FontAwesomeIcon icon={faPlusSquare} />
      </button>
    </div>
  );
};

export default NewCard;
