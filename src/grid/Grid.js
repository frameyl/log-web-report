import React from "react";

import _ from 'lodash';
import ReactTable from "react-table";
import "react-table/react-table.css";
// import fakeData from "./data.js";
import store from '../Store.js';

const columns = [
  {
    Header: "Job",
    columns: [
      {
        Header: "Build",
        accessor: "runs.build",
        width: 100
      },
      {
        Header: "Job Name",
        accessor: "jobs.job_name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (
            <span> {row.value.length} Jobs </span>
          );
        },
        width: 200
      },
      {
        Header: "Time",
        accessor: "runs.date",
        width: 100
      }
    ]
  },
  {
    Header: "Module",
    accessor: "modules.module_name",
    aggregate: vals => _.uniq(_.flatten(vals)),
    Aggregated: row => {
      return (
        <span> {row.value.length} Modules </span>
      );
    },
    width: 150
  },
  {
    Header: "Defect",
    accessor: "reviews.defect",
    Aggregated: row => {
      return (<span></span>);
    },
    width: 200
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
        },
        width: 250
      },
      {
        Header: "Priority",
        accessor: "testcases.priority",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
        },
        width: 50
      },
      {
        Header: "MST",
        accessor: "msts.name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
        },
        width: 80
      },
      {
        Header: "Team",
        accessor: "teams.name",
        aggregate: vals => _.uniq(_.flatten(vals)),
        Aggregated: row => {
          return (<span>{_.join(_.sortBy(row.value), ', ')}</span>);
        },
        width: 80
      },
      {
        Header: "S",
        accessor: "failures.fail_status",
        width: 30
      },
      {
        Header: "Details",
        accessor: "reviews.rootcause",
        width: 600,
        Aggregated: row => {
          return (<span></span>);
        },
      },
      // {
      //   Cell: props => {
      //     return (
      //       <div>
      //         <button herf='number'>edit</button>
      //         <button value='fda'>asdf</button>
      //       </div>);
      //   }
      // }
    ]
  }
]

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);

    this.state = this.getOwnState();
    this.state.expanded = {};
  }

  getOwnState() {
    const state = store.getState();
    console.warn("Grid getOwnState " + state.query.table_data);
    return { ...this.state, table_data: state.query.table_data };
  }

  onChange(value) {
    if (value)
      console.warn("Grid onChange: " + value);
    else
      console.warn("Grid onChange: no data");
    this.setState(this.getOwnState());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.warn("shouldComponentUpdate " + (nextState['refresh'] === true));
  //   return (nextState['refresh'] === true);
  // }

  componentDidMount() {
    console.warn("componentDidMount");
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    console.warn("componentWillUnmount");
    store.unsubscribe(this.onChange);
  }

  handleRowExpanded(newExpanded, index, event) {
    console.warn("handleRowExpanded " + index);
    // this.setState({
    //   // we override newExpanded, keeping only current selected row expanded
    //   expanded: { ...this.state.expanded, [index]: true }
    // });
  }

  render() {
    const { table_data } = this.state;

    if (table_data)
      console.warn("Grid render: " + table_data.length);
    else
      console.warn("Grid render: no data");

    return (
      <div>
        <ReactTable
          data={table_data}
          columns={columns}
          pivotBy={["runs.build", "jobs.job_name", "reviews.defect"]}
          //expanded={this.state.expanded}
          defaultPageSize={15}
          className="-striped -highlight"
          style={{ fontSize: 10 }}
          onChange={this.onChange}
          onExpandedChange={(newExpanded, index, event) => this.handleRowExpanded(newExpanded, index, event)}
        />
      </div>
    );
  }
}

export default Grid;
