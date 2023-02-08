import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <>
    <head><link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"></link></head>
    {code ? <Dashboard code={code}/> : <Login />}
    </>
  );
}

export default App;
