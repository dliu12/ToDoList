import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { TaskContext } from '../../contexts/TaskContext';
import { NewCard, OngoingCard, DoneCard } from '../Cards';

const BackgroundCard = () => {
  let currentTime = String(new Date()).split(' ');
  let currentDate = currentTime.splice(1, 3);

  const { openNewCard, setOpenNewCard, updateList } = useContext(TaskContext);
  let taskList = JSON.parse(window.localStorage.getItem('taskList'));

  useEffect(() => {
    taskList = JSON.parse(window.localStorage.getItem('taskList'));
    // console.log(taskList.length);
  }, [updateList]);

  return (
    <div className="BackgroundCard-background">
      <div className="BackgroundCard-head">
        <time dateTime="2021-09-18" className="BackgroundCard-timeDate">
          {currentTime[0] + ', ' + currentDate.join('.')}
        </time>
        <button
          className="BackgroundCard-addItem"
          onClick={() => {
            setOpenNewCard(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
      <div className="BackgroundCard-TaskCards">
        {openNewCard ? <NewCard /> : null}
        {taskList && taskList.length != 0 ? (
          taskList.map((item) => {
            if (item[1].status) {
              return (
                <DoneCard key={item[0]} id={item[0]} data={item[1].message} />
              );
            } else {
              return (
                <OngoingCard
                  key={item[0]}
                  id={item[0]}
                  data={item[1].message}
                />
              );
            }
          })
        ) : !taskList || taskList.length === 0 ? (
          <p>Add a new task now!</p>
        ) : null}
      </div>
    </div>
  );
};
export default BackgroundCard;
