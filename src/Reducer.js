import * as ActionTypes from './ActionTypes.js';
import * as Status from './Status.js';

export default (state, action) => {
    switch (action.type) {
        // case ActionTypes.DO_QUERY: {
        //     const { builds, jobs, modules } = action;
        //     var output = [];
        //     if (!builds && !jobs && !modules) {
        //         return { ...state, table_data: [] };
        //     }

        //     output = fetch(`http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query.json?keywords=+jobs.job_name+%3D+%22STR-RTP-EggPlantSTC-Integration%22`)
        //         .then((response) => response.json())
        //         .then((json) => {
        //             console.warn("output: " + json.output.length);
        //             // console.warn("do query: " + builds.length + "J-" + jobs.length + "M-" + modules.length);
        //             console.warn("output: " + json.output.length);

        //             return { ...state, 'table_data': json.output, 'refresh': true };
        //         });
        //     console.warn("output without return " + output['table_data']);
        //     return state;
        // }

        case ActionTypes.QUERY_STARTED: {
            return { status: Status.LOADING };
        }

        case ActionTypes.QUERY_SUCCESS: {
            return { ...state, status: Status.SUCCESS, table_data: action };
        }

        case ActionTypes.QUERY_FAILURE: {
            return { status: Status.FAILURE };
        }

        case ActionTypes.FILTER_CHANGE: {
            const { filter, change_to } = action;
            //console.warn("filter change: " + filter + " value: " + change_to);
            return { ...state, [filter]: change_to };
        }

        default:
            return state;
    }
}