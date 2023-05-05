import './app.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './containers/login/login';
import Dashboard from './containers/dashboard/dashboard';
import Register from './containers/register/register';
import Reset from './containers/reset/reset';
const App = () => {    
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/reset/" element={<Reset />} />
                    <Route path="/register/" element={<Register />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;