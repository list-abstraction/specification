/**
 * Doubly linked list implementation
 * making use of dummy nodes for the
 * sake of simplicity.
 */

export function TestList(){
	this.front = new Node(null, null, null);
	this.back = new Node(this.front, null, null);
	this.front.next = this.back;
	this.length = 0;
}

export function Node(prev, next, value){
	this.prev = prev;
	this.next = next;
	this.value = value;
}

export function Iterator(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
}

export function ReverseIterator(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
}

TestList.prototype.insertAfter = function(iterator, value){
	var node, prev;

	prev = iterator.current;

	node = new Node(prev, prev.next, value);
	prev.next.prev = node;
	prev.next = node;

	++this.length;
	return this.iterator(node);
}

TestList.prototype.insertBefore = function(iterator, value){
	var node, next;

	next = iterator.current;

	node = new Node(next.prev, next, value);
	next.prev.next = node;
	next.prev = node;

	++this.length;
	return this.iterator(node);
}

TestList.prototype.unshift = function(value){
	return this.insertAfter(this.begin(), value);
}

TestList.prototype.push = function(value){
	return this.insertBefore(this.end(), value);
}

TestList.prototype.erase = function(iterator){
	var node = iterator.current;

	node.prev.next = node.next;
	node.next.prev = node.prev;

	--this.length;
	return this.iterator(node.next);
}

TestList.prototype.rerase = function(iterator){
	var node = iterator.current;

	node.next.prev = node.prev;
	node.prev.next = node.next;

	--this.length;
	return this.iterator(node.prev);
}

TestList.prototype.eraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.prev = firstnode.prev;
	firstnode.prev.next = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
}

TestList.prototype.reraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.next = firstnode.next;
	firstnode.next.prev = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
}

TestList.prototype.shift = function(){
	var it = this.begin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.rerase(it);
	return e.value;
}

TestList.prototype.pop = function(){
	var it = this.rbegin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.erase(it);
	return e.value;
}

TestList.prototype.clear = function(){
	this.front.next = this.back;
	this.back.prev = this.front;
	this.length = 0;
	return this;
}

TestList.prototype.iterator = function(node){
	return new Iterator(this.front, this.back, node);
}

TestList.prototype.riterator = function(node){
	return new ReverseIterator(this.front, this.back, node);
}

TestList.prototype.begin = function(){
	return this.iterator(this.front);
}

TestList.prototype.end = function(){
	return this.iterator(this.back);
}

TestList.prototype.rbegin = function(){
	return this.riterator(this.back);
}

TestList.prototype.rend = function(){
	return this.riterator(this.front);
}

Iterator.prototype.copy = function() {
	return new Iterator(this.front, this.back, this.current);
}

ReverseIterator.prototype.copy = function() {
	return new ReverseIterator(this.front, this.back, this.current);
}

Iterator.prototype.next =
ReverseIterator.prototype.prev =
function(){
	this.current = this.current.next;
	if (this.current === this.back) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
}

Iterator.prototype.prev =
ReverseIterator.prototype.next =
function(){
	this.current = this.current.prev;
	if (this.current === this.front) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
}

TestList.Node = Node;
TestList.Iterator = Iterator;
TestList.ReverseIterator = ReverseIterator;
