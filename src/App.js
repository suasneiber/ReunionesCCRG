import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Menu from './components/Menu/Menu'
import ListadoReunionesContainer from './components/containers/ListadoReunionesContainer';
import ReunionDetalleContainer from './components/containers/ReunionDetalleContainer';

function App() {
    return ( 
        <Router>
            <Menu />
            <Switch>
                <Route exact path={'/reunion/:idreunion'} component={ReunionDetalleContainer} />               
                <Route exact path={'/crearreunion'} component={Home} />               
                <Route exact path={'/'} component={ListadoReunionesContainer} />               
            </Switch>
        </Router>
    );
}

export default App;
