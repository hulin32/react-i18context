import React from 'react';
import IntlProvider, {
  FormatMsg,
  DefineLangue,
  InjectIntlLangWrapper,
} from './index';
import renderer from 'react-test-renderer';

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

const TestComponent = props => (
  <div style={{ textAlign: 'center', marginTop: '50px' }} />
);

const HOCApp = Component =>
  renderer.create(
    <IntlProvider languages={languages} locale="en">
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

test('DefineLangue', () => {
  const DefineLangueComponent = () => (
    <DefineLangue locale="en">
      <button>"en"</button>
    </DefineLangue>
  );
  const component = HOCApp(DefineLangueComponent);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
