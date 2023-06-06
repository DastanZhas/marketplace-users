import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header'
import { Users } from './components/Users';

function App() {
  return (
    <div className="App">
      <Header />
      <Users />
    </div>
  );
}

export default App;
