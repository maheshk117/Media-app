import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { uploadVideo } from '../Services/allAPIS';



function Add() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//to hold the video details
const[video,setVideo]=useState({
  id:"",
  caption:"",
  url:"",
  embedLink:""
})
console.log(video);

const getEmbedLink=(e)=>{
  const {value}=e.target
  if(value){
    console.log(value.slice(-31));
    const link=`https://www.youtube.com/embed/${value.slice(-31)}`
    setVideo({...video,embedLink:link})
  }
  else{
    setVideo({...video,embedLink:""})
  }
}

const handleAdd = async ()=>{
  const {id,caption,url,embedLink}=video
  if(!id || !caption||!url||!embedLink){
    alert("Please enter valid details")
  }
  else{
    //make an api call to add video details to db.json file
    const response = await uploadVideo(video)
    console.log(response);
    if(response.status>=200 && response.status<=300){
      alert(`${response.data.caption} Added Successfully`)
      handleClose()
    }
    else{
      alert("Please enter a video id")
    }
  }
}

  return (
    <div>
        <Row className='container'>
            <Col xl={6} className='text-center d-flex justify-content-center m-5' >
                <h4>Upload Video</h4>
                <MDBBtn className='btn mx-4' onClick={handleShow}><i className="fa-solid fa-plus"></i></MDBBtn>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBInput onChange={(e)=>setVideo({...video,id:e.target.value})} label='Video Id' id='form1' type='text' className='mb-3'/>
        <MDBInput onChange={(e)=>setVideo({...video,caption:e.target.value})} label='Video Caption' id='form1' type='text' className='mb-3' />
        <MDBInput onChange={(e)=>setVideo({...video,url:e.target.value})} label='Video Image URL' id='form1' type='text' className='mb-3' />
        <MDBInput label='Youtube Video Link' id='form1' type='text' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
            </Col>
        </Row>
    </div>
  )
}

export default Add