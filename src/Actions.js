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

const build_query = (builds, jobs, modules) => {
    var query_builds = [];
    var query_jobs = [];
    var query_modules = [];
    var queries = [];
    var apiUrl = `http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query.json?keywords=`;
    if (Array.isArray(builds) && builds.length > 0) {
        const builds_list = builds.map(b => `+runs.build+%3D+%22` + b.value + `%22`);
        query_builds = builds_list.join();
        queries.push(builds_list[0]);
    }
    if (Array.isArray(jobs) && jobs.length > 0) {
        const jobs_list = jobs.map(b => `+jobs.job_name+%3D+%22` + b.value + `%22`);
        query_jobs = jobs_list.join();
        queries.push(jobs_list[0]);
    }
    if (Array.isArray(modules) && modules.length > 0) {
        const modules_list = modules.map(b => `+modules.module_name+%3D+%22` + b.value + `%22`);
        query_modules = modules_list.join();
        queries.push(modules_list[0]);
    }

    console.warn("build_query " + queries)
    apiUrl += queries.join('+and+')
    console.warn("buil_query " + apiUrl)
    if (queries.length > 0)
        return apiUrl;
    else
        return '';
}

export const do_query = (builds, jobs, modules) => {
    return (dispatch) => {
        const url = build_query(builds, jobs, modules);

        const dispatchQuery = (action) => {
            return dispatch(action);
        }

        if (url === '') return;

        dispatchQuery(queryStarted())

        //console.warn("do_query fetch ")
        fetch(url).then((response) => {
            //console.warn("do_query fetch done ")
            if (response.status !== 200) {
                //console.warn("do_query fetch failed ");
                throw new Error('Fail to get query result with status ' + response.status);
            }

            //console.warn("do_query fetch responseJson ");
            response.json().then((responseJson) => {
                //console.warn("do_query successful " + responseJson.output.length)
                dispatchQuery(querySuccess(responseJson));
            }).catch((error) => {
                //console.warn("do_query fetch error ");
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



