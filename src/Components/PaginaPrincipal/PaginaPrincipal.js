import React, { Component } from 'react'
import './PaginaPrincipal.css'
import { db, storage } from '../../firebase';
import 'bootstrap/dist/css/bootstrap.css';
import App from '../../App';

export default class PaginaPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: false,
            usuario: ""
        }
        //localStorage.clear();
        this.funcionBienvenido = this.funcionBienvenido.bind(this);
        this.comprarElemento = this.comprarElemento.bind(this);

    }


    comprarElemento(e, id_venta) {
        e.preventDefault();
        var nombre_producto = "";
        var descripcion = "";
        var precio = "";
        switch (id_venta) {
            case "1":
                nombre_producto = document.getElementById("titulo_01").textContent;
                descripcion = document.getElementById("descripcion_01").textContent;
                precio = document.getElementById("precio_01").textContent;
                break;
            case "2":
                nombre_producto = document.getElementById("titulo_02").textContent;
                descripcion = document.getElementById("descripcion_02").textContent;
                precio = document.getElementById("precio_02").textContent;
                break;
            case "3":
                nombre_producto = document.getElementById("titulo_03").textContent;
                descripcion = document.getElementById("descripcion_03").textContent;
                precio = document.getElementById("precio_03").textContent;
                break;
            case "4":
                nombre_producto = document.getElementById("titulo_04").textContent;
                descripcion = document.getElementById("descripcion_04").textContent;
                precio = document.getElementById("precio_04").textContent;
                break;
            case "5":
                nombre_producto = document.getElementById("titulo_05").textContent;
                descripcion = document.getElementById("descripcion_05").textContent;
                precio = document.getElementById("precio_05").textContent;
                break;
        }

        if(localStorage.getItem("producto"+id_venta) == null ){
            var objeto = { 'nombre': nombre_producto, 'precio': precio, 'cantidad': 1 };
            localStorage.setItem("producto"+id_venta, JSON.stringify(objeto));   
        }else{
            var objeto = JSON.parse(localStorage.getItem("producto"+id_venta));
            objeto.cantidad = (parseInt(objeto.cantidad) + 1).toString();
            localStorage.setItem("producto"+id_venta, JSON.stringify(objeto));
        }

        var app = new App();
        app.agregarProducto();

    }


    funcionBienvenido() {
        return (
            <div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_01"> BH Expert 4.0</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_01"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_01"> 1000000 </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_01" onClick={e => this.comprarElemento(e, "1")}>
                                    Comprar Ahora
                                </button>
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
                                <h3 className="mb-0" id="titulo_02"> Conor Listing 9500</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_02"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_02"> 1000000 </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_02" onClick={e => this.comprarElemento(e, "2")}>Comprar Ahora</button>
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
                                <h3 className="mb-0" id="titulo_03"> NCM Moscow</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_03"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_03"> 1000000 </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_03" onClick={e => this.comprarElemento(e, "3")}>Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_03" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_04"> NCM Moscow Plus</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_04"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_04"> 1000000 </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_04" onClick={e => this.comprarElemento(e, "4")}>Comprar Ahora</button>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img width="200" height="180" x="50%" y="50%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"
                                    src="https://la.network/wp-content/uploads/2018/11/Yerka-v3-turquoise.jpg" id="imagen_04" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0" id="titulo_05"> Hiriyt 26”</h3>
                                <div className="mb-1 text-muted"> abr 30</div>
                                <p className="card-text mb-auto" id="descripcion_05"> Bienvenidos damas y caballeros, esta bicicleta puede correr
                                por al menos unos 50 km/hora, dependiendo de la cantidad de veces esta se puede dañar
                            </p>
                                <strong className="d-inline-block mb-2 " id="precio_05"> 1000000 </strong>
                                <br />
                                <button type="button" class="btn btn-primary" id="boton_05" onClick={e => this.comprarElemento(e, "5")}>Comprar Ahora</button>
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
                <this.funcionBienvenido></this.funcionBienvenido>
            </div>

        );
    }

}