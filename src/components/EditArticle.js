import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator'
import Global from '../assets/Global';
import Swal from 'sweetalert2';
import defaultImge from '../assets/images/default.jpg';

// 1. Tenemos que recoger el id del artículo a editar de la url
// 2. Crear un método para sacar ese objeto del backend
// 3. Repoblar o rellenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una petición al backend

class EditArticle extends Component {

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();
    articleId = null;

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentDidMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    validator = new SimpleReactValidator({
        messages: {
            required: 'Este campo es requerido.',
            alpha_num_space: 'No se permiten caracteres especiales.'
        }
    });

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });
        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (event) => {
        event.preventDefault();

        // Rellenar stat con formulario
        this.changeState();

        // Validación de datos
        if (this.validator.allValid()) {
            // Petición http post
            axios.put(this.url + "article/" + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        // Subir la imagen
                        if (this.state.selectedFile !== null) {
                            // Sacar el id del artículo guardado
                            var articlId = this.state.article._id;

                            // Crear form data y añadir fichero
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            // Petición ajax
                            axios.post(this.url + "upload-image/" + articlId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                        Swal.fire(
                                            'Artículo creado',
                                            'El artículo ha sido creado correctamente',
                                            'success'
                                        );
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                        Swal(
                                            'Error',
                                            'El artículo no ha sido creado',
                                            'error'
                                        );
                                    }
                                });
                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({
                status: 'failed'
            });
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {
        if (this.state.status === "success") {
            return <Redirect to="/blog" />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Artículo</h1>
                    {this.state.article.title ?
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState}></input>
                                {this.validator.message('title', this.state.article.title, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Contenido</label>
                                <textarea type="text" name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Imagen</label>
                                <input type="file" name="file0" defaultValue={article.iamge} onChange={this.fileChange}></input>
                                <div className="image-wrap">
                                    {
                                        article.image != null ? (
                                            <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                        ) : (
                                            <img src={defaultImge} alt={article.title} className="thumb" />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-sucess" onSubmit={this.saveArticle}></input>
                        </form>
                        :
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>
            </div>
        );
    }
}
export default EditArticle;