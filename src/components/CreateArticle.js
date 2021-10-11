import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator'
import Global from '../assets/Global';
import Swal from 'sweetalert2'

// Forms validations and alerts

class CreateArticle extends Component {

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

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
                content: this.contentRef.current.value
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
            axios.post(this.url + "save", this.state.article)
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
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Artículo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}></input>
                            {this.validator.message('title', this.state.article.title, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Contenido</label>
                            <textarea type="text" name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}></input>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-sucess" onSubmit={this.saveArticle}></input>
                    </form>
                </section>
            </div>
        );
    }
}
export default CreateArticle;