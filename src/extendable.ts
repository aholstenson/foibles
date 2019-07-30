import { MixinFunction, AnyConstructor } from './mixin';

/**
 * Type generator for base types. Used together with `toExtendable` to define
 * a base type that supports mixins:
 *
 * ```typescript
 * type ExampleBaseType = Extendable<typeof ExampleBaseType>;
 * const ExampleBaseType = toExtendable(class ExampleBaseType {
 *   ...
 * });
 * ```
 */
export type Extendable<T extends AnyConstructor<any>> = InstanceType<T>;

/**
 * Functions used to extend a class with mixins. Provides the `with` method
 * that can be invoked statically with up to 8 mixins.
 *
 * ```typescript
 * const NewType = BaseType.with(MixinHere);
 *
 * const OtherType = BaseType.with(MixinHere, OtherMixinHere);
 * ```
 */
export interface ExtendableFunctions<T extends object> extends AnyConstructor<T> {

	/**
	 * Extend the class with functionality from the given mixin.
	 *
	 * @param m1
	 */
	with<
		M1 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>
	): this & M1 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins.
	 *
	 * @param m1
	 * @param m2
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>
	): this & M1 & M2 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>
	): this & M1 & M2 & M3 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 * @param m4
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>,
		M4 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>,
		m4: MixinFunction<this, M4>
	): this & M1 & M2 & M3 & M4 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 * @param m4
	 * @param m5
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>,
		M4 extends AnyConstructor<any>,
		M5 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>,
		m4: MixinFunction<this, M4>,
		m5: MixinFunction<this, M5>
	): this & M1 & M2 & M3 & M4 & M5 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 * @param m4
	 * @param m5
	 * @param m6
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>,
		M4 extends AnyConstructor<any>,
		M5 extends AnyConstructor<any>,
		M6 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>,
		m4: MixinFunction<this, M4>,
		m5: MixinFunction<this, M5>,
		m6: MixinFunction<this, M6>
	): this & M1 & M2 & M3 & M4 & M5 & M6 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 * @param m4
	 * @param m5
	 * @param m6
	 * @param m7
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>,
		M4 extends AnyConstructor<any>,
		M5 extends AnyConstructor<any>,
		M6 extends AnyConstructor<any>,
		M7 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>,
		m4: MixinFunction<this, M4>,
		m5: MixinFunction<this, M5>,
		m6: MixinFunction<this, M6>,
		m7: MixinFunction<this, M7>
	): this & M1 & M2 & M3 & M4 & M5 & M6 & M7 & ExtendableFunctions<T>;

	/**
	 * Extend the class with functionality from the given mixins. Mixins will
	 * be applied left to right, so the first mixin extends the class, the
	 * second mixin extends the result of first mixin and so on.
	 *
	 * @param m1
	 * @param m2
	 * @param m3
	 * @param m4
	 * @param m5
	 * @param m6
	 * @param m7
	 * @param m8
	 */
	with<
		M1 extends AnyConstructor<any>,
		M2 extends AnyConstructor<any>,
		M3 extends AnyConstructor<any>,
		M4 extends AnyConstructor<any>,
		M5 extends AnyConstructor<any>,
		M6 extends AnyConstructor<any>,
		M7 extends AnyConstructor<any>,
		M8 extends AnyConstructor<any>
	>(
		m1: MixinFunction<this, M1>,
		m2: MixinFunction<this, M2>,
		m3: MixinFunction<this, M3>,
		m4: MixinFunction<this, M4>,
		m5: MixinFunction<this, M5>,
		m6: MixinFunction<this, M6>,
		m7: MixinFunction<this, M7>,
		m8: MixinFunction<this, M8>
	): this & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & ExtendableFunctions<T>;
}

/**
 * Take the given base class and turn it into an extendable class, giving it
 * a static method `with` that can be used to apply mixins.
 *
 * When using TypeScript this should be accompanied with a type definition
 * using `Extendable`:
 *
 * ```typescript
 * type ExampleBaseType = Extendable<typeof ExampleBaseType>;
 * const ExampleBaseType = toExtendable(class ExampleBaseType {
 *   ...
 * });
 * ```
 *
 * @param o
 */
export function toExtendable<O extends AnyConstructor<any>>(o: O) {
	Object.defineProperty(o, 'with', {
		enumerable: false,
		value: mixer
	});
	return o as O & ExtendableFunctions<O>;
}

const mixer = function(this: any, ...mixins: MixinFunction<AnyConstructor<any>, any>[]) {
	let result = this;
	for(const mixin of mixins) {
		result = mixin(result);
	}
	return result;
};
