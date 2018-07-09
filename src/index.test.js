import React from 'react';
import IntlProvider, {
  FormatMsg,
  LocaleSet,
  InjectIntlLangWrapper,
} from './index';
import renderer from 'react-test-renderer';

const en = {
  test: 'hello {name}',
};
const zh = {
  test: '你好',
};

const messages = {
  en,
  zh,
};

const TestComponent = props => (
  <div style={{ textAlign: 'center', marginTop: '50px' }} />
);

const HOCApp = Component =>
  renderer.create(
    <IntlProvider messages={messages} locale="en">
      <Component />
    </IntlProvider>,
  );

test('IntlProvider config', () => {
  const component = HOCApp(TestComponent);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InjectIntlLangWrapper inject', () => {
  const InjectIntlLangWrapperComponent = InjectIntlLangWrapper(TestComponent);
  const component = HOCApp(InjectIntlLangWrapperComponent);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormatMsg', () => {
  const FormatMsgComponent = () => (
    <FormatMsg id="test" inject={{ name: 'inject' }} />
  );
  const component = HOCApp(FormatMsgComponent);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('LocaleSet', () => {
  const LocaleSetComponent = () => (
    <LocaleSet locale="en">
      <button>"en"</button>
    </LocaleSet>
  );
  const component = HOCApp(LocaleSetComponent);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
