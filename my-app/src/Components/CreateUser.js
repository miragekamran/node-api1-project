import React, { Component } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";

export default class CreateUser extends Component {
  state = {
    newUser: {
      name: "",
      bio: "",
    },
  };

  addUser = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("users", this.state.newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.addUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.newUser.name}
          onChange={this.handleChange}
        />
        <div />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={this.state.newUser.bio}
          onChange={this.handleChange}
        />
        <div />
        <button>Add User</button>
      </form>
    );
  }
}
