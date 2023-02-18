import React,{useRef,useEffect,useState, useContext} from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import {StateContext} from '../context/provider';
import axios from "axios"
export default function TopBar() {
    let url = useLocation();
    const topbarRef = useRef()
    const [scrollUp,setScrollUp] = useState(true)
    const [beforeScroll, setbeforeScroll] = useState(0)
    const [searchKey, setsearchKey] = useState('');
    const {
            setisSearching, 
            setsearchResult} = useContext(StateContext)
    

   
	window.addEventListener('scroll', function(e){
		const scrolled = window.scrollY;
		if(beforeScroll > scrolled){
            setScrollUp(true)
            setbeforeScroll(scrolled);
		}
		else{
            setbeforeScroll(scrolled)
			setScrollUp(false)
		}
	})
    
    useEffect(()=>{
        console.log(topbarRef.current.style.width, 'hi dear')
    },[''])
    useEffect(()=>{
        if(searchKey){
            if(searchKey.length > 3){
                axios.post("http://localhost:3300/user/search",{keyword:searchKey})
                .then((res)=> setsearchResult(res.data))
            }
            setisSearching(true)
        }else{
            setisSearching(false)
        }
    },[searchKey])

    const handleChange = (event)=>{
        setsearchKey(event.target.value)
    }
    
    return (
        <div 
        style={url.pathname == "/main/profile" ? 
        {display:"none"} : {display:"block"}} 
        ref={topbarRef} className="topbar">
            <div className="top-bar-search">
                <input
                onChange={(e)=> handleChange(e)} type="text" placeholder="looking for something..."/>
                <div className="top-search-icon">
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
            <div 
            style={
                scrollUp ?{display:"flex"}  : {display:"none"}}
            className="top-bar-toggle">
                <div>
                    <button className="toggle-btn-active">Academia</button> 
                    <button>General</button>
                </div>
            </div>
        </div>
    )
}
