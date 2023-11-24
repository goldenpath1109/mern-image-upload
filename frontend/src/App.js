import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import User from './User';

function App() {
  return (
    <div className="App">
     <div className='container w-50 p-3'>
        <User />
     </div>
    </div>
  );
}

export default App;
