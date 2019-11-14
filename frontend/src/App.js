import React from 'react';
import './App.css';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';
import store from './redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
        {/* Use Hash Router to route to different pages */}
        <HashRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </HashRouter>
      </Provider>
  );
}

export default App;