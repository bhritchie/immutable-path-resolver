'use strict';

module.exports = function resolve (state, pathSpec, p) {
    const path = p || [];
    if (!state.hasIn(path)) {
        return null;
    } else if (!pathSpec.length) {
        return path;
    } else {
        if (typeof pathSpec[0] === 'function') {
            const value = pathSpec.shift()(state.getIn(path));
            if (!~value) {
                return null;
            }
            path.push(value);
        } else {
            path.push(pathSpec.shift());
        }
        return resolve(state, pathSpec, path);
    }
};