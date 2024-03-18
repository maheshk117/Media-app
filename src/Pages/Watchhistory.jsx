import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getVideoHsitory } from '../Services/allAPIS';

function Watchhistory() {

  const [history,setHistory] =useState([])
const handleHistory=async()=>{
  //make an api call to get the watch video history
  const {data}=await getVideoHsitory()
  console.log(data);
  setHistory(data)
}
console.log(history);

useEffect(()=>{
  handleHistory()
},[])

  return (
    <div className='container m-5'>
      <h3 className='text-center'> Watch History</h3>
      <div style={{}}></div>


      <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Caption</th>
          <th scope='col'>URL</th>
          <th scope='col'>Timestamp</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        
          {
            history?history.map((item)=>(
              <tr>
          <th scope='row'>{item.id}</th>
          <td><a href={item.caption}>{item.caption}</a></td>
          <td>{item.embedLink}</td>
          <td>{}</td>
        </tr>
            )):"No history found"
          }
      </MDBTableBody>
    </MDBTable>
    </div>
  )
}

export default Watchhistory