# react-i18-context

## How to use this in your project
include the `IntlProvider` file in your souce file

# API
## 1.IntlProvider

```js
// languages is an array object, key is the languae, see the demo
<IntlProvider languages={languages} init="en">
    <App />
</IntlProvider>
```

## 2.FormatMsg

```js
// id is the text you want to translate
<FormatMsg id="test" />
```

## 3.DefineLangue

```js
// locale is the language you want to use when you click this button
<DefineLangue locale={lang}>
  <button>change language</button>
</DefineLangue>
```
