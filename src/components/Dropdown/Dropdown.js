import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Dropdown.module.css';

export class Dropdown extends Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState({
            open: !this.state.open
        });
    }

    render () {
        const { items, handler, active } = this.props;
        const { open } = this.state;
        const list = items.map((item) => (
            <DropdownItem 
                key={item} 
                onclick={() => {
                    handler(item);
                    this.setState({ open: false });
                }}
            >{ item }</DropdownItem>
        ));

        return (
            <div className={styles.container}>
                <div className={[styles.currentItem, open ? styles.open : ''].join(' ')} onClick={this.handleClick}>
                    { active ? active : 'Please select a category...' }
                    <FontAwesomeIcon icon='sort' />
                </div>
                <ul className={open ? styles.open : ''}>{ list }</ul>
            </div>
        );
    }
};

export const DropdownItem = ({ children, onclick }) => (
    <li className={styles.listItem} onClick={onclick}>{ children }</li>
);
