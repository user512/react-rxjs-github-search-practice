import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './actions';
import './App.css';

class App extends Component {
  searchUser = (event) => {
    this.props.fetchUser(event.target.value);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Github Search:</h2>
        <input placeholder='Username' onChange={this.searchUser} />
        <p>
          <img src={this.props.image} alt='Not Found' width={100} />
        </p>
        <p>Error: {this.props.error}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
console.log(state);
  return {
    image: state.user.avatar_url,
    error: state.error.message
  }

  };

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);