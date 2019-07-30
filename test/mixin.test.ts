import { Extendable, toExtendable, toMixin, Mixin } from '../src';

describe('Basic tests', () => {
	it('Can make class extendable', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const instance = new A();
		expect(instance.a()).toEqual(1);
	});

	it('Can create and apply mixin', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = toMixin(Base => class B extends Base {
			b() {
				return 2;
			}
		});

		const C = A.with(B);
		const instance = new C();
		expect(instance.a()).toEqual(1);
		expect(instance.b()).toEqual(2);
	});

	it('Mixin can call super', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = toMixin(Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = A.with(B);
		const instance = new C();
		expect(instance.a()).toEqual(2);
	});

	it('Can apply multiple mixins', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = toMixin(Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = toMixin(Base => class C extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const D = A.with(B, C);
		const instance = new D();
		expect(instance.a()).toEqual(3);
	});

	it('Mixin can mixin something else', () => {
		type A = Extendable<typeof A>;
		const A = toExtendable(class A {
			a() {
				return 1;
			}
		});

		type B = Mixin<typeof B>;
		const B = toMixin(Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		type C = Mixin<typeof C>;
		const C = toMixin(function(Base: typeof A) {
			return class C extends B(Base) {
				b() {
					return 1;
				}
			};
		});

		const D = A.with(C);
		const instance = new D();
		expect(instance.a()).toEqual(2);
		expect(instance.b()).toEqual(1);
	});

	it('Same mixin can be used several times', () => {
		type A = Extendable<typeof A>;
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = toMixin(Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = toMixin((Base: typeof A) => class C extends B(Base) {
			b() {
				return 1;
			}
		});

		const D = A.with(C, B);
		const instance = new D();
		expect(instance.a()).toEqual(2);
		expect(instance.b()).toEqual(1);
	});

	it('Static methods can be called after mixin', () => {
		type A = Extendable<typeof A>;
		const A = toExtendable(class {
			static test() {
				return 0;
			}
		});

		const B = toMixin(Base => class B extends Base {
		});

		const C = A.with(B);
		expect(C.test()).toEqual(0);
	});

	it('Static methods in mixin are available', () => {
		type A = Extendable<typeof A>;
		const A = toExtendable(class {
			static test() {
				return 0;
			}
		});

		const B = toMixin(Base => class B extends Base {
			static test2() {
				return 1;
			}
		});

		const C = A.with(B);
		expect(C.test()).toEqual(0);
		expect(C.test2()).toEqual(1);
	});

	it('Static methods can be called in mixin', () => {
		type A = Extendable<typeof A>;
		const A = toExtendable(class {
			static test() {
				return 0;
			}
		});

		type B = Mixin<typeof B>;
		const B = toMixin((Base: typeof A) => class B extends Base {
			static test() {
				return super.test() + 1;
			}
		});

		const C = A.with(B);
		expect(C.test()).toEqual(1);
	});

});
