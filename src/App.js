import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registro from './Components/Registro/Registro';
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal';
import Contacto from './Components/Contacto/Contacto';


function App() {
  return (
    <Router>
      <div className="topnav">
        <Link className="active" to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Registro">Registro</Link>
        <Link to="/Contacto">Contacto</Link>
      </div>
      <main className="px-3 scrollView">
        <Route exact path="/" component={PaginaPrincipal}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/Registro" component={Registro}></Route>
        <Route exact path="/Contacto" component={Contacto}></Route>
      </main>
    </Router>
  );
}

export default App;
