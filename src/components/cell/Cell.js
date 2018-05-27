import React, { Component } from 'react';
import './cell.css';

export default class Cell extends Component {
    getClassNames() {
        let classNames = 'cell';
        if (this.props.cellData.hidden)
            classNames += ' inset';
        return classNames;
    }
    render() {
        return (<div className={this.getClassNames()}
        onClick={this.props.onCellClick}>{ this.props.cellData.hidden ? '' : (this.props.cellData.value)}</div>);
    }
}