import React from "react";
import { Multiselect } from 'react-widgets';
import Select from 'react-select';

let colors = ['orange', 'red', 'blue', 'purple'];
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class Query extends React.Component {
  constructor() {
    super();
    this.state = {
      data: 0,
    };
  }
  
  render() {
    const { data } = this.state;
    return (
      <div>
      <Select
        isMulti
        options={options}
      />
      <Select
        options={options}
      />
      </div>
    );
  }
}

export default Query;
