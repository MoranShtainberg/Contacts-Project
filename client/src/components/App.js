import './App.css';
import Search from './components/Search';
import Form from './components/Form';

import { BrowserRouter as Router, Routes ,Route, Navigate} from 'react-router-dom';

function App() {

  return (
    <Router> 
      <div>
        <Routes>
          <Route exact path="/contacts/new" element={<Form/>} />
          <Route path="/contacts"           element={<Search/>} />
          <Route path="/contacts/:id"       element={<Form/>} />
          <Route exact path="/"             element={<Navigate to="/contacts" replace />} />  
          <Route path="*"                   element={<Navigate to="/contacts" replace />} />    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
