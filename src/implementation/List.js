import Node from './Node.js';
import Iterator from './Iterator.js';
import ReverseIterator from './ReverseIterator.js';

export default class List {
	static Node = Node;
	static Iterator = Iterator;
	static ReverseIterator = ReverseIterator;

	constructor() {
		/* @type {Node[]} */
		this.array = [new Node(undefined), new Node(undefined)];
	}

	get length() {
		return this.array.length - 2;
	}

	/**
	 * @param {Iterator} iterator
	 * @param {any} value
	 * @return Iterator
	 */
	insertAfter(iterator, value) {
		const i = this.array.indexOf(iterator.current);
		const node = new Node(value);
		this.array.splice(i + 1, 0, node);
		return this.iterator(node);
	}

	/**
	 * @param {Iterator} iterator
	 * @param {any} value
	 * @return Iterator
	 */
	insertBefore(iterator, value) {
		const i = this.array.indexOf(iterator.current);
		const node = new Node(value);
		this.array.splice(i, 0, node);
		return this.iterator(node);
	}

	/**
	 * @param {Iterator} iterator
	 * @return Iterator
	 */
	erase(iterator) {
		const i = this.array.indexOf(iterator.current);
		this.array.splice(i, 1);
		return this.iterator(this.array[i]);
	}

	/**
	 * @param {Iterator} first
	 * @param {Iterator} last
	 * @return Iterator
	 */
	eraserange(first, last) {
		const i = this.array.indexOf(first.current);
		const j = this.array.indexOf(last.current);
		this.array.splice(i, j - i);
		return this.iterator(this.array[i]);
	}

	/**
	 * @param {ReverseIterator} iterator
	 * @return ReverseIterator
	 */
	rerase(iterator) {
		const i = this.array.indexOf(iterator.current);
		this.array.splice(i, 1);
		return this.riterator(this.array[i - 1]);
	}

	/**
	 * @param {ReverseIterator} first
	 * @param {ReverseIterator} last
	 * @return ReverseIterator
	 */
	reraserange(first, last) {
		const j = this.array.indexOf(first.current);
		const i = this.array.indexOf(last.current);
		this.array.splice(i + 1, j - i);
		return this.riterator(this.array[i]);
	}

	/**
	 * @param {any} value
	 * @return Iterator
	 */
	unshift(value) {
		return this.insertAfter(this.begin(), value);
	}

	/**
	 * @param {any} value
	 * @return Iterator
	 */
	push(value) {
		return this.insertBefore(this.end(), value);
	}

	shift() {
		if (this.length === 0) return null;
		const [node] = this.array.splice(1, 1);
		return node.value;
	}

	pop() {
		if (this.length === 0) return null;
		const [node] = this.array.splice(-2, 1);
		return node.value;
	}

	clear() {
		this.array = [this.begin().current, this.end().current];
	}

	begin() {
		return this.iterator(this.array[0]);
	}

	end() {
		return this.iterator(this.array[this.array.length - 1]);
	}

	rbegin() {
		return this.riterator(this.end().current);
	}

	rend() {
		return this.riterator(this.begin().current);
	}

	/**
	 * @param {Node} node
	 * @return Iterator
	 */
	iterator(node) {
		return new Iterator(this.array, node);
	}

	/**
	 * @param {Node} node
	 * @return ReverseIterator
	 */
	riterator(node) {
		return new ReverseIterator(this.array, node);
	}
}
