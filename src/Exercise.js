import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Icon, Button, List, Divider, TextField, ListItem, FormLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

class ExerciseHistoryItem {
    constructor(time, describe, value){
        this.time = time;
        this.describe = describe;
        this.value = value;
        this.valid = true;
    }
}

class Exercise extends React.Component{

    constructor(props){
        super(props);
        this.storageName = 'exercise-state-storage';
        const history = localStorage.getItem(this.storageName);
        if (history !== null){
            this.state = JSON.parse(history);
        }else{
            this.state = {
                history: [], target: [],
                currentDescription: '',
                currentValue: 0,
                currentTargetDescription: '',
                currentTargetValue: 0,
                totalValue : 0,
            };
        }
        this.state.totalValue = 0;
        for (let i = 0;i < this.state.history.length; i++){
            this.state.totalValue += this.state.history[i].value;
        }
        this.submitHistory = this.submitHistory.bind(this);
    }

    submitHistory(){
        let history = this.state.history;
        history.push(new ExerciseHistoryItem((new Date()).toLocaleString(), this.state.currentDescription, this.state.currentValue));
        //window.alert(this.state.currentDescription + " and " + this.state.currentValue);
        this.setState({history: history, totalValue: this.state.totalValue + this.state.currentValue});
        localStorage.setItem(this.storageName, JSON.stringify(this.state));
    }

    removeHistory(index){
        let history = this.state.history;
        let val = this.state.totalValue - history[index].value;
        history.splice(index, 1);
        this.setState({history: history, totalValue: val});
        localStorage.setItem(this.storageName, JSON.stringify(this.state));
    }

    render(){
        return (
            <React.Fragment>
                <h1> 现在拥有 {this.state.totalValue} 分 </h1>
                <List>
                    <ListItem>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormLabel> 内容描述 </FormLabel>
                                <TextField id="description" margin="normal" onChange={(event)=>this.setState({currentDescription: event.target.value})}/>
                            </Grid>                                
                            <Grid item xs={12} sm={3}>
                                <FormLabel> 评分 </FormLabel>
                                <TextField id="delta-value" type="number" margin="normal" value={this.state.currentValue} onChange={(event)=>this.setState({currentValue: parseInt(event.target.value)})}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button color="primary" onClick={this.submitHistory}>提交</Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider/>

                    {this.state.history.map((item, index)=>{return (
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}> {item.time} </Grid>
                                <Grid item xs={8} sm={4}> {item.describe} </Grid>
                                <Grid item xs={8} sm={1}> {item.value} </Grid>
                                <Grid item xs={8} sm={1}> 
                                    <IconButton aria-label="delete" onClick={()=>this.removeHistory(index)}>
                                        <Icon>X</Icon>
                                    </IconButton>
                                </Grid>                                    
                            </Grid>
                        </ListItem>
                    )}).reverse()}
                </List>
            </React.Fragment>
        )
    }
};

export default Exercise;