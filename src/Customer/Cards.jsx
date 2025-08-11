import React from "react"
import './Cards.css'; 

function Cards() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-3 p-3 md-3'>
                <img className='mx-auto d-block p-3' src='https://cdn-icons-png.freepik.com/256/8694/8694731.png?semt=ais_hybrid' style={{width:"30%", alignItems:"center"}}/>
                <h4 className='text-muted' style={{textAlign:"center"}}><b>Customization</b></h4>
                <p className='text-muted' style={{textAlign:"center"}}><b>Customized solutions<br/> for your business <br/>
                  success.</b></p>
            </div>
              <div className='col-3 p-3  md-3'>
                <img className='mx-auto d-block p-3' src='https://cdn-icons-png.freepik.com/256/12156/12156117.png?semt=ais_hybrid' style={{width:"30%", alignItems:"center"}}/>
                <h4 className='text-muted' style={{textAlign:"center"}}><b>Analytics</b></h4>
                <p className='text-muted' style={{textAlign:"center"}}><b>Comprehensive reports<br/> to help you make <br/>
                  informed decisions.</b></p>
            </div>
              <div className='col-3 p-3  md-3'>
                <img className='mx-auto d-block p-3' src='https://cdn-icons-png.freepik.com/256/9499/9499775.png?semt=ais_hybrid' style={{width:"30%", alignItems:"center"}}/>
                <h4 className='text-muted' style={{textAlign:"center"}}><b>Dependable</b></h4>
                <p className='text-muted' style={{textAlign:"center"}}><b>Elastic resources to<br/> adapt and grow with<br/>
                  your business.</b></p>
            </div>
              <div className='col-3 p-3  md-3'>
                <img className='mx-auto d-block p-3' src='https://cdn-icons-png.freepik.com/256/16692/16692775.png?semt=ais_incoming' style={{width:"30%", alignItems:"center"}}/>
                <h4 className='text-muted' style={{textAlign:"center"}}><b>Innovolutions</b></h4>
                <p className='text-muted' style={{textAlign:"center"}}><b>Empowering the salon<br/> industry with the latest <br/>
                  in technology.</b></p>
            </div>
        </div>
    </div>
  )
}

export default Cards