import React, { Component } from 'react';
import MyComponent from './MyComponent';
import Movies from './Movies';

class TestSection extends Component {

    contador = 0;
    /*
    constructor(props){
        super(props);
        this.state={
            contador:0
        };
    }
    */
    state = {
        contador: 0
    };

    // var HolaMundo = () => {}
    HelloWorld(nombre, edad) {
        var presentacion =
            <div>
                <h2>Feliz cumpleaños {nombre}</h2>
                <h3>{edad} años!!!</h3>
            </div>
        return presentacion;
    }

    sumar = (e) => {
        //this.contador++;
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar = (e) => {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }
    render() {
        var nombre = "Nicolita";
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p>Hola mi amor Nicolita hermosa. Estoy aprendiendo React</p>
                <h2 className="subheader">Funciones y JSX básico</h2>
                {this.HelloWorld(nombre, 23)}
                <h2 className="subheader">Componentes</h2>
                <section className="components">
                    <MyComponent />
                    <Movies />
                </section>
                <h2 className="subheader">Estados</h2>
                <p>
                    Contando: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar}></input>
                    <input type="button" value="Restar" onClick={this.restar}></input>
                </p>
            </section>
        );
    }
}

export default TestSection;