import React, { Component } from 'react'
import './Contacto.css'
import Swal from 'sweetalert2';



export default class Contacto extends React.Component {

    async envioCorreo() {

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
            Swal.fire({
                title: `Mensaje correctamente enviado`,
                text: 'Gracias por confiar en nosotros',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            })
        }

    }

    render() {
        return (
            <div className="cuadro-login">
                <div className="div-interior">
                    <label>Enviar correo a: </label>
                    <br />
                    <input type="text" placeholder="example@something.com" id="correo" />
                    <br /><br />

                    <label>Mensaje: </label>
                    <br />
                    <textarea type="text" placeholder="mensaje..." id="subject" />
                    <br /><br /><br />
                    <button onClick={this.envioCorreo} > Enviar Correo:</button>
                </div>
            </div>
        );
    }

}