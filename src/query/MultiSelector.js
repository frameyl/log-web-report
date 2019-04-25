import React from "react";
import AsyncSelect from 'react-select/lib/Async';

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
  constructor() {
    super();
    this.state = {
      selectedOptions: null,
    };
  }

  onChange(value) {
    this.setState({
      selectedOptions: value,
    });
  }

  getUsers(input) {
    if (!input) {
      return Promise.resolve([]);
    }

    return fetch(`https://api.github.com/search/users?q=${input}`)
      .then((response) => response.json())
      .then((json) => {
        // return json.items;
        var users = [];
        for (var index = 0; index < json.items.length; index++) {
          users.push({ value: json.items[index].login, label: json.items[index].login })
        }
        console.warn(users);
        return users;
      });
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        styles={styles}
        // options={options}
        value={selectedOption}
        // onInputChange={this.onChange}
        // onValueClick={this.gotoUser}
        valueKey="id"
        loadOptions={this.getUsers}
      />
    );
  }
}

export default MultiSelector;
