import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Application from './components/pages/Application';
import Monitoring from './components/pages/Monitoring';
import Provisioning from './components/pages/Provisioning';
import AppState from './context/AppState';

function App() {
  return (
    <AppState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Monitoring} />
          <Route exact path='/provisioning' component={Provisioning} />
          <Route exact path='/application/:app' component={Application} />
        </Switch>
      </Router>
    </AppState>
  );
}

export default App;
