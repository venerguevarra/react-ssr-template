import React from 'react';
import '../../styles/App.scss';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default App;
