import React, { Component } from 'react'
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { connect } from 'react-redux'
import {Map} from 'immutable';

function reducer(state = {}, action) {
  if (action.type == "VIEW1") {
    var num = action._type == "ADD" ? 1 : -1;
    var result = state.get(action.key) + num;
    return state.set(action.key, result)
  }
  return state;
}

const initStore = Map({name:1,time:1});
const rootReducer = function(state = {}, action){
  return reducer(state, action);
}
const store = createStore(rootReducer, initStore);

class App extends Component{
  constructor(arg){
    super(...arg);
    this.handle = this.handle.bind(this);
  }
  handle(e, flag,key){
    this.props.update(flag,key);
  }
  render(){
    return (
      <div>
        <p>{this.props.store.getState().get('name')}</p>
        <button onClick={(e)=>this.handle(e, true,'name')}> name+ </button>
        <button onClick={(e)=>this.handle(e, false,'name')}> name- </button>
        <button onClick={(e)=>this.handle(e, true,'time')}> time+ </button>
        <button onClick={(e)=>this.handle(e, false,'time')}> time- </button>
        
        <Item store = {this.props.store}></Item>
      </div>
    )
  }
}

class Item extends Component{
  constructor(arg){
    super(...arg);
  }
  render(){
    return (
      <div>
        <p>[name]：{this.props.store.getState().get('name')}</p>
        <p>[time]：{this.props.store.getState().get('time')}</p>
      </div>
    )
  }
}

const mapStateProps = (stage, action) =>{
  return stage.toObject();
}

const mapDispatchProps = (dispatch) =>{
  return {
    update(flag,key){
      dispatch({
        type:"VIEW1",
        key:key,
        _type:(flag ? 'ADD' : 'SUBTRACT')
      })
    }
  }
}

const Appc = connect(mapStateProps, mapDispatchProps)(App);

render((
      <Appc store = {store} />
),document.getElementById('app'));