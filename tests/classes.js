const expect = require('chai').expect;
const { toExtendable, Mixin, Class } = require('../');

describe('Class graphs', () => {
	it('Multiple mixable classes can be combined #1', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = Class(A, Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = Class(A, Base => class C extends Base {
			b() {
				return 1;
			}
		});

		class D extends C.with(B) {
		}

		const instance = new D();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});

	it('Multiple mixable classes can be combined #2', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = Class(A, Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = Class(A, Base => class C extends Base.with(B) {
			b() {
				return 1;
			}
		});

		const instance = new C();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});

	it('Multiple mixable classes can be combined #3', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = Class(A, Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = Class(A, Base => class C extends Base.with(B) {
			b() {
				return 1;
			}
		});

		class D extends A.with(C) {
		}

		const instance = new D();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});

	it('Multiple mixable classes can be combined #4', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = Mixin(Base => class B extends Base {
			a() {
				return 1 + super.a();
			}
		});

		const C = Mixin(Base => class C extends Base.with(B) {
			b() {
				return 1;
			}
		});

		const D = Class(A, Base => class extends Base {
		});

		const E = Class(A, Base => class extends Base {

		});

		class F extends E.with(D, C) {
		}

		const instance = new F();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});
});
