'use strict';

const resolvePath = require('../immutable-path-resolver');
const Immutable = require('immutable');
const Map = Immutable.Map;
const List = Immutable.List;
const Record = Immutable.Record;
const chai = require('chai');
const expect = chai.expect;

class Todo extends Record({
    id:    null,
    label: '',
}) {}

const state = new Map({
    todos: new List([
        new Todo({id: 1, label: 'utility'}),
        new Todo({id: 2, label: 'tests'})
    ]),
});

describe('immutable-path-resolver', function () {
    it('should return full path when path specification is precise', () => {
        const path = resolvePath(state, ['todos', 0, 'label']);
        expect(path).to.deep.equal(['todos', 0, 'label']);
        expect(state.getIn(path)).to.be.eq('utility');
    });

    it('should return full path when path specification is dynamic', () => {
        const path = resolvePath(state, ['todos', (todos => todos.findIndex(t => t.id === 1)), 'label']);
        expect(path).to.deep.equal(['todos', 0, 'label']);
        expect(state.getIn(path)).to.be.eq('utility');
    });

    it.skip('should return full path when dynamic path specification starts with a function', () => {
        // Not supported yet but should do
        const path = resolvePath(state, [(state) => 'todos', (todos => todos.findIndex(t => t.id === 1)), 'label']);
        expect(path).to.deep.equal(['todos', 0, 'label']);
        expect(state.getIn(path)).to.be.eq('utility');
    });

    it('should return null when specified path cannot be resolved I', () => {
        expect(resolvePath(state, ['todonts', (todos => todos.findIndex(t => t.id === 1)), 'label'])).to.be.null;
    });

    it('should return null when specified path cannot be resolved II', () => {
        expect(resolvePath(state, ['todos', (todos => todos.findIndex(t => t.id === 4)), 'label'])).to.be.null;
    });

    it('should return null when specified path cannot be resolved III', () => {
        expect(resolvePath(state, ['todos', (todos => todos.findIndex(t => t.id === 1)), 'jabberwock'])).to.be.null;
    });
});