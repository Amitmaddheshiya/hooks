import {
    useState,
    useEffect
} from "react";
import $ from "jquery";

import {
  Modal
} from "react-bootstrap";

const Http = ()=>{
  const [data,setData] = useState([]);
  const [counter,setCounter] = useState(0);
  const [animation,setAnimation] = useState("animate__animated animate__fadeIn");
  const [openModal,setModal] = useState(false);

  const fetchData = ()=>{
    $.ajax({
      type: "GET",
      url: "http://localhost:3232",
      success: function(response)
      {
        return setData(response);
      }
    });
  }

  const fetchDataById = ()=>{
    $.ajax({
      type: "GET",
      url: `http://localhost:3232/${counter}`,
      success: function(response)
      {
        return setData([response]);
      },
      error: function(err)
      {
        if(err.status === 404)
        {
          /*
          alert("Data not found !");
          return(
            setCounter(0)
          );
          */
        }
      }
    });
  }

  useEffect(()=>{
    fetchDataById();
  },[counter]);

  const next = ()=>{
    return(
      setCounter(counter+1),
      setAnimation("animate__animated animate__slideInLeft")
    );
  }

  const prev = ()=>{
    return(
      setCounter(counter-1),
      setAnimation("animate__animated animate__slideInRight")
    );
  }

  const insertComment = (e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    $.ajax({
      type: "POST",
      url: "http://localhost:3232",
      data: formData,
      contentType: false,
      processData: false,
      success: function(response)
      {
        return(
          setModal(false),
          setCounter(response.data.id)
        );
      }
    });
  }

  const updateComment = (data)=>{
    console.log(data);
  }

  const deleteComment = (id)=>{
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3232/${id}`,
      success: function(response)
      {
        console.log(response);
      },
      error: function(err)
      {
        console.log(err);
      }
    });
  }

  const Card = (data)=>{
    const design = (
      <>
        <div className={"card mb-4 "+animation}>
          <div className="card-header text-capitalize d-flex justify-content-between align-items-center">
            <label>{data.userData.title}</label>
            <div>
              <button className="btn border" style={{marginRight:"8px"}} onClick={()=>updateComment(data)}>
                <i className="fa fa-edit"></i>
              </button>
              <button className="btn border" onClick={()=>deleteComment(data.userData.id)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            {data.userData.body}
          </div>
        </div>
      </>
    );
    return design;
  }

  const design = (
    <>
      <div className="container py-4 overflow-hidden">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h1 className="m-0 p-0 display-4">Comments - <small>{counter}</small></h1>
          <button className="btn btn-success" onClick={()=>setModal(true)}>New Comment</button>
        </div>
        {
          data.map((items)=>{
            return <Card userData={items} key={items.id} />
          })
        }
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-light border px-4"
            style={{marginRight:"8px"}}
            onClick={counter > 0 ? prev : null}
          >
            Prev
          </button>
          <button
            className="btn btn-light border px-4"
            onClick={next}
          >
            Next
          </button>
          <Modal show={openModal} onHide={()=>setModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                New Comment
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={insertComment}>
                <div className="mb-3">
                  <label className="mb-1">Title</label>
                  <input className="form-control" type="text" name="title" />
                </div>
                <div className="mb-3">
                  <label className="mb-1">Description</label>
                  <textarea rows="3" className="form-control" type="text" name="body">
                  </textarea>
                </div>
                <button className="btn btn-primary">Submit</button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
  return design;
}

export default Http;
