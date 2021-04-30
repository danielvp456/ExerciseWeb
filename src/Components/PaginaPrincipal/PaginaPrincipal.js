import React, { Component } from 'react'
import './PaginaPrincipal.css'
import { db, storage } from '../../firebase';
import 'bootstrap/dist/css/bootstrap.css';

export default class PaginaPrincipal extends React.Component {

    constructor() {
        super();
        this.state = {
            login: false,
            usuario: ""
        }
        //localStorage.clear();
        this.funcionLogueado = this.funcionLogueado.bind(this);
        this.funcionBienvenido = this.funcionBienvenido.bind(this);
        this.evaluar();
    }

    async evaluar() {
        if (localStorage.getItem("loginUser") === "true") {
            this.state.login = true;
            this.state.usuario = localStorage.getItem("nombre_usuario");

            const queryImg = await storage.ref().child(localStorage.getItem("direccion")).getDownloadURL().then(function (url) {
                var img = document.getElementById('my_imagen');
                img.src = url;
                localStorage.setItem("imagenUsuario", img.src);
                console.log("direccion exacta: " + img.src);
            }).catch(function (error) {
                console.log(error);
            });
            console.log("imagen");
            console.log(localStorage.getItem("direccion"));


        }
    }

    funcionLogueado() {
        return (
            <div>
                <h1 className="my-h1"> Bienvenido al ejercicio desarrollo web </h1>
                <div className="contenedor-izquierdo">
                    <img src="" id="my_imagen" className="imagen" />
                </div>
                <div className="contenedor-derecho">
                    <h2>Hola {this.state.usuario} </h2>
                    <br /><br />
                    <p>
                        "Cualquier tecnología suficientemente avanzada es equivalente a la magia."
                        Arthur C. Clarke
                    </p>
                </div>
            </div>
        );
    }

    funcionBienvenido() {
        return (
            <div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_01"> bicicleta eléctrica 01</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_01"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_01"> 1'000.000 $ </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_01">Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_01" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_02"> bicicleta eléctrica</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_02"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_02"> 1'000.000 $ </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_02">Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_02" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_03"> bicicleta eléctrica</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_03"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_03"> 1'000.000 $ </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_03">Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_03"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_04"> bicicleta eléctrica</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_04"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_04"> 1'000.000 $ </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_04">Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_04"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_05"> bicicleta eléctrica</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_05"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_05"> 1'000.000 $ </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_05">Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_05" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    render() {
        return (
            <div className="">
                <br /><br /><br />
                {this.state.login && <this.funcionLogueado></this.funcionLogueado>}
                {!this.state.login && <this.funcionBienvenido></this.funcionBienvenido>}
            </div>

        );
    }

}