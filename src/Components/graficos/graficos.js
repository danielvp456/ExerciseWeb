import React, { Component } from 'react'
import './graficos.css'
import { Chart } from "react-google-charts";
import { db, storage } from '../../firebase';
import { CodeSharp } from '@material-ui/icons';
import { Bar } from "react-chartjs-2";

export default class graficos extends Component {


    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            label_fecha: [],
            data_producto1: [],
            data_producto2: [],
            data_producto3: [],
            data_producto4: [],
            data_producto5: []
        }
        //this.actualizarGrafica();
        this.tomandoInfo = this.tomandoInfo.bind(this);
        this.actualizarGrafica = this.actualizarGrafica(this);
        this.render = this.render.bind(this);
        this.tomandoInfo();
    }

    async actualizarGrafica() {
        setInterval(()=>{
            window.location.reload();
        }, 10000);
    }

    tomandoInfo() {

        var array_fecha = localStorage.getItem('arreglo_fechas');
        var array_producto1 = localStorage.getItem('arreglo_producto1');
        var array_producto2 = localStorage.getItem('arreglo_producto2');
        var array_producto3 = localStorage.getItem('arreglo_producto3');
        var array_producto4 = localStorage.getItem('arreglo_producto4');
        var array_producto5 = localStorage.getItem('arreglo_producto5');
        array_fecha = JSON.parse(array_fecha);
        array_producto1 = JSON.parse(array_producto1);
        array_producto2 = JSON.parse(array_producto2);
        array_producto3 = JSON.parse(array_producto3);
        array_producto4 = JSON.parse(array_producto4);
        array_producto5 = JSON.parse(array_producto5);
        this.state.label_fecha = array_fecha;
        this.state.array_producto1 = array_producto1;
        this.state.array_producto2 = array_producto2;
        this.state.array_producto3 = array_producto3;
        this.state.array_producto4 = array_producto4;
        this.state.array_producto5 = array_producto5;
    }

    render() {
        return (

            <div className="card mb-4">
                <div className="card-body">
                    {/*<Chart
                        id="graficaId"
                        width={'500px'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.datos}
                        options={{
                            isStacked: true,
                            height: 300,
                            legend: { position: 'top', maxLines: 6 },
                            vAxis: { minValue: 0 },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />*/}

                    <Bar
                        data={{
                            labels: this.state.label_fecha,
                            datasets: [{
                                label: "BH Expert 4.0",
                                data: this.state.array_producto1,
                                backgroundColor:['red']
                            }, {
                                label: "Conor Listing 9500",
                                data: this.state.array_producto2,
                                backgroundColor:['blue']
                            }, {
                                label: "NCM Moscow",
                                data: this.state.array_producto3,
                                backgroundColor:['green']
                            }, {
                                label: "NCM Moscow Plus",
                                data: this.state.array_producto4,
                                backgroundColor:['purple']
                            }, {
                                label: "Hiriyt 26”",
                                data: this.state.array_producto5,
                                backgroundColor:['yellow']
                            }]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,

                        }}
                    />
                </div>

            </div>
        )
    }
}

