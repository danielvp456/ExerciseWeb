import React, { Component } from 'react'
import './graficos.css'
import { Chart } from "react-google-charts";



export default class graficos extends Component {


    constructor(props) {
        super(props);
        this.state = {  datos: this.traerdatos()}
    }
    traerdatos() {

        var datos = [['Year', 'Sales', 'Expenses', 'zzzz'],
        ['27/04/2021', 1000, 400, 50],
        ['2014', 1170, 460, 31],
        ['2015', 660, 1120, 62],
        ['2016', 1030, 540, 0],];
        console.log('holla?',datos)
        return datos
    }

    render() {
        return (

            <div className="card mb-4">
                <div className="card-body">
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.datos}
                        options={{
                            isStacked: true,
                            height: 300,
                            legend: { position: 'top', maxLines: 5 },
                            vAxis: { minValue: 0 },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
                
            </div>
        )
    }
}

