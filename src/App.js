import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Question } from './components/Question';
import configureStore from './configureStore';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Question />
        </div>
      </Provider>
    );
  }
}

export default App;
