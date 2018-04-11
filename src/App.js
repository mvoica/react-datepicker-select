import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDatePicker from 'react-datepicker'
import ReactSelect from 'react-select'
import onClickOutside from 'react-onclickoutside'

const renderer = (props) => {
  return (
    <div
      {...props}
    />)
}

class SelectWithOutsideBlur extends Component {
  static propTypes = ReactSelect.propTypes

  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  handleClickOutside(e) {
    if (!this.state.active) {
      return
    }
    if (this.selectBlur) {
      this.selectBlur(e)
    }
  }

  handleOpen = () => {
    this.setState({active: true})
  }

  handleClose = () => {
    this.setState({active: false})
  }

  renderInput = (props) => {
    this.selectBlur = props.onBlur
    return (
      <div
        {...props}
      />)
  }

  render() {
    return (<ReactSelect
      {...this.props}
      inputRenderer={this.renderInput}
      onOpen={this.handleOpen}
      onClose={this.handleClose}
    />)
  }
}

const WrappedSelect = onClickOutside(SelectWithOutsideBlur)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChangeFactory = (propName) => (val) => {
    this.setState({[propName]: val})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input onChange={this.handleChangeFactory('input')} value={this.state.input} />
        <ReactDatePicker
          onChange={this.handleChangeFactory('datePicker')}
          selected={this.state.datePicker}
          preventOpenOnFocus
        />
        <ReactSelect
          value={this.state.select1}
          options={[{label: 'Label1', value: 'Value1'},{label: 'Label2', value: 'Value2'}]}
          onChange={this.handleChangeFactory('select1')}
          searchable={false}
          clearable={false}
          placeholder=""
        />
        <ReactSelect
          value={this.state.select2}
          options={[{label: 'Label1', value: 'Value1'},{label: 'Label2', value: 'Value2'}]}
          onChange={this.handleChangeFactory('select2')}
          searchable={false}
          clearable={false}
          placeholder=""
          inputRenderer={renderer}
        />
        <WrappedSelect
          value={this.state.select3}
          options={[{label: 'Label1', value: 'Value1'},{label: 'Label2', value: 'Value2'}]}
          onChange={this.handleChangeFactory('select3')}
          searchable={false}
          clearable={false}
          placeholder=""
        />
      </div>
    );
  }
}

export default App;
