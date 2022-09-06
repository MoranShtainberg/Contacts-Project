import React from 'react'
import { useEffect, useState } from 'react';
import ContactItem from './ContactItem';
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();

    const [arr, setArr] = useState([]);
    const [update, setApdate] = useState(false);
    const [valueToSearch, setValueToSearch] = useState("")
    
    //-------------------useEffect-----------
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:1000/api/get_all");
                const data = await res.json();
                console.log("-----data, in useEffect-----"); 
                console.log(data);
                
                setArr(data);

            } catch (error) {
                console.log(error);
            }
        })();
    }, [update]);
   
 
    //-------------------delete-----------
    const deleteContact = async (id)=> {
        const res = await fetch("http://localhost:1000/api/delete_user", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {"content-type":"application/json"}
        });

        if(res.status === 200){
            setApdate(!update);
        };
    };
    //-------------------search-----------

    const filterArrFunc = ()=>{
        let filterArr = arr.filter( el => el.concat.toLocaleUpperCase().includes(valueToSearch.toLocaleUpperCase()));
        setArr(filterArr);
    }
    //-------------------add Random Contact-----------
    const addRandomContact = async ()=> {
        const resRadom = await fetch("https://randomuser.me/api");
        const dataRandom = await  resRadom.json();
        console.log("---dataRandom---");
        console.log(dataRandom);
        //results[0].name.first    results[0].name.last    results[0].name.title  results[0].phone   results[0].picture.large
        // console.log(dataRandom.results[0].name.first);
        // console.log(dataRandom.results[0].name.last);
        let fullName = dataRandom.results[0].name.first + " " +dataRandom.results[0].name.last;   
        let phone = dataRandom.results[0].phone;        
        let title = dataRandom.results[0].name.title;
        let pic = dataRandom.results[0].picture.large;

        const res = await fetch("http://localhost:1000/api/create", {
            method: "POST",
            body: JSON.stringify({ fullName , phone, title, pic }),
            headers: {"content-type":"application/json"}
        });

        setApdate(!update); 
    }
    //-------------------return-----------
    return (
        <div className="contact-container">
               
            <div className="search-input">
                <input type="text" id="search-input-id" placeholder="search in contacts..." onChange={e=> setValueToSearch(e.target.value)} />
                <div className="search-icon" onClick={filterArrFunc}>
                    <i className="fa fa-search" aria-hidden="true" style={{cursor: "pointer"}}></i>
                </div>                
            </div>

            {arr.map(singleContact => <ContactItem singleContact={singleContact}                                                  
                                                   deleteContact={deleteContact}
                                                   key ={singleContact.id}/> )}    
                      
            <div className="contact-new">
                {/* navigate to form - add new contact */}
				<button onClick={()=> navigate('/contacts/new')}>
					<i className="fa fa-user-plus" aria-hidden="true"></i>
				</button>         

                {/*  add random contact */}
				<button onClick={addRandomContact}>
					<i className="fa fa-random" ></i>
				</button>
			</div>	

        </div>
    )
}
