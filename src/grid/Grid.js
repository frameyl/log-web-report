import React from "react";
import { makeData, Logo, Tips } from "../Utils";
import _ from 'lodash';
import ReactTable from "react-table";
import "react-table/react-table.css";
import fakeData from "./data.js";

const columns=[
  {
    Header: "Job",
    columns: [
      {
        Header: "Build",
        accessor: "runs.build"
      },
      {
        Header: "Job Name",
        accessor: "jobs.job_name"
      },
      {
        Header: "Time",
        accessor: "runs.date"
      }
    ]
  },
  {
    Header: "Module",
    accessor: "modules.module_name"
  },
  {
    Header: "Failure",
    columns: [
      {
        Header: "Test Case",
        accessor: "testcases.testcase_name",
        aggregate: vals => {
          if(typeof vals[0] === 'string') {
            return _.size(vals)
          } else {
            return _.sum(vals)
          }
        },
        Aggregated: row => {
          return (
            <span>
              {row.value} Cases
            </span>
          );
        }
      },
      {
        Header: "Priority",
        accessor: "testcases.priority",
        aggregate: vals => _.min(vals),
        Aggregated: row => {
          return (<span>P{row.value}</span>);
        }
      },
      {
        Header: "MST",
        accessor: "msts.name",
        aggregate: vals => {
          if(typeof vals[0] === 'string') {
            //return _.join(_.sortedUniq(vals),',')
          //} else {
            return _.join(_.sortedUniq(_.split(_.join(vals,','),',')),',')
          }
        },
        Aggregated: row => {
          return (<span>{row.value}</span>);
        }
      },
      {
        Header: "Team",
        accessor: "teams.name"
      },
      {
        Header: "S",
        accessor: "failures.fail_status",
      }
    ]
  }
]

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: fakeData,
    };
  }
  
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          pivotBy={["runs.build", "jobs.job_name", "runs.date", "modules.module_name"]}
          defaultExpanded={["runs.build", "jobs.job_name", "runs.date", "modules.module_name"]}
          defaultPageSize={10}
          className="-striped -highlight"
          style={{fontSize:10.5}}
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default Grid;
