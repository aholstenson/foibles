/**
 * Any function that returns `A`.
 */
export type AnyFunction<A> = (...input: any[]) => A;

/**
 * Any constructor that creates `A`.
 */
export type AnyConstructor<A> = new (...input: any[]) => A;

/**
 * Type generator for mixins. Use together with the result of `toMixin` to
 * create a useable type:
 *
 * ```typescript
 * type ExampleMixin = Mixin<typeof ExampleMixin>;
 * const ExampleMixin = toMixin((base: object) => class extends base {
 *   ...
 * });
 * ```
 */
export type Mixin<T extends AnyFunction<any>> = InstanceType<ReturnType<T>>;

/**
 * Function that mixes in functionality on top of a class. Will receive the
 * base class to be used and must return an extended class.
 */
export type MixinFunction<T extends AnyConstructor<any>, O extends AnyConstructor<any>> = (base: T) => O;

// Symbol used to mark if a certain mixin has been applied
const application = Symbol('decorator:application');

/**
 * Check if the given prototype has the given mixin applied to itself.
 *
 * @param object
 * @param mixin
 */
function has(object: any, mixin: any) {
	while(object != null) {
		if(object.hasOwnProperty(application) && object[application] === mixin) {
			return true;
		}

		object = Object.getPrototypeOf(object);
	}
}

/**
 * Turn a function into a fully featured mixin. The mixin function should be
 * a function which takes a single argument which is the class to extend and
 * the function must return an extended class.
 *
 * ```javascript
 * const ExampleMixin = toMixin(base => class extends base {
 *   ...
 * });
 * ```
 *
 * @param func
 */
export function toMixin<T extends AnyConstructor<any>, O extends AnyConstructor<any>>(func: MixinFunction<T, O>): MixinFunction<T, O> {
	/*
	 * Define a function that checks if the mixin has already been applied
	 * to the prototype chain. This allows mixins to use other mixins as needed
	 * without them being applied twice.
	 */
	const mixinOnce = function(base: T): O {
		if(has(base.prototype, func)) return base as any;

		const result = func(base);
		result.prototype[application] = func;
		return result;
	};

	/*
	 * Define a custom hasInstance symbol so that instanceof can be used if
	 * the environment supports it.
	 */
	if(Symbol.hasInstance) {
		if(func.hasOwnProperty(Symbol.hasInstance)) {
			/*
			 * Mixin has its own hasInstance, let the outer function delegate
			 * to it.
			 */
			Object.defineProperty(mixinOnce, Symbol.hasInstance, {
				value: function mixinHasInstance(other: any) {
					return func[Symbol.hasInstance](other);
				}
			});
		} else {
			/*
			 * The mixin function does not have a custom hasInstance, use our
			 * own.
			 */
			Object.defineProperty(mixinOnce, Symbol.hasInstance, {
				value: function mixinHasInstance(other: any) {
					return has(other, func);
				}
			});
		}
	}

	return mixinOnce;
}
