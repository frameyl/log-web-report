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
          <MultiSelector />
        </label>
        <label> Job:
          <MultiSelector />
        </label>
        <label> Modules:
          <MultiSelector />
        </label>
        <label> Date:
          <MultiSelector />
        </label>
        <button onClick={this.onQueryClick} > Query </button>
      </div>
    );
  }
}

export default Query;
