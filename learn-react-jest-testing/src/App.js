import './App.css';
import Account from './Account'

function App() {
  const user = {
    name: 'Sekardayu',
    age: 23,
    email: 'sekardayu@example.com'
  }
  
  return (
    <div className="App">
      <h1>Sekardayu Hana Pradiani</h1>
      <h1>Saskia Nurul Azhima</h1>
      <Account user={user} />
    </div>
  );
}

export default App;
