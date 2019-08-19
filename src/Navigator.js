import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Exercise from './Exercise';
import TodoList from './TodoList';

class Navigator extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "selected" : "None",
        };
        this.handleChange = this.handleChange.bind(this);
        this.getTemplate = this.getTemplate.bind(this);
    }

    handleChange(_, newValue){
        this.setState({"selected": newValue});
    }

    getTemplate(){
        switch (this.state.selected){
            case 'None':
                return <div/>
            case 'todolist': 
                return <TodoList />
            case 'exercise':
                return <Exercise />
            default:
                return <div/>
        }
    }

    render(){
        return(
            <React.Fragment>
                <AppBar position="static">
                    <Tabs value={this.value} onChange={this.handleChange} aria-label="导航栏">
                        <Tab label="Todo-list" value="todolist"/>
                        <Tab label="减肥打分表" value="exercise"/>
                        <Tab label="数独游戏" value="soduku"/>
                        <Tab label="翻转棋" value="reversi"/>
                    </Tabs>
                </AppBar>
                {this.getTemplate()}
            </React.Fragment>
        );
    }
};

export default Navigator;