'use strict';

const helper = (state, pathSpec, path) => {
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
        return helper(state, pathSpec, path);
    }
};

module.exports = (state, pathSpec) => {
    const initialPath = [];
    initialPath.push(pathSpec.shift());
    return (helper(state, pathSpec, initialPath));
};