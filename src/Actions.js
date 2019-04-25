import * as ActionTypes from './ActionTypes.js';

export const queryStarted = () => ({
    type: ActionTypes.QUERY_STARTED
});

export const querySuccess = (result) => ({
    type: ActionTypes.QUERY_SUCCESS,
    result
})

export const queryFailure = (error) => ({
    type: ActionTypes.QUERY_FAILURE,
    error
})

export const do_query = (builds, jobs, modules) => {
    return (dispatch) => {
        const apiUrl = `http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query.json?keywords=+jobs.job_name+%3D+%22STR-RTP-EggPlantSTC-Integration%22`;

        const dispatchQuery = (action) => {
            return dispatch(action);
        }

        dispatchQuery(queryStarted())

        fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get query result with status ' + response.status);
            }

            response.json.then((responseJson) => {
                dispatchQuery(querySuccess(responseJson.output));
            }).catch((error) => {
                dispatchQuery(queryFailure(error));
            });
        }).catch((error) => {
            dispatchQuery(queryFailure(error));
        })
    };
}

export const filter_change = (filter, change_to) => {
    return {
        type: ActionTypes.FILTER_CHANGE,
        filter: filter,
        change_to: change_to,
    };
}



