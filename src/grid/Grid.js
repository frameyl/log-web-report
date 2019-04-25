import React from "react";
import { Logo, Tips } from "../Utils";
import _ from 'lodash';
import ReactTable from "react-table";
import "react-table/react-table.css";
import fakeData from "./data.js";
import store from '../Store.js';



class Grid extends React.Component {


  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    const state = store.getState();
    return { table_data: state['table_data'] };
  }

  onChange(value) {
    if (value)
      console.warn("Grid onChange: " + value);
    else
      console.warn("Grid onChange: no data");
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.warn("shouldComponentUpdate " + (nextState['refresh'] === true));
    return (nextState['refresh'] === true);
  }

  componentDidMount() {
    console.warn("componentDidMount");
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    console.warn("componentWillUnmount");
    store.unsubscribe(this.onChange);
  }

  render() {
    const { table_data } = this.state;

    const columns = [
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
              return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
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
          return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
        }
      },
      {
        Header: "Failure",
        columns: [
          {
            Header: "Test Case",
            accessor: "testcases.testcase_name",
            aggregate: vals => {
              if (typeof vals[0] === 'string') {
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
              return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
            }
          },
          {
            Header: "MST",
            accessor: "msts.name",
            aggregate: vals => _.uniq(_.flatten(vals)),
            Aggregated: row => {
              return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
            }
          },
          {
            Header: "Team",
            accessor: "teams.name",
            aggregate: vals => _.uniq(_.flatten(vals)),
            Aggregated: row => {
              return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
            }
          },
          {
            Header: "S",
            accessor: "failures.fail_status",
            aggregate: vals => _.uniq(_.flatten(vals)),
            Aggregated: row => {
              return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
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


    if (table_data)
      console.warn("Grid render: " + table_data.length);
    else
      console.warn("Grid render: no data");

    return (
      <div>
        <ReactTable
          data={table_data}
          columns={columns}
          pivotBy={["runs.build", "jobs.job_name", "runs.date", "modules.module_name"]}
          defaultPageSize={10}
          className="-striped -highlight"
          style={{ fontSize: 10 }}
          onChange={this.onChange}
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default Grid;
