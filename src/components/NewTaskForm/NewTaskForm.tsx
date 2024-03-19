import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RefreshContext } from '../../context/RefreshContextProvider';
import { useForm } from 'react-hook-form';
import {
  Task,
  addNewTask,
  getTaskById,
  updateTaskById,
} from '../../services/taskServices';
import './NewTaskForm.scss';

interface formData {
  setAdding: Dispatch<SetStateAction<boolean>>;
  makeNew: boolean;
  id: number;
}

const NewTaskForm = ({ setAdding, makeNew, id }: formData) => {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (makeNew) {
      addNewTask(data)
        .then(() => setAdding(false))
        .then(() => setRefresh(refresh + 1));
    } else {
      updateTaskById(id, data)
        .then(() => setAdding(false))
        .then(() => setRefresh(refresh + 1));
    }
  };

  useEffect(() => {
    if (id) {
      getTaskById(id).then((res: Task) => setTaskToEdit(res));
    }
  }, [id]);

  const formClasses = makeNew ? 'centered' : 'left-aligned';

  return (
    <form
      className={['new-form', formClasses].join(' ')}
      onSubmit={handleSubmit(onSubmit)}
      data-testid='add_form'
    >
      {makeNew && (
        <div className='inputs'>
          <input
            type='text'
            placeholder='Enter description'
            {...register('description', { required: true })}
          ></input>
          <input type='date' {...register('dueDate')}></input>
          <input type='submit'></input>
        </div>
      )}
      {!makeNew && taskToEdit && (
        <div className='inputs'>
          <input
            type='text'
            placeholder='Enter description'
            {...register('description', { required: true })}
            defaultValue={taskToEdit.description}
          ></input>
          <input
            type='date'
            {...register('dueDate', { required: true })}
          ></input>
          <input type='submit'></input>
        </div>
      )}
    </form>
  );
};

export default NewTaskForm;
