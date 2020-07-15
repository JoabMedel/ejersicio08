import React from 'react';
import "./App.css"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      formulario: {}
    };
  }

  componentDidMount() {
    fetch("https://academlo-api-users.herokuapp.com/users")
      .then(response => response.json())
      .then(result => this.setState({ users: result.data }))
      .catch(error => console.log(error));
  }

  addUser = event => {
    event.preventDefault();
    fetch("https://academlo-api-users.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.state.formulario)
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  handleInput = event => {
    this.setState({
      formulario: {
        ...this.state.formulario,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <form onInput={this.handleInput} onSubmit={this.addUser}>
            <div>
              <br />
              <div>Nombre</div>
              <input
                name="name"
                type="text"
                placeholder="nombre del usuario..."
              />
            </div>
            <div>
              <br />
              <div>Apellido</div>
              <input name="lastname" type="text" placeholder="apellido..." />
            </div>
            <div>
              <br />
              <div>Correo</div>
              <input name="email" type="email" placeholder="Correo..." />
            </div>
            <div>
              <br />
              <div>Contrasena</div>
              <input
                name="password"
                type="password"
                placeholder="password..."
              />
            </div>
            <br />
            <input type="submit" />
            <br />
          </form>
        </div>
        <div>
          {this.state.users.map(post => {
            return (
              <div>
                <h2>{post.name}</h2>
                <h2>{post.lastname}</h2>
                <h2>{post.email}</h2>
                <h2>{post.password}</h2>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
