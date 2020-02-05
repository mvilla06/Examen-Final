import React from 'react';
import './App.css';
import Movie from './Movie.js' 

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : []
    }
  }

  componentDidMount(){
    let url = 'http://localhost:8080/api/moviedex'
    let settings = {
      method: 'GET'
    }

    fetch(url, settings)
      .then(response=>{
        if(response.ok){
           return response.json();
        }
      })
      .then(responseJSON=>{
        this.setState({peliculas:responseJSON});
      })
      .catch(error=>{
        console.log(error);
      })
  }

  render(){
    return (
      <div>
        {this.state.peliculas.map((pelicula, index)=>{
          return(
            <div key = {index}>
              <div id='title'>{pelicula.film_title}</div>
              <div id = 'year'>{pelicula.year}</div>
              <div id= 'rating'>{pelicula.rating}</div>
            </div>
          )
        })}
        <Movie main={this}/>
      </div>
    );
  }

  componentDidUpdate(){
    
  }
}

export default App;
