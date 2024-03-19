import {
  Task,
  deleteTaskById,
  getTaskById,
  toggleTaskById,
} from '../../services/taskServices';
import { useContext, useEffect, useState } from 'react';
import './TaskCard.scss';
import { RefreshContext } from '../../context/RefreshContextProvider';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import { faCancel, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [propData, setPropData] = useState(task);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    toggleTaskById(propData.id, !propData.completed).then((data) =>
      setPropData(data),
    );
  };

  const handleDelete = () => {
    deleteTaskById(task.id).then(() => setRefresh(refresh + 1));
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (propData) {
      getTaskById(propData.id).then((res) => setPropData(res));
    }
  }, [editing]);

  useEffect(() => {
    setRefresh(refresh + 1);
  }, [propData]);

  const completeButtonStyle = propData.completed ? 'checked' : 'unchecked';

  return (
    <div
      className={[
        propData.completed ? 'completed-task' : 'incomplete-task',
        'task-card',
      ].join(' ')}
      data-testid={propData.description}
    >
      <button
        id='complete'
        onClick={handleClick}
        className={completeButtonStyle}
      ></button>
      <div className='task-details'>
        {!editing && (
          <div className='current-details'>
            <h4>{propData.description}</h4>
            <p>{propData.dueDate}</p>
          </div>
        )}
        {editing && (
          <NewTaskForm
            setAdding={setEditing}
            makeNew={false}
            id={propData.id}
          />
        )}
      </div>

      <div className='options'>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={handleDelete}
        ></FontAwesomeIcon>
        {!propData.completed && (
          <FontAwesomeIcon
            icon={editing ? faCancel : faPen}
            onClick={handleEdit}
          ></FontAwesomeIcon>
        )}
      </div>
    </div>
  );
};
export default TaskCard;
