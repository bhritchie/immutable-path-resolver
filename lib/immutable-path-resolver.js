'use strict';

module.exports = function resolve(state, pathSpec) {
    var path = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    if (!state.hasIn(path)) {
        return null;
    } else if (!pathSpec.length) {
        return path;
    } else {
        if (typeof pathSpec[0] === 'function') {
            var value = pathSpec.shift()(state.getIn(path));
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