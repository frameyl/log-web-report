import React from "react";
import MultiSelector from "./MultiSelector.js";

class Query extends React.Component {
  constructor() {
    super();
    this.state = {
      query: { date: null, job: null, build: null },
    };
  }

  onChange(value) {
    this.setState({
      query: value,
    });
  }

  onQueryClick() {
    console.info("DDD DDD DDD!!")
  }

  render() {
    const { query } = this.state;

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
