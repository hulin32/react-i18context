# react-i18context

## How to run the demo
```bash
npm install
npm run start
```

## How to use this in your project
```js
npm install --save react-i18context
```

# API
## 1.IntlProvider

```js
// messages is an array object, key is the languae, see the demo
<IntlProvider messages={messages} locale="en">
    <App />
</IntlProvider>
```

## 2.FormatMsg

```js
// id is the text you want to translate
<FormatMsg id="test" />
```

## 3.LocaleSet

```js
// locale is the language you want to use when you click this button
<LocaleSet locale={lang}>
  <button>change language</button>
</LocaleSet>
```

## 4. InjectIntlLangWrapper

```js
// in the FooComponent props will inject the setLocale method, so you can chnage the language manually
InjectIntlLangWrapper(FooComponent)
```
