import React, { Component, useState } from 'react'
import './Registro.css';
import { db, storage } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Registro extends React.Component {

    constructor(props){
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
                window.location.href = "/Login" ;
            });
        }
        
        
    }

    render() {
        return (
            <div className="cuadro-login">
                <div className="div-interior">
                    <label>Profavor digita tu Nombre: </label>
                    <br />
                    <input type="text" placeholder="Alan Brito" id="usuario" />
                    <br /><br /><br />
                    <label>Correo: </label>
                    <br />
                    <input type="text" placeholder="example@something.com" id="correo" />
                    <br /><br /><br />
                    <label>Contraseña: </label>
                    <br />
                    <input type="password" placeholder="password" id="password" />
                    <br />
                    <label>Rep_Contraseña: </label>
                    <br />
                    <input type="password" placeholder="rep_password" id="rep_password" />
                    <br /><br /><br />
                    <label>Imagen de usuario: </label>
                    <br />
                    <input type="file" placeholder="example@something.com" id="user_img" />
                    <br /><br /><br />
                    {!this.state.registro_completado && <button onClick={this.registrarUsuario} >Registrarme</button>}
                    {this.state.registro_completado && <Link to="/Login">Ir al Login...</Link>}
                </div>
            </div>
        );
    }

}

export default Registro;