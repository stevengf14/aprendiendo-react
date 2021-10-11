import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        var buttonString = "Ir al blog";
        return (
            <div id="home">
                <Slider
                    title="Aprendiendo React, por Steven Guamán"
                    size="slider-big"
                    btn={buttonString}
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Últimos Artículos</h1>
                        <Articles 
                            home="True"
                        />
                    </div>
                </div>
                <Sidebar />
            </div>
        );
    }
}
export default Home;