import React from "react";
import AsyncSelect from 'react-select/lib/Async';
import store from '../Store.js';

const styles = {
  container: (base) => ({
    ...base,
    display: 'inline-block',
    //    width: '500px',
    minWidth: '250px',
    textAlign: 'left',
    border: 'none',
  }),
  control: (base) => ({
    ...base,
    borderRadius: '0',
    minHeight: '1px',
    height: '42px',
  }),
  // dropdownIndicator: (base) => ({
  //   ...base,
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // }),
  // clearIndicator: (base) => ({
  //   ...base,
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // }),
};

class MultiSelector extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    this.getItems = this.getItems.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = this.getOwnState();
    this.state.inputValue = '';
    console.warn(this.props.url);
  }

  getOwnState() {
    return { options: store.getState()[this.props.caption] };
  }

  onChange(value) {
    this.setState(this.getOwnState());
  }

  onInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\s/g, '');
    this.setState({ inputValue });
    console.warn('shit:' + inputValue);
    return inputValue;
  }

  getItems(input) {
    if (!input) {
      return Promise.resolve([]);
    }

    return fetch(`${this.props.url}`)
      .then((response) => response.json())
      .then((json) => {
        // return json.items;
        var list = json.output.filter(item => item.includes(input));
        var items = [];
        for (var index = 0; index < list.length; index++) {
          items.push({ value: list[index], label: list[index] })
        }
        console.warn('fuck:' + items);
        return items;
      });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        styles={styles}
        // options={options}
        value={inputValue}
        onInputChange={this.onInputChange}
        // onValueClick={this.gotoUser}
        valueKey="id"
        loadOptions={this.getItems}
      />
    );
  }
}

export default MultiSelector;
