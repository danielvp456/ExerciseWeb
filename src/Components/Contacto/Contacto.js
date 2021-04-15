import React, { Component } from 'react'
import './Contacto.css'
import Swal from 'sweetalert2';



export default class Contacto extends React.Component {

    constructor(){
        super();
        this.state = {
            correoEnviado: false
        }

        this.envioCorreo = this.envioCorreo.bind(this);
    }

    async envioCorreo() {
        this.state.correo = true
        var env_correo = document.getElementById("correo").value;
        var env_subject = document.getElementById("subject").value;
        var env_img = localStorage.getItem("imagenUsuario");
        console.log("u have: " + env_correo + "  --  " + env_subject);

        let headers = new Headers();
        let direccionServerEmail = 'https://emailwebexercise.herokuapp.com/correo';
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', direccionServerEmail);
        headers.append('Access-Control-Allow-Credentials', 'true');

        const res = await fetch(direccionServerEmail, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                to: env_correo,
                subject: env_subject,
                urlImg: env_img
            })
        });

        const data = await res.json();
        console.log(data);

        if (data == "recibido") {
            await Swal.fire({
                title: `Mensaje correctamente enviado`,
                text: 'Gracias por confiar en nosotros',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
            
            window.location.href = "/" ;
        }

    }

    render() {
        return (
            <div className="cuadro-contacto">
                <div className="div-interior">
                    <label className="label-contacto" >Enviar correo a: </label>
                    <br />
                    <input className="input-contacto" type="text" placeholder="example@something.com" id="correo" />
                    <br /><br />

                    <label className="label-contacto" >Asunto: </label>
                    <br />
                    <textarea className="input-contacto" type="text" placeholder="mensaje..." id="subject" />
                    <br /><br /><br />
                    <button className="boton-contacto" onClick={this.envioCorreo} id = "btn_envio"> Enviar Correo: </button>

                    <br /><br /><br />
                    {this.state.correoEnviado && <label className="label-contacto" >Espere un momento, estamos enviando su correo... </label>}
                    

                </div>
            </div>
        );
    }

}