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

    async registrarUsuario(e) {
        e.preventDefault();
        const user = document.getElementById("usuario").value;
        const correo = document.getElementById("correo").value;
        const pswd = document.getElementById("password").value;
        const rep_pswd = document.getElementById("rep_password").value;
        const direccion = document.getElementById("direccion").value;


        
        if (!user == "" && !correo == "" && !pswd == "" && !rep_pswd == "" && !direccion == "") {

            
            var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (!regex.test(correo)) {
                Swal.fire({
                    title: 'Correo invalido',
                    text: 'Por favor ingresa bien el correo',
                    icon: 'warning',
                    showConfirmButton: true
                });
            } else {
                if (pswd == rep_pswd) {

                
                    const datos = {
                        user: user,
                        correo: correo,
                        pswd: pswd,
                        direccion: direccion
    
                    }
    
                    var correoRepetido = false;
                    const querySnapshot = await db.collection('user').get();
    
                    querySnapshot.forEach(doc => {
    
                        if (correo==doc.data().correo) {
                            Swal.fire({
                                title: 'Este correo ya esta registrado',
                                text: 'Por favor cambia el correo',
                                icon: 'warning',
                                showConfirmButton: true
                            });
                            correoRepetido=true;
                        }
    
                    });
    
    
    
                    if(correoRepetido==false){
                    await db.collection('user').doc().set(datos);
                    console.log("usuario añadido jeje");
                    window.location.href = "/Login";
                }
    
                } else {
                    Swal.fire({
                        title: 'Las contraseñas no coinciden',
                        text: 'No pasa nada, Intentalo de nuevo pliz',
                        icon: 'error',
                        showConfirmButton: true
                    });
                }
            }
           



        } else {

            Swal.fire({
                title: 'Datos incompletos',
                text: 'Por favor completa todos los campos',
                icon: 'warning',
                showConfirmButton: true
            });
        }



    }

    render() {
        return (
            <div className="cuadro-registro scroll">
                <div className="div-interior">
                    <form>
                        <label className="label-registro">Por favor digita tu Nombre: </label>
                        <br />
                        <input className="input-registro" type="text" placeholder="Alan Brito" id="usuario" required />
                        <br />
                        <label className="label-registro">Correo: </label>
                        <br />
                        <input className="input-registro" type="email" placeholder="example@something.com" id="correo" required />
                        <br />
                        <label className="label-registro">Contraseña: </label>
                        <br />
                        <input className="input-registro" type="password" placeholder="contraseña" id="password" required />
                        <br />
                        <label className="label-registro">Repita la Contraseña: </label>
                        <br />
                        <input className="input-registro" type="password" placeholder="contraseña" id="rep_password" required />
                        <br />
                        <label className="label-registro">Dirrecion: </label>
                        <br />
                        <input className="input-registro" type="text" placeholder="Cll 00 a #00 d - 00" id="direccion" required />
                        <br></br>

                        {/*<label className="label-registro">Imagen de usuario: </label>
                    <br />
                    <input className="input-registro" type="file" placeholder="example@something.com" id="user_img" accept="image/*" />
        <br /><br /><br />*/}
                    </form>
                    {!this.state.registro_completado && <button className="boton-registro" type="submit" onClick={this.registrarUsuario} >Registrarme</button>}

                    {this.state.registro_completado && <Link to="/Login">Ir al Login...</Link>}
                    <br />
                </div>
            </div>
        );
    }

}

export default Registro;