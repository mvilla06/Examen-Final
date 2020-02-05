import React from 'react'
export default function Movie (props){
    function click(event){
        event.preventDefault();
        
        let title = event.target.title.value || undefined;
        let year = event.target.year.value || undefined;
        let rating = parseFloat(event.target.rating.value) || undefined;
        
        if(title && year && rating){
            let url = 'http://localhost:8080/api/moviedex';
            let settings = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                
                body: JSON.stringify({title:title, year:year, rating:rating})
            }

            fetch(url, settings)
                .then(response=>{
                    if(response.ok)
                    return response.json();
                })
                .then(responseJSON=>{
                    
                    let moviesNuevo = [...props.main.state.peliculas, responseJSON]
                    props.main.setState({
                        peliculas:moviesNuevo}
                        );
                })
                .catch(err=>{
                    console.log(err);
                })
        }
        else{
            console.log('campo(s) vacios');
        }
    }

    return(
        <form id='nueva' onSubmit = {event=>click(event)}>
            <label>
                Titulo: <input  type='text' id='title'/>
            </label>
            <label>
                Año: <input type='number' id='year'/>
            </label>
            <label>
                Rating: <input type='text' id='rating'/>
            </label>
            <button type="submit">Agregar</button>
        </form>
    )
}