const { decorate, apply, has } = require('./decoration');

/**
 * Create a function that applies the given mixin. This is the base for
 * the mixins.
 */
function root(mixin) {
	return decorate(mixin, superclass => apply(superclass, mixin));
}
module.exports = root;

/**
 * Create a function that deduplicates so that the mixin is only applied once.
 */
function deduplication(mixin) {
	return decorate(mixin, superclass => {
		// Check if the mixin is present
		if(has(superclass.prototype, mixin)) {
			return superclass;
		}

		// Apply the mixin
		return mixin(superclass);
	});
}

/**
 * Decorate the given function so that it behaves nicely as a mixin.
 */
function mixin(func) {
	return deduplication(root(func));
}

module.exports.mixin = mixin;
