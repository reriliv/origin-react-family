import React, {Component} from 'react';
import style from './LoginPanel.css';

class Code extends Component{

  constructor(props){
    super(props);
    this.state = {
      ...this.initState()
    }
  }

  initState() {
    const [
      data,
      rotate,
      fz,
      color
    ] = [
      this.getRandom(109,48,4),
      this.getRandom(75,-75,4),
      this.getRandom(20,24,4),
      [
        this.getRandom(51, 200, 3),
        this.getRandom(51, 200, 4),
        this.getRandom(51, 100, 3),
        this.getRandom(51, 100, 3)
      ]
    ];

    let code = '';
    for(let item of data){
      code += String.fromCharCode(item > 57 && item < 84 ? item + 7 : ( item < 57 ? item : item + 13 ))
    }

    return {
      data: data,
      rotate: rotate,
      fz: fz,
      color: color,
      code: code.toUpperCase()
    };
  }

  getRandom(max, min, num){
    const asciiNum = ~~(Math.random()*(max-min+1)+min)
    if(!Boolean(num)){
      return asciiNum
    }
    const arr = []
    for(let i = 0; i < num; i++){
      arr.push(this.getRandom(max, min))
    }
    return arr
  }

  canvas() {
    const { getRandom } = this
    const canvas = document.querySelector('#bgi')
    let ctx = canvas.getContext('2d')
    canvas.height = canvas.height
    // ctx.clearRect(0, 0, canvas.width(), canvas.height())
    ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`
    for( let i = 0; i< 7; i++ ) {
      ctx.lineTo(this.getRandom(200,0), this.getRandom(200,10))
      ctx.moveTo(this.getRandom(200,0), this.getRandom(200,0))
      ctx.stroke();
    }
  }

  render(){
    return (
      <div className={style['vcodewrap']} >
        <canvas id="bgi" className={style['bgi']} width="200" height="200"></canvas>
        {this.state.data.map((v,i) => 
          <div 
            key={i}
            className={style['itemStr']}
            style={{
              transform:`rotate(${this.state.rotate[i]}deg)`,
              fontSize: `${this.state.fz[i]}px`,
              color: `rgb(${this.state.color[i].toString()})`,
              fontWeight: 'bold'
            }}
            // onMouseEnter={() => this.setState({refresh:true})}
          >
            { String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 )) }
          </div>  
        )}
        <div
          className={style['mask']}
          onClick={() => {
            this.setState({...this.initState()})
            this.canvas()
          }}
          // onMouseLeave={() => {this.setState({refresh: false})}}
          // onMouseOut={() => {this.setState({refresh: false})}}
        > 看不清？点击刷新  
        </div> 
      </div>
    );
  }
}

export default Code;