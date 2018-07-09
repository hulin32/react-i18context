import React from 'react';
import { PropTypes } from 'prop-types';
import {
  FormatMsg,
  LocaleSet,
  InjectIntlLangWrapper,
} from '../../src/index';

class IntlTest extends React.Component {
  componentDidMount() {
    const { setLocale } = this.props;
  }

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {['zh', 'en'].map(lang => (
          <LocaleSet key={lang} locale={lang}>
            <button>{lang}</button>
          </LocaleSet>
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
  setLocale: PropTypes.func,
};
export default InjectIntlLangWrapper(IntlTest);
