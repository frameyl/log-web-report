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
        aggregate: vals => _.sum(vals),
        Aggregated: row => {
          return (
            <span>
              {row.value} (Count)
            </span>
          );
        }
      },
      {
        Header: "S",
        accessor: "failures.failure_status",
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
          pivotBy={["runs.build", "jobs.job_name", "modules.module_name"]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default Grid;
