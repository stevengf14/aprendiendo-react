import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



// Importar componente
import Header from './components/Header';


import Footer from './components/Footer';
import TestSection from './components/TestSection';
import MyComponent from './components/MyComponent';
import Movies from './components/Movies';
import Error from './components/Error';
import Home from './components/Home';
import Blog from './components/Blog';
import Form from './components/Form'
import Search from './components/Search';
import { Redirect } from 'react-router';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {

    render() {

        return (
            <BrowserRouter>
                <Header />
                {/* CONFIGURAR RUTAS Y PÁGINAS */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/search/:search" component={Search} />
                    <Route exact path="/blog/article/:id" component={Article} />
                    <Route exact path="/blog/create" component={CreateArticle} />
                    <Route exact path="/blog/edit/:id" component={EditArticle} />
                    <Route exact path="/form" component={Form} />
                    <Route exact path="/movies" component={Movies} />
                    <Route exact path="/blog/article/:id" render={() => (
                        <h1>Página Principal de link</h1>
                    )}
                    />
                    <Route exact path="/redirect/:search" render ={
                        (props) => {
                            var search = props.match.params.search;
                            return (
                                <Redirect to={'/blog/search/'+search}/>
                            );
                        }
                    } />
                    


                    <Route exact path="/test-route" component={TestSection} />
                    <Route exact path="/my-component" component={MyComponent} />
                    <Route exact path="/page-1" render={() => (
                        <React.Fragment>
                            <h1>Hola mundo de la ruta page-1</h1>
                            <MyComponent saludo="Hola amigo" />
                        </React.Fragment>

                    )} />
                    <Route exact path="/test/:name/:lastName?" render={(props) => {
                        var name = props.match.params.name;
                        var lastName = props.match.params.lastName;
                        return (
                            <div className="content">
                                <h1 className="subheader">Página de Pruebas</h1>
                                <h2>La niña más hermosa del mundo es
                                    {name && !lastName &&
                                        <React.Fragment>{' ' + name}</React.Fragment>
                                    }
                                    {name && lastName &&
                                        <React.Fragment>{' ' + name} {lastName}</React.Fragment>

                                    }
                                </h2>
                            </div>

                        )
                    }} />
                    <Route component={Error} />
                </Switch>
                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default Router;