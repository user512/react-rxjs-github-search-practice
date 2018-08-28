import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  searchUser = (event) => {
    this.props.fetchUser(event.target.value);
  }

  render() {
    return (
      <div>
        <h2>Github Search:</h2>
        <input placeholder='Username' onChange={this.searchUser} />
        <p>
          <img src={this.props.image} alt='Not Found' width={100} />
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: state.user.avatar_url
});

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);