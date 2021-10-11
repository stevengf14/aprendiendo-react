import React, { Component } from 'react';
import axios from 'axios';
import Global from '../assets/Global';
import Sidebar from './Sidebar';
import Momment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';
import defaultImge from '../assets/images/default.jpg';
import Swal from 'sweetalert2';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }


    getArticleById = () => {
        var id = this.props.match.params.id

        axios.get(this.url + "article/" + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    componentDidMount() {
        this.getArticleById();
    }

    deleteArticle = (id) => {
        Swal.fire({
            title: "¿Desea eliminar el artículo?",
            text: "Una vez eliminado, no podrá recuperar el artículo",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.aticle,
                                status: 'deleted'
                            });
                            Swal.fire(
                                'Articulo eliminado',
                                'El artículo ha sido eliminado correctamente',
                                'success', {
                                icon: "success"
                            })
                        });
                } else {
                    Swal.fire("No se ha eliminado")
                }
            })

    }

    render() {
        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                        <img src={defaultImge} alt={article.title} />
                                    )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Momment locale="es" fromNow>{article.date}</Momment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <Link to={'/blog/edit/' + article._id} className="btn btn-warning">Editar</Link>
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            } className="btn btn-danger">Eliminar</button>

                            <div className="clearfix"></div>
                        </article>
                    }
                    {
                        !this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subHeader">El artículo no existe</h2>
                            <p>Inténtalo de nuevo más tarde</p>
                        </div>
                    }
                    {
                        !this.state.status == null &&
                        <div id="article">
                            <h2 className="subHeader">Cargando...</h2>
                            <p>Espere un momento</p>
                        </div>
                    }

                </section>
                <Sidebar />
                <div className="clearfix"></div>
            </div>
        );
    }
}
export default Article;