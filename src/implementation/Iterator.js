import assert from 'assert';

import Node from './Node.js';

export default class Iterator {
	/**
	 * @param {Node[]} array
	 * @param {Node} current
	 */
	constructor(array, current) {
		assert(current instanceof Node);
		this.array = array;
		this.current = current;
	}

	copy() {
		return new Iterator(this.array, this.current);
	}

	next() {
		const i = this.array.indexOf(this.current);
		this.current = this.array[i + 1];
		if (this.current === this.array.at(-1)) {
			return {done: true};
		}

		return {
			value: this.current.value,
			done: false,
		};
	}

	prev() {
		const i = this.array.indexOf(this.current);
		this.current = this.array[i - 1];
		if (this.current === this.array[0]) {
			return {done: true};
		}

		return {
			value: this.current.value,
			done: false,
		};
	}
}
