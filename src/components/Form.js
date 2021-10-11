import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Form extends Component {

    nameRef = React.createRef();
    lastNameRef = React.createRef();
    bioRef = React.createRef();
    genderMascRef = React.createRef();
    genderFemRef = React.createRef();
    genderOtherRef = React.createRef();

    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault();
        var gender = 'hombre';
        if (this.genderMascRef.current.checked) {
            gender = this.genderMascRef.current.value;
        } else if (this.genderFemRef.current.checked) {
            gender = this.genderFemRef.current.value;
        } else {
            gender = this.genderOtherRef.current.value;
        }
        var user = {
            name: this.nameRef.current.value,
            lastName: this.lastNameRef.current.value,
            bio: this.bioRef.current.value,
            gender: gender
        }

        this.setState({
            user: user
        });
        console.log("Fomrulario enviado");
        console.log(user);
    }
    render() {
        if(this.state.user.name){
            var user = this.state.user;
        }
        return (
            <div id="form">

                <div className="center">
                    <div id="content">
                        <h1 className="subheader"> Formulario</h1>
                        {/* Mostrar datos del formulario */}
                        {this.state.user.name &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.name}</strong></p>
                                <p>Apellidos: <strong>{user.lastName}</strong></p>
                                <p>Bio: <strong>{user.bio}</strong></p>
                                <p>Género: <strong>{user.gender}</strong></p>
                            </div>

                        }
                        {/* Crear un formulario */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" name="name" ref={this.nameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Apellidos</label>
                                <input type="text" name="lastName" ref={this.lastNameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="gender" value="hombre" ref={this.genderMascRef} /> Hombre
                                <input type="radio" name="gender" value="mujer" ref={this.genderFemRef} /> Mujer
                                <input type="radio" name="gender" value="otro" ref={this.genderOtherRef} /> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>
                    </div>
                </div>
                <Sidebar blog="false" />
            </div>
        );
    }
}
export default Form;