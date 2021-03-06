import React from "react";
import namor from "namor";
import "./index.css";
import logo from "./Spirent-Logo-new-8-8-18.png"
import logo_v from "./vertical-logo.png"

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
    Spirent Smart Test System, visit {''}
    <br />
    <a href="http://smarttestdb.cal.ci.spirentcom.com/stapp/front_end" target="_blank">
      <img
        src={logo} alt="logo"
        style={{ width: `300px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Header = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'right', justifyContent: 'left' }}>
    {''}
    <br />
    <a href="http://smarttestdb.cal.ci.spirentcom.com/stapp/front_end" target="_blank">
      <img
        src={logo_v} alt="logo_v"
        style={{ width: `70px`, margin: ".5em auto .3em", textAlign: "right" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;
