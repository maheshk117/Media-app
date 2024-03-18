import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { addCategory, deleteCategory, getAVideo, getCategory, updateCategory } from '../Services/allAPIS';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoCard from './VideoCard';
  
function Category() {
  const [show, setShow] = useState(false); //to hold category name
  const [categoryData, setCategoryData] = useState([]) //to hold category data


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategoryVideos = async () => {
    //make an api call
    const {data} = await getCategory()
    console.log(data );
    setCategoryData(data)
  }

  console.log(categoryData);

  useEffect (() => {
    getCategoryVideos()
  },[])

  const [categoryName, setCategoryName] = useState('')
  console.log(categoryName);

  const handleCategory = async () => {
    if (categoryName) {
      //make an api call
      const reqBody = {
        categoryName
      }
      const response = await addCategory(reqBody)
      console.log(response);
      alert ('Modal added successfully')
      handleClose()
      setCategoryName('')
      getCategoryVideos()
    }
    else {
      alert("Please enter category name");
    }
  }
  console.log(categoryName);

const handleDelete = async(id) =>{
//make an api call
await deleteCategory(id)
getCategoryVideos()
}

const dragOver=(e)=>{
  console.log("Drag Over");
  e.preventDefault()
}
const videoDrop=async(e,categoryId)=>{
  console.log("Video dropped at category Id of"+categoryId);
  const videoId=e.dataTransfer.getData("videoId")
  console.log("VideoCardId:" +videoId);
  //api call for particular video
  const {data}= await getAVideo(videoId)
  console.log(data);
//get category details
const selectedCategory = categoryData?.find(item=>item.id==categoryId)
console.log(selectedCategory);
//video details push to allVideos array
selectedCategory.allVideos.push(data)
//make an api call to update details
await updateCategory(categoryId,selectedCategory)
}


  return (
    <div className='text-center'>
      <button onClick={handleShow} className='btn m-5 btn-primary'>Add Category</button>
      <div>
        {
          categoryData.length>0?categoryData.map((item)=>(
            <div droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)}>
            <div className='container border border-1 m-4 shadow'>
              <div className="d-flex justiify-content-between p-3">
                <h5>{item.categoryName}</h5>
                <button onClick={()=>handleDelete(item.id)} className='btn'>
                  <i className='fa-solid fa-trash text-danger'></i>
                </button>
                </div>
                <Row>
                  {
                    item.allVideos.map((data)=>(
                        <Col>
               <VideoCard displayData={data}/>

                        </Col>

                      ))
                  }
                </Row>
              </div>
            </div>
          )):"No Category Selected"
          }
      </div>
              
            

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
        {/* <MDBInput label='Category Id' id='form1' type='text' className='mb-3'/> */}
        <MDBInput onChange={(e) => setCategoryName(e.target.value)} label='Category Name' id='form1' type='text' className='mb-3' />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={(e) => handleCategory()} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default Category