import React, { Component } from 'react';
import './cell.css';

export default class Cell extends Component {
    render() {
        return (<div className="cell" onClick={this.props.onCellClick}>{ this.props.cellData.hidden /* || this.props.cellData.value === 0 */  ? '' : (this.props.cellData.value)}</div>);
    }
}