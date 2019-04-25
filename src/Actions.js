import * as ActionTypes from './ActionTypes.js';

export const query = (builds, jobs, modules) => {
    return {
        type: ActionTypes.QUERY,
        builds: builds,
        jobs: jobs,
        modules: modules,
    };
};

