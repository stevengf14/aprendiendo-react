import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    render() {

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículos que vendrán de la API */}
                        <Articles></Articles>
                    </div>
                </div>
                <Sidebar blog="true" />
            </div>
        );
    }
}
export default Blog;