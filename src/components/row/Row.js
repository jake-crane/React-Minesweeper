import React, { Component } from 'react';
import Cell from '../cell/Cell';

export default class Row extends Component {
    render() {
        return (<div className="row">
            {this.props.data.map((cell, i) => (<Cell key={i} cellData={cell} onCellClick={this.props.onCellClick.bind(this, i)}></Cell>))}
        </div>);
    }
}