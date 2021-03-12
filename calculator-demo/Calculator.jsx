import React from 'react';
import './Calculator.css';
import $ from 'jquery';
$(document).ready(function(){
  $(".toggle").click(function(){
    $(".memory-bank").css("display","none");
   });
   $(".recAll").click(function(){
    $(".memory-bank").css("display","block");
   });   
});


const showdata=[];
const display=[];
class Calculator extends React.Component{
    constructor(props){
        super(props)
      this.state = {
        showdata,
        display,
        value:0,
      } 
    }
    buttonClick=(val)=>{
      //alert(val);
      
      this.setState({
        value:val
      })
      $(".memory-bank").css("display","none");
    }
    appendData=()=> {
      
      //console.log(display)
      let showdata = display;
      return (
        // <div id="showDiv">
        //   {
             showdata.map((val, index) => {
              return (
                <button className="updateButton" key={index} onClick={this.buttonClick.bind(this,val)}>
                  { val }
                </button>
              )
            })
            
        //   }
        // </div>
      );
      
    }
      //console.log(showdata)
    handleInput(e) {
        const updateValue = e
         let newVal=$(".inputdiv").val();
        if(this.state.value===0){
          this.setState({
            value: updateValue,
            //showdata:this.state.showdata.push(this.state.value)          
            })
        }
        else{
        this.setState({
          value:this.state.value += updateValue,  
          showdata:this.state.display.push(this.state.value)  
          })
        }
         if(newVal==='Infinity'||newVal==='-Infinity'){
          this.setState({
            value: updateValue     
            })
        }
        
          let arval=$(".inputdiv").val();
          let stringLength = arval.length;
          let val=arval.charAt(stringLength - 1)
          if((val==='*'|| val==='-'||val==='/'|| val==='+') && (updateValue==='*'|| updateValue==='-'||updateValue==='/'|| updateValue==='+'))
        {
         // console.log("vl",val)
          //console.log("up",updateValue)
          let val1=arval.slice(0,-1)
          //console.log(val1)  
          this.setState({
            value:val1 += updateValue,  
            showdata:this.state.display.push(this.state.value)  
            })
        }
        
          
         
        //this.state.showdata=this.state.display.push(this.state.value)
        //console.log(display) 
    }
    clear=()=>{
        this.setState({
          value:0
        })
      }
    removeLast=()=>{
      let newValue
      //let oldValue= this.state.value
      let newVal=$(".inputdiv").val();
      if(newVal==='Infinity'|| newVal==='-Infinity'){
        this.setState({
          value:0
        });
      }else{
      newValue=newVal.slice(0,-1);
      if(newValue.length<=0){
            this.setState({
              value:0
            });
          }else{
            this.setState({
              value:newValue
            });
          }
        }
      console.log(newVal)
      // if(oldValue){
      //   newValue=oldValue.slice(0, -1)
      //   //console.log(newValue.length)
      //   
      // }
    }
    result=()=>{ 

      let ans = $(".inputdiv").val();
      let patt1 = /[-|*|+|/]/g
      let patt2=/^[0]*$/g
      let patt4=ans.charAt(0)

      let stringLength = ans.length;
      let patt3=ans.charAt(stringLength - 1)
      //console.log(ans.charAt(stringLength - 1)===ans.match(patt1))

      if(patt3==='*'|| patt3==='-' || patt3==='+' || patt3==='/' ){
        //console.log(ans.slice(0,-1))
          this.setState({
          value: ans
          })
          //console.log(ans)
      }else if(patt4==='/' || patt4==='*'){
        
        this.setState({
          value: 0
          })
      } 
      else{
        if(ans.match(patt1)){
         //console.log("hii") 
         if (ans) {
            let ans1 = eval(ans)
            this.setState({
            value: ans1
            })
          }
        }
        else if(ans.match(patt2)){
          this.setState({
            value: 0
            })
        }
      }
        //console.log("ans",ans)
      }
render=()=>{
    return (
      <div className="Calculator">
          <div > 
            <input type="text" className="inputdiv" value={this.state.value} readOnly maxlength="50" ></input>
          </div>
          <section className="memory-bank">
            <button className="toggle" ><span className="title">x</span></button>
            {this.appendData()}
          </section>
          <section className="set-number">
              <button onClick={() => this.handleInput('1')}>
                  <span className="title">1</span>
              </button>
              <button onClick={() => this.handleInput('2')}>
                  <span className="title">2</span>
              </button>
              <button onClick={() => this.handleInput('3')}>
                  <span className="title">3</span>
              </button>
              <button onClick={() => this.handleInput('4')}>
                  <span className="title">4</span>
              </button>
              <button onClick={() => this.handleInput('5')}>
                  <span className="title">5</span>
              </button>
              <button onClick={() => this.handleInput('6')}>
                  <span className="title">6</span>
              </button>
              <button onClick={() => this.handleInput('7')}>
                  <span className="title">7</span>
              </button>
              <button onClick={() => this.handleInput('8')}>
                  <span className="title">8</span>
              </button>
              <button onClick={() => this.handleInput('9')}>
                  <span className="title">9</span>
              </button>
              <button onClick={() => this.handleInput('0')}>
                  <span className="title">0</span>
              </button>
          </section>
          <section className="set-function">
              <button className="recAll" >
                  <span className="title">recall</span>
              </button>
              <button onClick={this.clear}>
                  <span className="title">clear</span>
              </button>
              <button onClick={this.removeLast}>
                  <span className="title">←</span>
              </button>
          </section>
          <section className="set-equation">
              <button onClick={() => this.handleInput('+')}>
                  <span className="title">+</span>
              </button>
              <button onClick={() => this.handleInput('-')}>
                  <span className="title">-</span>
              </button>
              <button onClick={() => this.handleInput('*')}>
                  <span className="title">*</span>
              </button>
              <button onClick={() => this.handleInput('/')}>
                  <span className="title">/</span>
              </button>
              <button onClick={this.result}>
                  <span className="title">=</span>
              </button>
          </section>
      </div>
    );
  }
}
  export default Calculator;