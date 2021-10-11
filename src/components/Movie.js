import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    marcar = () => {
        this.props.marcarFavorita(this.props.movie, this.props.index);
    }
    render() {
        const {title, image} = this.props.movie;

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={title} />
                </div>

                <h2>{title}</h2>
                <span className="date">
                    Hace 5 minutos
                                    </span>
                <Link to="/blog">Leer más</Link>

                <button onClick={this.marcar}>
                    Marcar como favorita
                </button>
                <div className="clearfix"></div>
            </article>
        );
    }
}

export default Movie;