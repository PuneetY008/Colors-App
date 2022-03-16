import { Component } from 'react';
import Pallete from './Pallete';
import PalleteList from './PalleteList';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers";
import {Route, Switch} from 'react-router-dom';
import './App.css';


class App extends Component  {
  //console.log(generatePalette(seedColors[4]));

  findPallete(id){
    return seedColors.find(function(pallete){
      return pallete.id === id;
    });
  }
  render(){
    return (

      <Switch>
        <Route exact path='/' render={()=> <PalleteList palletes= {seedColors} />} ></Route>
        <Route exact path='/pallete/:id' render={(routeProps)=>(
          <Pallete pallete= {generatePalette(this.findPallete(routeProps.match.params.id))} />
        )} />
      </Switch>
  
      // <div className="">
      //   <Pallete pallete ={generatePalette(seedColors[0])} />
      // </div>
    );
  }
}

export default App;
