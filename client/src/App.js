import Articles from './components/articles';
import './App.css';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IconButton>
          <a href=".">
            <AssignmentIcon fontSize="large" className="header-logo" />
          </a>
        </IconButton>
        <p>Articles Api</p>
      </header>

      <Articles />
    </div>
  );
}

export default App;
