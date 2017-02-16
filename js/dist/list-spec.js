( function ( ) {

'use strict' ;

var definition = function ( exports , undefined ) {


/* js/src/TestList.js */
(function(){

/**
 * Doubly linked list implementation
 * making use of dummy nodes for the
 * sake of simplicity.
 */

var TestList = function(){
	this.front = new Node(null, null, null);
	this.back = new Node(this.front, null, null);
	this.front.next = this.back;
	this.length = 0;
};

var Node = function(prev, next, value){
	this.prev = prev;
	this.next = next;
	this.value = value;
};

var Iterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

var ReverseIterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

TestList.prototype.insertAfter = function(iterator, value){
	var node, prev;

	prev = iterator.current;

	node = new Node(prev, prev.next, value);
	prev.next.prev = node;
	prev.next = node;

	++this.length;
	return this.iterator(node);
};

TestList.prototype.insertBefore = function(iterator, value){
	var node, next;

	next = iterator.current;

	node = new Node(next.prev, next, value);
	next.prev.next = node;
	next.prev = node;

	++this.length;
	return this.iterator(node);
};

TestList.prototype.unshift = function(value){
	return this.insertAfter(this.begin(), value);
};

TestList.prototype.push = function(value){
	return this.insertBefore(this.end(), value);
};

TestList.prototype.erase = function(iterator){
	var node = iterator.current;

	node.prev.next = node.next;
	node.next.prev = node.prev;

	--this.length;
	return this.iterator(node.next);
};

TestList.prototype.rerase = function(iterator){
	var node = iterator.current;

	node.next.prev = node.prev;
	node.prev.next = node.next;

	--this.length;
	return this.iterator(node.prev);
};

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
};

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
};

TestList.prototype.shift = function(){
	var it = this.begin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.rerase(it);
	return e.value;
};

TestList.prototype.pop = function(){
	var it = this.rbegin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.erase(it);
	return e.value;
};

TestList.prototype.clear = function(){
	this.front.next = this.back;
	this.back.prev = this.front;
	this.length = 0;
	return this;
};

TestList.prototype.iterator = function(node){
	return new Iterator(this.front, this.back, node);
};

TestList.prototype.riterator = function(node){
	return new ReverseIterator(this.front, this.back, node);
};

TestList.prototype.begin = function(){
	return this.iterator(this.front);
};

TestList.prototype.end = function(){
	return this.iterator(this.back);
};

TestList.prototype.rbegin = function(){
	return this.riterator(this.back);
};

TestList.prototype.rend = function(){
	return this.riterator(this.front);
};

Iterator.prototype.copy = function() {
	return new Iterator(this.front, this.back, this.current);
};

ReverseIterator.prototype.copy = function() {
	return new ReverseIterator(this.front, this.back, this.current);
};

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
};

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
};

TestList.Node = Node;
TestList.Iterator = Iterator;
TestList.ReverseIterator = ReverseIterator;


exports.TestList = TestList;

})();

/* js/src/test.js */


