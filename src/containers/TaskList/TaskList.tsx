import TaskCard from '../../components/TaskCard/TaskCard';
import { useState, useEffect, useContext } from 'react';
import {
  Task,
  getAllTasks,
  getTasksByDescription,
  orderByCompleted,
} from '../../services/taskServices';
import { RefreshContext } from '../../context/RefreshContextProvider';
import './TaskList.scss';

export interface TaskListProps {
  searchParam: string;
}

const TaskList = ({ searchParam }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    if (!searchParam) {
      getAllTasks().then((data) => setTasks(data));
    } else {
      getTasksByDescription(searchParam).then((data) => setTasks(data));
    }
  }, [refresh, searchParam]);

  useEffect(() => {
    // console.log("Refresh: " + refresh);
  }, [refresh]);

  useEffect(() => {
    // setRefresh(refresh + 1);
  }, [tasks]);

  return (
    <div className='task-list'>
      {tasks &&
        tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
    </div>
  );
};

export default TaskList;
