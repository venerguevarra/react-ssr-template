import React from 'react';
import '../../styles/App.scss';
import '../Dashboard';
import Dashboard from '../Dashboard';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  }
}

export default App;
