import './app.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/register/register';
import Reset from './components/reset/reset';
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