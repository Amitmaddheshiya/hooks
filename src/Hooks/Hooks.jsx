import { useState, useEffect } from "react";
import $ from "jquery";

//hooks
const Hooks = () => {
    const [data,setData] = useState([]);
    const [start,setStart] = useState(0);
    const [loader,setLoader] = useState(false);

//ajax request
const getRequest = ()=>{
$.ajax({
type: "GET",
 url: `https://jsonplaceholder.typicode.com/photos?_start={start}&_limit=16`,
 beforeSend : function(){
 return setLoader(true);
 },
success: function(response){
response.map((items)=>{
return setData((oldData)=>{
return [
    ...oldData,
    items
     ]
       });
    })
    },
    completed : function(){
        return setLoader(false);
         }
 });
}

//infiniteScroll
const infiniteScroll = ()=>{
    window.onscroll = ()=>{
     let windowS =  (window.innerHeight+window.scrollY);   
     let bodyHeight = (document.body.offsetHeight-80);
     if(windowS >= bodyHeight){
        return setStart(start+16);
     }
    }
}


//loader
const Loader = ()=>{
const loaderDesign = (
    <>
<div className="d-flex justify-content-center my-5">
<div className="spinner-border text-muted" style={{marginRight:"8px"}}></div>
<div className="spinner-border text-primary"></div>
<div className="spinner-border text-success"></div>
<div className="spinner-border text-info"></div>
<div className="spinner-border text-warning"></div>
<div className="spinner-border text-danger"></div>
<div className="spinner-border text-secondary"></div>
<div className="spinner-border text-dark"></div>
<div className="spinner-border text-light"></div>    
</div>  
    </>
);
return loaderDesign;
}

//useEffect hook
    useEffect(()=>{
        getRequest();
        infiniteScroll();
    },[start]);

//downloadNow
const downloadNow = (data)=>{
    const url = data.url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "pic_"+data.id+".png";
    a.click();
    a.remove();
}

//column create by map
const Column = (data)=>{
 const colDesign = (
    <>
   <div className="col-md-3 mb-3">
    <div className="card">
    <img src={data.data.url} alt="img" width="100%" className="card-img-top" />  
    <div className="card-body">
     <p>{data.data.title}</p>   
     <button className="btn btn-primary px-3 py-1" onClick={()=>downloadNow(data)}>Download</button>
    </div>
    </div>
    </div> 
    </>
 );
 return colDesign;
}

    const design = (
        <>
    <div className="container py-4">
    <h1>Loader infinite scroll</h1>  
    <hr />
    <div className="row">
    {
    data.map((items)=>{
    return <Column data={items} key={items.id} />
    })
    }
    </div> 
    {
        loader ? <Loader /> : null
    }
    </div>
        </>
    );
    return design;
};
export default Hooks;
