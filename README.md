# Foibles

[![npm version](https://badge.fury.io/js/foibles.svg)](https://badge.fury.io/js/foibles)
[![Build Status](https://travis-ci.org/aholstenson/foibles.svg?branch=master)](https://travis-ci.org/aholstenson/foibles)
[![Coverage Status](https://coveralls.io/repos/aholstenson/foibles/badge.svg)](https://coveralls.io/github/aholstenson/foibles)
[![Dependencies](https://david-dm.org/aholstenson/foibles.svg)](https://david-dm.org/aholstenson/foibles)

> **foible**. A quirk, idiosyncrasy, or mannerism; unusual habit or way (usage is typically plural), that is slightly strange or silly. [Wiktionary](https://en.wiktionary.org/wiki/foible)

Foibles is a library for composing JavaScript and TypeScript classes using
a mixin pattern.

Foibles is available on NPM: `npm install foibles`

## Creating mixins

Mixins are functions that creates a class that have a dynamic super class. This
makes it so that things as `super` work as intended and that mixins can override
functions in their parent class.

```javascript
import { toMixin } from 'foibles';

const SomeMixin = toMixin(base => class MixinClass extends base {
	doMixinStuff() {
		console.log('mixin did stuff');
	}
});
```

For TypeScript you should also define the type, to enable you to build 
functions that consume any object with the mixin:

```typescript
import { Mixin } from 'foibles';

type SomeMixin = Mixin<typeof SomeMixin>;
```

If you want to extend a specific class you can use `typeof BaseClass` to do so:

```typescript
const SomeMixin = toMixin((base: typeof BaseClass) => class extends base {
  ...
})
```

## Creating a base class

To create an extendable class call `toExtendable`:

```javascript
import { toExtendable } from 'foibles';

const BaseType = toExtendable(class BaseClass {
	doStuff() {
		console.log('base class did stuff');
	}
});
```

For TypeScript you should also define the type, to enable you to build 
functions that consume the base type:

```typescript
import { Extendable } from 'foibles';

type BaseType = Extendable<typeof BaseType>;
```

## Using mixins

`BaseType` will be enhanced with a static `with` function that provides
the mixin functionality. To sub class `BaseType` and at the same time
use `SomeMixin`:

```javascript
class SubClass extends BaseType.with(SomeMixin) {

	doStuff() {
		// Allow super class to do stuff
		super.doStuff();

		// doMixinStuff was provided via SomeMixin
		this.doMixinStuff();
	}
}
```

Use `instanceof` to check if an object has a mixin:

```javascript
const object = new SubClass();
console.log(object instanceof SubClass);
```

Note: It's possible to use `instanceof` only if `Symbol.hasInstance` is supported.
Check compatibility at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)

## Create a mixin depending on other mixins

This library supports a mixin to depend on other mixins by applying them as
needed in the mixin function:

```javascript
// Define the first mixin
const Debug = toMixin(base => class Debug extends base {
  debug(...args) {
    console.log(...args);
  }
});

// Create a mixin that applies the Debug mixin to base
const Mixin = toMixin(base => class Mixin extends Debug(base) {
  ...
});
```
