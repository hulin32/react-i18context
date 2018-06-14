import React from 'react';
import { PropTypes } from 'prop-types';
import { FormatMsg, DefineLangue } from './IntlProvider';

class IntlTest extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {['zh', 'en'].map(lang => (
          <DefineLangue key={lang} locale={lang}>
            <button>{lang}</button>
          </DefineLangue>
        ))}
        <div style={{ marginTop: '20px' }}>
          <FormatMsg id="test" inject={{ name: 'inject' }} />
        </div>
      </div>
    );
  }
}

IntlTest.propTypes = {
  locale: PropTypes.object,
  langs: PropTypes.array,
  changeLan: PropTypes.func,
};
export default IntlTest;
