import React, { Component } from 'react';

class MyComponent extends Component {

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Pepperoni'],
            calorias: 400
        }
        return (
            <React.Fragment>
                <h1>{receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                
                <ul>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ul>
                <hr />
                {
                    this.props.saludo &&
                    <React.Fragment>
                        <h1>Desde una Prop:</h1>
                        <h3>{this.props.saludo}</h3>
                    </React.Fragment>
                    
                }
            </React.Fragment>
        );
    }

}

export default MyComponent;