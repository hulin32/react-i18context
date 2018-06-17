import React from 'react';
import { PropTypes } from 'prop-types';

const IntlContext = React.createContext();

// put this at the top of the app
class IntlProvider extends React.Component {
  constructor(props) {
    super(props);
    const { languages, locale } = this.props;
    if (locale === undefined) {
      throw new Error(`no initial lang[${locale}], please set locale variable`);
    }

    if (!Object.keys(languages).includes(locale)) {
      throw new Error(`no such language[${locale}]`);
    }
    this.state = {
      locale: languages[locale],
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
    return (
      <IntlContext.Provider
        value={{ langs, locale, changeLan: this.changeLan }}
      >
        {children}
      </IntlContext.Provider>
    );
  }
}

IntlProvider.propTypes = {
  children: PropTypes.object,
  languages: PropTypes.object,
  init: PropTypes.string,
};

const FormatMsg = props => {
  const { id, inject = {} } = props;
  return (
    <IntlContext.Consumer>
      {intl => {
        let text = intl.locale[id];
        const injectKeys = Object.keys(inject);
        if (text === undefined) {
          throw new Error(`no such id(${id})`);
        }
        text = text.replace(/{(.*?)}/g, matched => {
          const key = matched.replace('{', '').replace('}', '');
          if (inject[key]) {
            return inject[key];
          }
          return matched;
        });
        return text;
      }}
    </IntlContext.Consumer>
  );
};

const DefineLangue = props => {
  return (
    <IntlContext.Consumer>
      {intl => (
        <div onClick={() => intl.changeLan(props.locale)}>{props.children}</div>
      )}
    </IntlContext.Consumer>
  );
};

const InjectIntlLangWrapper = Component => {
  const { name } = Component.prototype.constructor;
  class Consumer extends React.Component {
    render() {
      return (
        <IntlContext.Consumer>
          {intl => <Component changeLan={intl.changeLan} />}
        </IntlContext.Consumer>
      );
    }
  }
  Consumer.displayName = `IntlWrapper${name}`;
  return Consumer;
};

// apis
export default IntlProvider;
export { FormatMsg, DefineLangue, InjectIntlLangWrapper };
