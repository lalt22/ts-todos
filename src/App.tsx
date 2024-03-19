import { useState } from 'react';
import './App.css';
import TaskList from './containers/TaskList/TaskList';
import RefreshContextProvider from './context/RefreshContextProvider';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import SearchBar from './components/SearchBar/SearchBar';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [adding, setAdding] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const handleClick = () => {
    setAdding(!adding);
  };

  const addingText = adding ? 'Cancel' : 'Add New';

  return (
    <RefreshContextProvider>
      <div className='page-title'>
        <h1>
          listlink <FontAwesomeIcon icon={faList} />
        </h1>
      </div>
      <div className='page-wrapper'>
        <div className='inputs'>
          <div className='adding'>
            <button onClick={handleClick} data-testid='new_form_btn'>
              {addingText}
            </button>
            {adding && (
              <NewTaskForm setAdding={setAdding} makeNew={true} id={NaN} />
            )}
          </div>
          <div className='searching'>
            <SearchBar setSearchParam={setSearchParam} />
          </div>
        </div>

        <TaskList searchParam={searchParam} />
      </div>
    </RefreshContextProvider>
  );
}

export default App;
