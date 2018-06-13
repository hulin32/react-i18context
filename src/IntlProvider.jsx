import React from 'react';
import { PropTypes } from 'prop-types';

const IntlContext = React.createContext();

// put this at the top of the app
class IntlProvider extends React.Component {
  constructor(props) {
    super(props);
    const { languages, init } = this.props;
    if (!Object.keys(languages).includes(init)) {
      throw new Error(`no such language[${init}]`);
    }
    this.state = {
      locale: languages[init],
      langs: Object.keys(languages),
    };
  }

  changeLan = locale => {
    const { langs } = this.state;
    const { languages } = this.props;
    if (langs.includes(locale)) {
      this.setState({ locale: languages[locale] });
    } else {
      throw new Error(`no such language[${locale}]`);
    }
  };

  render() {
    const { locale, langs } = this.state;
    const { children } = this.props;
    return <IntlContext.Provider value={{ langs, locale, changeLan: this.changeLan }}>{children}</IntlContext.Provider>;
  }
}

IntlProvider.propTypes = {
  children: PropTypes.object,
  languages: PropTypes.object,
  init: PropTypes.string,
};

const FormatMsg = props => {
  const { id } = props;
  return (
    <IntlContext.Consumer>
      {intl => {
        const text = intl.locale[id];
        if (text === undefined) {
          throw new Error(`no such id(${id})`);
        }
        return text;
      }}
    </IntlContext.Consumer>
  );
};

const DefineLangue = props => {
  return (
    <IntlContext.Consumer>
      {intl => <div onClick={() => intl.changeLan(props.locale)}>{props.children}</div>}
    </IntlContext.Consumer>
  );
};

// apis
export default IntlProvider;
export { FormatMsg, DefineLangue };
