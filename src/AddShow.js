import './App.css';
import axios from 'axios'
import { Component }  from 'react'
import { Link } from "react-router-dom";


const api = axios.create({
  baseURL:'http://127.0.0.1:8000/api/',
})

export class AddShow extends Component {
  state = {
    courses : [],
    name:'',
    roll:'',
    city:'',
  }
  
  constructor(){
    super()
    this.getCourses();
  }
  
  getCourses = async () => {
    let data = await api.get('/').then(({data}) => data);
    this.setState({courses: data})
  }
  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }
  handleChangeRoll = (event) => {
    this.setState({roll: event.target.value});
  }
  handleChangeCity = (event) => {
    this.setState({city: event.target.value});
  }

  handleSubmit = async (e) => {
    // e.preventDefault();
    let res = await api.post('/', {name:this.state.name, roll:this.state.roll, city:this.state.city})
    console.log(res)
    this.getCourses();
  }

  deleteCourse = async (id) => {
    await api.delete(`/${id}/`)
    this.getCourses();
  }

  updateCourse = async (id, val) => {
    await api.patch(`/${id}/`, { name:val })
    this.getCourses();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
        </label> <br />
        <label>
          Roll:
          <input type="number" value={this.state.roll} onChange={this.handleChangeRoll} />
        </label> <br />
        <label>
          City:
          <input type="text" value={this.state.city} onChange={this.handleChangeCity} />
        </label> <br />
        <input type="submit" value="Add" />
      </form>
      <ul>{this.state.courses.map(course => <li key={course.id}>{course.name}
      <Link to={`/detail/${course.id}`}><button>Details</button></Link>
      <button onClick={()=>this.deleteCourse(course.id)}>Delete</button></li> )}</ul>
      {/* <ul>{this.state.courses.map(course => <li key={course.id} onClick={()=>this.updateCourse(course.id, `${course.name}a`)}>{course.name}
      <button onClick={()=>this.deleteCourse(course.id)}>Delete</button></li> )}</ul> */}
      
      {/* {this.state.courses.map(course => {
        return(
        <div key={course.id}>
            <h5>{course.name}</h5>
            <p>{course.roll}</p>
            <p>{course.city}</p>
            <button onClick={()=>this.deleteCourse(course.id)}>Delete</button>
        </div>
        )
      } )} */}
      </header>
    </div>
  );
  }
}