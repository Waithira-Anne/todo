import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import deleteImg from './assets/delete.png';
import editImg from './assets/edit.png';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: [],

    };
    const updatedTodos = JSON.stringify([]);
    localStorage.setItem("todos", updatedTodos);
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input in not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add the user value to list
        value: this.state.userInput,

        completed: false
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      const updatedTodos = JSON.stringify(list);
      localStorage.setItem("todos", updatedTodos);

      // reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    const updatedTodos = JSON.stringify(updateList);
    localStorage.setItem("todos", updatedTodos);
   
    // Update list in state
    this.setState({
      list: JSON.parse(localStorage.getItem("todos")),
    });
  }

  completedItem(key) { 
    const todos = JSON.parse(localStorage.getItem("todos")); 

    let updatedTodos = [...todos]; 

      updatedTodos[key].completed = !updatedTodos[key].completed;

      const updatedTodo = JSON.stringify(updatedTodos);
      localStorage.setItem("todos", updatedTodo); 
      this.setState({ 
        list: JSON.parse(localStorage.getItem("todos")), 
    });   
  }



 
  editItem = (index) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const editedTodo = prompt('Edit the todo:');
  if (editedTodo !== null && editedTodo.trim() !== '') {
    let updatedTodos = [...todos]
    updatedTodos[index].value= editedTodo

    const updatedTodo = JSON.stringify(updatedTodos);
    localStorage.setItem("todos", updatedTodo);
    this.setState({
    list: JSON.parse(localStorage.getItem("todos")),
  });
  }
  }

  render() {
    return (

      <Container className="section">
        <Row
          className="highlight-secondary"
        >
          TODO
        </Row>

        <Row className="task-form">
          <div class='task-form-overlay'></div>
          <p>In need of a task manager? Add your tasks below and easily manage your tasks!</p>
          <div class='input-container'>
              <FormControl
                placeholder="Add a task..."
                size="lg"
                value={this.state.userInput}
                onChange={(item) =>
                  this.updateInput(item.target.value)
                }
                aria-label="add task"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="addBtn full-width"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>

          </div>
        </Row>
        <h2 class="tasks-title">Your Tasks</h2>
            <ListGroup className ="list-group">
              {/* map over and print items */}
              {JSON.parse(localStorage.getItem("todos")).map((item, index) => {
                return (
                <div key = {index} >
                  <ListGroup.Item
                    variant="dark"
                    className = "list-group-item"
                  >

                    <div className="task-left">
                    <Button className="round-checkbox" style={item.completed ? { background: "green" } : {}} onClick={() => this.completedItem(index)}></Button>
                      <p className="task" style={item.completed ? { textDecoration: "line-through" } : {}}>{item.value}</p>
                    </div>
                    <span className="task-right">
                       
                      <Button className="edit-btn" variant = "light"
                      onClick={() => this.editItem(index)}>
                        <img className="edit-img" src={editImg} alt="Edit"></img>
                      </Button>

                      <Button className="delete-btn"
                      variant = "light"
                      onClick={() => this.deleteItem(item.id)}>
                        <img className="delete-img" src={deleteImg} alt="Delete"></img>
                      </Button>
                    </span>
                  </ListGroup.Item>
                </div>
                );
              })}
            </ListGroup>
            <footer className="footer">
                <div className="waves">
                  <div className="wave" id="wave1"></div>
                  <div className="wave" id="wave2"></div>
                  <div className="wave" id="wave3"></div>
                  <div className="wave" id="wave4"></div>
                </div>
                <p>&copy;2024 TODO <span className="italics-footer"> by Anne</span> | All Rights Reserved</p>
            </footer>
           
      </Container>
    );
  }
}

export default App; 



