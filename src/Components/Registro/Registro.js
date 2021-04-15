import React, { Component, useState } from 'react'
import './Registro.css';
import { db, storage } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class Registro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registro_completado: false
        }

        this.registrarUsuario = this.registrarUsuario.bind(this);
        this.render = this.render.bind(this);
    }

    async registrarUsuario() {
        const user = document.getElementById("usuario").value;
        const correo = document.getElementById("correo").value;
        const pswd = document.getElementById("password").value;
        const rep_pswd = document.getElementById("rep_password").value;
        const foto = document.getElementById("user_img").files[0];

        console.log(this.state);
        if (!foto) {
            console.log("olee suba algo!!")
        } else {
            var storageRef = storage.ref('/Img_User/' + foto.name);
            var subirImg = storageRef.put(foto);
            if (pswd == rep_pswd) {
                await subirImg.on('state_changed', function (snapshot) {
                }, function (error) {
                    console.log(error);
                }, async function () {
                    console.log("Imagen correctamente subida");
                    const datos = {
                        user: user,
                        correo: correo,
                        pswd: pswd,
                        dir_imagen: '/Img_User/' + foto.name
                    }
                    await db.collection('user').doc().set(datos);
                    console.log("usuario añadido jeje");
                    window.location.href = "/Login";
                });
            }else{
                Swal.fire({
                    title:'Las contraseñas no coinciden',
                    text:'No pasa nada, Intentalo de nuevo pliz',
                    icon: 'error',
                    showConfirmButton:true
                })
            }

        }


    }

    render() {
        return (
            <div className="cuadro-registro scroll">
                <div className="div-interior">
                    <label className="label-registro">Profavor digita tu Nombre: </label>
                    <br />
                    <input className="input-registro" type="text" placeholder="Alan Brito" id="usuario" />
                    <br /><br />
                    <label className="label-registro">Correo: </label>
                    <br />
                    <input className="input-registro" type="text" placeholder="example@something.com" id="correo" />
                    <br /><br /><br />
                    <label className="label-registro">Contraseña: </label>
                    <br />
                    <input className="input-registro" type="password" placeholder="password" id="password" />
                    <br />
                    <label className="label-registro">Rep_Contraseña: </label>
                    <br />
                    <input className="input-registro" type="password" placeholder="rep_password" id="rep_password" />
                    <br /><br /><br />
                    <label className="label-registro">Imagen de usuario: </label>
                    <br />
                    <input className="input-registro" type="file" placeholder="example@something.com" id="user_img" accept="image/*" />
                    <br /><br /><br />
                    {!this.state.registro_completado && <button className="boton-registro" onClick={this.registrarUsuario} >Registrarme</button>}
                    {this.state.registro_completado && <Link to="/Login">Ir al Login...</Link>}
                    <br />
                </div>
            </div>
        );
    }

}

export default Registro;