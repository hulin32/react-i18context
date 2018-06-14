import React from 'react';
import { render } from 'react-dom';
import IntlTest from './IntlTest';
import IntlProvider from './IntlProvider';

const styles = {
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <IntlTest name="CodeSandbox" />
  </div>
);

// languages text config
const en = {
  test: 'hello {name}',
};
const zh = {
  test: '你好',
};

const languages = {
  en,
  zh,
};

render(
  <IntlProvider languages={languages} init="en">
    <App />
  </IntlProvider>,
  document.getElementById('root'),
);
