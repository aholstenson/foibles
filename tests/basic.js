const expect = require('chai').expect;
const { toExtendable, Mixin, Class } = require('../');

describe('Basic tests', () => {
	it('Can make class extendable', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const instance = new A();
		expect(instance.a()).to.equal(1);
	});

	it('Can create and apply mixin', () => {
		const A = toExtendable(class {
			a() {
				return 1;
			}
		});

		const B = Mixin(Base => class B extends Base {
			b() {
				return 2;
			}
		});

		const C = A.with(B);
		const instance = new C();
		expect(instance.a()).to.equal(1);
		expect(instance.b()).to.equal(2);
	});

	it('Mixin can call super', () => {
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

		const C = A.with(B);
		const instance = new C();
		expect(instance.a()).to.equal(2);
	});

	it('Mixin can mixin something else', () => {
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

		const D = A.with(C);
		const instance = new D();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});

	it('Same mixin can be used several times', () => {
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

		const D = A.with(C, B);
		const instance = new D();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});

	it('Mixable Class can be created', () => {
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

		const instance = new B();
		expect(instance.a()).to.equal(2);
	});

	it('Mixable Class can also be mixed in', () => {
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

		const C = A.with(B);
		const instance = new C();
		expect(instance.a()).to.equal(2);
	});

	it('Mixable Class can be extended', () => {
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

		const C = Mixin(Base => class C extends Base {
			b() {
				return 1;
			}
		});

		const D = B.with(C);
		const instance = new D();
		expect(instance.a()).to.equal(2);
		expect(instance.b()).to.equal(1);
	});
});
