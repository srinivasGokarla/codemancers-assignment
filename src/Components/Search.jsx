
import {useState } from "react";
import Axios from 'axios';
import './Search.css';


function Search() {

const Api_key="bGZb4wkTu2LcNXId5AfpIWHcCOQZE0py";
const Base_Url = "http://api.giphy.com/v1/gifs/search";

const [searchText,setSearchText] = useState("");
const [searchGif,setSearchGif] = useState("");
const [selectedGif, setSelectedGif] = useState("");

const [addText,setAddText] = useState([]);
const [gifs,setGifs] = useState([]);


const postValue = ()=>{

  const addData = {
    id:Date.now(),
    name:searchText,
    gifUrl: selectedGif
  }
  console.log(addData);
  setAddText([...addText,addData])
  setSearchText("");
  
  gifResponse();

 
}

const gifResponse = async()=>{
  const response = await Axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${Api_key}&q=${searchGif}`)
  
    setGifs(response.data.data);
   console.log(response.data.data)
 }

  return (
    <div  className="search">
          <input
            type="text"
            placeholder="Search Gif..."
            value={searchGif}
            onChange={(e)=>setSearchGif(e.target.value)}
          />
          <button  onClick={postValue}>POST & SEARCH</button>
         
       
        <div className="gif-item">
        {
          gifs.map((gif,index)=>{
            return <img src={gif.images.fixed_height.url} alt="" key={"gif-"+index} onClick={() => setSelectedGif(gif.images.fixed_height.url)} />
          })
        }
        </div>
        
      </div>
  
  );
}

export default Search;