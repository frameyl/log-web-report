import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
    const { builds, jobs, modules } = action;

    switch (action.type) {
        case ActionTypes.QUERY:
            var output = [];
            if (!builds && !jobs && !modules) {
                return { ...state, ['table_data']: output };
            }

            output = fetch(`http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query.json?keywords=+jobs.job_name+%3D+%22STR-RTP-EggPlantSTC-Integration%22`)
                .then((response) => response.json())
                .then((json) => {
                    return json.output;
                });
            return { ...state, ['table_data']: output };
        default:
            return state;
    }
}