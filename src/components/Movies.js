import React, { Component } from 'react';
import Movie from './Movie';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Movies extends Component {
    state = {
        movies: [
            { title: 'La Estafa de los Logan', image: 'http://cinamigos.com/wp-content/uploads/2017/08/logan-lucky.jpg' },
            { title: 'Gran Torino', image: 'https://assets.puzzlefactory.pl/puzzle/265/858/original.jpg' },
            { title: 'Diamante de Sangre', image: 'https://frasesdelapelicula.com/wp-content/uploads/2014/02/diamante-de-sangre.jpeg' }
        ],
        name: 'Steven Guamán',
        favorite: {}
    };

    cambiarTitulo = () => {
        var { movies } = this.state;
        movies[0].title = "La gran Estafa";
        this.setState({
            movies: movies
        })
    }

    marcarFavorita = (movie, i) => {
        console.log(i)
        this.setState({
            favorite: movie
        })
    }

    render() {
        var pStyle = {
            background: 'black',
            color: 'white',
            padding: '10px'
        }

        var favorite;
        if (this.state.favorite.title) {
            favorite = (
                <p className="favorita" style={pStyle}>
                    <strong>Película favorita: </strong>
                    <span>{this.state.favorite.title}</span>
                </p>
            )
        } else {
            favorite = (
                <p>
                    No hay película favorita
                </p>
            )
        }
        return (
            <React.Fragment>
                <Slider
                    title="Películas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de Películas</h2>
                        <p>Selección de las películas favoritas de {this.state.name}</p>
                        {/*this.state.favorite.title ? (
                    <p className="favorita" style={pStyle}>
                    <strong>Película favorita: </strong>
                    <span>{this.state.favorite.title}</span>
                </p>
                ) : (
                <p>
                    No hay película favorita
                </p>
                )
                */}
                        {favorite}
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar Título</button>
                        </p>
                        {/** Crear componente película **/}

                        <div id="articles" className="peliculas">
                            {
                                this.state.movies.map((movie, i) => {
                                    return (
                                        <Movie
                                            key={i}
                                            index={i}
                                            movie={movie}
                                            marcarFavorita={this.marcarFavorita} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar blog="false" />
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;
