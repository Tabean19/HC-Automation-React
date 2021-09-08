import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Application from './components/pages/Application';
import Monitoring from './components/pages/Monitoring';
import Scripts from './components/pages/Scripts';
import Survey from './components/pages/Survey';
import AppConfig from './components/pages/AppConfig';
import Provisioning from './components/pages/Provisioning';
import ScriptDetails from './components/pages/ScriptDetails';
import AppState from './context/AppState';
import ScriptState from './context/ScriptState';


function App() {
  return (
    <AppState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Monitoring} />
          <Route exact path='/provisioning' component={Provisioning} />
          <Route exact path='/config/:app' component={AppConfig} />
          <Route exact path='/application/:app' component={Application} />
          <Route exact path='/survey' component={Survey} />
      <ScriptState>
          <Route exact path='/scripts' component={Scripts} />
          <Route exact path='/scripts/:id' component={ScriptDetails} />
      </ScriptState>
        </Switch>
      </Router>
    </AppState>
  );
}

export default App;
