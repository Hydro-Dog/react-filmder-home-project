import './App.scss';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function App() {
  return (
    <div>
      <div className="main-container">
        <div className="buttons-container nlf-column">
          <Button className="mb-10" variant="contained">
            <Link to="/login">Login</Link>
          </Button>
          <Button className="mb-10" variant="contained">
            <Link to="/registration">Registration</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
