import React from "react";
import MultiSelector from "./MultiSelector.js";
import store from '../Store.js';
import * as Actions from '../Actions.js';

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onQueryClick = this.onQueryClick.bind(this);
  }

  onChange(value) {
    return;
  }

  onQueryClick() {
    console.info("DDD DDD DDD!!");
    const builds = store.getState()['build'];
    const jobs = store.getState()['job'];
    const modules = store.getState()['module'];

    store.dispatch(Actions.do_query(builds, jobs, modules));
  }

  render() {
    // const { query } = this.state;

    return (
      <div>
        <label> Build:
          <MultiSelector caption='build' url={'http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query_build.json'} />
        </label>
        <label> Job:
          <MultiSelector caption='job' url={'http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query_job.json'} />
        </label>
        <label> Module:
          <MultiSelector caption='module' url={'http://bdc-hcheng.calenglab.spirentcom.com:8080/RegressionReport/default/query_modules.json'} />
        </label>
        <button onClick={this.onQueryClick} > Query </button>
      </div>
    );
  }
}

export default Query;
