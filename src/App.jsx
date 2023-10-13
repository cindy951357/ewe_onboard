import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import "./output.css";
import QueryStrategyPage from "./pages/QueryStrategyPage";
import DepositWithdrawPage from './pages/DepositWithdrawPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div id="app" className="App bg-orange-100 h-full flex flex-col
      justify-center items-center font-sans">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<QueryStrategyPage />} />
          <Route path="task3" element={<DepositWithdrawPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
