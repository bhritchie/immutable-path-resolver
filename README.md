# immutable-path-resolver

`immutable-path-resolver` can be used to dynamically resolve paths through [ImmutableJS](https://facebook.github.io/immutable-js/) data structures.

Suppose you have a tree of immutable objects like this:

    const {Map, List, Record} = require('immutable');

    class Todo extends Record({id: null, label: ''}) {};

    const state = new Map({
        todos: new List([
            new Todo({id: 1, label: 'utility'}),
            new Todo({id: 2, label: 'tests'})
        ]),
    });

`immutable-path-resolver` allows you to resolve the actual path for the label of the to-do with `id: 1` by providing a path specification like this:

	const resolvePath = require('immutable-path-resolver');

    const path = resolvePath(state, [
        'todos',
        (todos => todos.findIndex(todo => todo.id === 1)),
        'label'
    ]);

    //=> ['todos', 0, 'label']


Then you can use that path with ImmutableJS methods such as `getIn`, `setIn`, etc.

[![Build Status](https://travis-ci.org/bhritchie/immutable-path-resolver.svg?branch=master)](https://travis-ci.org/bhritchie/immutable-path-resolver)

## Installation

    npm install immutable-path-resolver

## Usage Notes

- When you provide a function at some point in your path specification, that function will be invoked with the value of the preceding item in the tree, or the initial object when the function is in the first position.
- This utility has only been tested with the `Map`, `List`, and `Record` data types.