exports.test = function ( name , List ) {

	var listToArrayForward = function (list) {
		var array = [];

		var it = list.begin();

		var e;

		while (!(e = it.next()).done){
			array.push(e.value);
		}

		return array;
	} ;

	var listToArrayBackward = function (list) {
		var array = [];

		var it = list.rbegin();

		var e;

		while (!(e = it.next()).done){
			array.push(e.value);
		}

		return array;
	} ;

	test( name , function ( ) {

		var i, j, k, n, m, it, a, b, v, first, last;

		var list = new List();

		deepEqual(list.length, 0, "length is 0");


		var expectedArrayForward = [];
		var expectedArrayBackward = [];

		var arrayForward = [];
		var arrayBackward = [];

		var add20 = function(){

			n = 10;

			for (i = 1; i <= n; ++i) {
				list.push(i);
				expectedArrayForward.push(i);
				expectedArrayBackward.unshift(i);
				deepEqual(list.length, i, "length is " + i);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				deepEqual(arrayForward, expectedArrayForward, "content is equal");
				deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

			n = 20;

			for (; i <= n; ++i) {
				list.unshift(i);
				expectedArrayForward.unshift(i);
				expectedArrayBackward.push(i);
				deepEqual(list.length, i, "length is " + i);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				deepEqual(arrayForward, expectedArrayForward, "content is equal");
				deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

		};

		var del20 = function(){

			n = 10;

			for (i = 20; i > n; --i) {
				deepEqual(list.length, i, "length is " + i);

				v = list.pop();
				a = expectedArrayForward.pop();
				b = expectedArrayBackward.shift();
				deepEqual(v, a, "popped value a === " + a);
				deepEqual(v, b, "popped value b === " + a);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				deepEqual(arrayForward, expectedArrayForward, "content is equal");
				deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

			n = 0;

			for (; i > n; --i) {
				deepEqual(list.length, i, "length is " + i);

				v = list.shift();
				a = expectedArrayForward.shift();
				b = expectedArrayBackward.pop();
				deepEqual(v, a, "shifted value a === " + a);
				deepEqual(v, b, "shifted value b === " + a);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				deepEqual(arrayForward, expectedArrayForward, "content is equal");
				deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}
		};

		var clear = function(){
			list.clear();
			expectedArrayForward.splice(0);
			expectedArrayBackward.splice(0);
		};

		clear();
		add20();
		del20();

		deepEqual(list.length, 0, "length is 0");

		v = list.shift();
		deepEqual(v, null, "v === null");

		v = list.pop();
		deepEqual(v, null, "v === null");

		deepEqual(list.length, 0, "length is 0");

		clear();
		add20();

		clear();

		deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		deepEqual(arrayForward, expectedArrayForward, "content is equal");
		deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		first = list.begin();
		last = list.end();
		first.next();

		list.eraserange(first, last);
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);

		deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		deepEqual(arrayForward, expectedArrayForward, "content is equal");
		deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		first = list.rbegin();
		last = list.rend();
		first.next();

		list.reraserange(first, last);
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);

		deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		deepEqual(arrayForward, expectedArrayForward, "content is equal");
		deepEqual(arrayBackward, expectedArrayBackward, "content is equal");


		clear();
		add20();

		m = 5;

		first = list.begin();
		last = list.end();
		first.next();
		for (i = 0; i < m; ++i) {
			first.next();
			last.prev();
		}

		list.eraserange(first, last);
		expectedArrayForward.splice(m, n - m - m);
		expectedArrayBackward.splice(m, n - m - m);

		deepEqual(list.length, expectedArrayForward.length, "length check");
		deepEqual(list.length, expectedArrayBackward.length, "length check");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		deepEqual(arrayForward, expectedArrayForward, "content is equal");
		deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		m = 5;

		first = list.rbegin();
		last = list.rend();
		first.next();
		for (i = 0; i < m; ++i) {
			first.next();
			last.prev();
		}

		list.reraserange(first, last);
		expectedArrayForward.splice(m, n - m - m);
		expectedArrayBackward.splice(m, n - m - m);

		deepEqual(list.length, expectedArrayForward.length, "length check");
		deepEqual(list.length, expectedArrayBackward.length, "length check");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		deepEqual(arrayForward, expectedArrayForward, "content is equal");
		deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
	});

} ;

return exports ;
} ;
if ( typeof exports === "object" ) {
	definition( exports ) ;
}
else if ( typeof define === "function" && define.amd ) {
	define( "@aureooms/js-list-spec" , [ ] , function ( ) { return definition( { } ) ; } ) ;
}
else if ( typeof window === "object" && typeof window.document === "object" ) {
	definition( window["listspec"] = { } ) ;
}
else console.error( "unable to detect type of module to define for @aureooms/js-list-spec") ;
} )( ) ;
