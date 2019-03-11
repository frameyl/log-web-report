import React from "react";
import { Logo, Tips } from "../Utils";
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
        accessor: "jobs.job_name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
        }
      },
      {
        Header: "Time",
        accessor: "runs.date"
      }
    ]
  },
  {
    Header: "Module",
    accessor: "modules.module_name",
    aggregate: vals => _.uniq(_.flatten(vals)),
    Aggregated: row => {
      return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
    }
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
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
        }
      },
      {
        Header: "MST",
        accessor: "msts.name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
        }
      },
      {
        Header: "Team",
        accessor: "teams.name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
        }
      },
      {
        Header: "S",
        accessor: "failures.fail_status",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value),', ')}</span>);
        }
      },
      {
        Cell: props => {
          return (
          <div>
          <button herf='number'>edit</button>
          <button value='fda'>asdf</button>
          </div>);
        }
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
          defaultExpanded={[]}
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
