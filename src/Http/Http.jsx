import {
    useState,
    useEffect
} from "react";
import $ from "jquery";


const Http = ()=>{
  const [data,setData] = useState([]);
  const [counter,setCounter] = useState(0);
  const [animation,setAnimation] = useState("animate__animated animate__fadeIn");

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
      }
    });
  }

  useEffect(()=>{
    fetchDataById();
  },[counter]);

  const Card = (data)=>{
    const design = (
      <>
        <div className={"card mb-4 "+animation}>
          <div className="card-header text-capitalize">
            {data.userData.title}
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
          <h1 className="m-0 p-0 display-4">Comments -  <small>{counter}</small></h1>
          <button className="btn btn-success">New Comment</button>
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
            onClick={counter > 0 ? ()=>(setCounter(counter-1),setAnimation("animate__animated animate__slideInRight")) : null}
          >
            Prev
          </button>
          <button
            className="btn btn-light border px-4"
            onClick={()=>(setCounter(counter+1),setAnimation("animate__animated animate__slideInLeft"))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
  return design;
}

export default Http;
