import React from 'react';
import '../../styles/App.scss';
import '../Dashboard';
import Dashboard from '../Dashboard';
import Login from '../Login';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
