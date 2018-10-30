import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello/Hello';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
import 'antd/dist/antd.css';

// import router from './router';

/*初始化*/
renderWithHotReload(require('./router').default);

if(module.hot){
  module.hot.accept('./router', () => {
    renderWithHotReload(require('./router').default);
  });
}

function renderWithHotReload(element) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {element()}
      </Provider>
    </AppContainer>,
    document.querySelector('#app')
  );
}
