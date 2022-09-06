import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactDOM from "react-dom";

export default function Form() {
    const navigate = useNavigate();

    let location = useLocation();
    console.log("location: --- ");  console.log(location);
    const path = location.pathname;
    console.log("path: --- "); console.log(path);
    console.log(path.split("/")[2]);
    let pathValue = path.split("/")[2];
    console.log("pathValue: " + pathValue);    
  
    // useState
    const [fullName, setfullName]  = useState("");
    const [phone, setPhone]        = useState("");
    const [title, setTitle]        = useState("Mr");
    //const [pic, setPic]            = useState("");
    const [srcString, setSrcString]=useState("");

    //-------------------useEffect-----------
       useEffect(() => {
        (async () => {
            try {
                if(pathValue == "new") setSrcString(`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*99)}.jpg`);

                if (pathValue !== "new") {                    
                    const res = await fetch(`http://localhost:1000/api/get_all/${pathValue}`);
                    const data = await res.json();
                    console.log("-----data, in useEffect-----"); 
                    console.log(data);               
                    
                    if (data.length == 1) {
                        setfullName(data[0].fullName);
                        setPhone(data[0].phone);
                        setTitle(data[0].title);
                        setSrcString(data[0].pic);
                    } else{
                        document.getElementById("name-id").setAttribute("disabled", true);
                        document.getElementById("phone-id").setAttribute("disabled", true);
                        document.getElementById("title-id").setAttribute("disabled", true);
                        document.getElementById("save-btn-id").setAttribute("disabled", true);                          
                        document.getElementById("contact-msg-id").textContent = "The contact does not exist";
                    };
                };

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
            
    //-------------------create-----------
    const createNewContact = async (fullName, phone, title, srcString)=> {
        const res = await fetch("http://localhost:1000/api/create", {
            method: "POST",
            body: JSON.stringify({ fullName, phone, title, pic: srcString }),
            headers: {"content-type":"application/json"}
        });

        navigate('/contacts');        
    };
    //-------------------update-----------
    const updateContact = async (fullName, phone, title, id)=> {
            const res = await fetch("http://localhost:1000/api/update", {
                method: "POST",
                body: JSON.stringify({ fullName, phone, title, id , pic: srcString}),
                headers: {"content-type":"application/json"}
            });           
    };
    //-------------------handleClickSave-----------
    const handleClickSave = ()=>{
        if (fullName.length > 30) return alert("The number of characters should not exceed 30");

        if(pathValue == "new") {
            createNewContact(fullName, phone, title, srcString);
        } else{
            updateContact(fullName, phone, title, pathValue);
        };
        navigate('/contacts');
    };

    //-------------------srcHandler---------------
    const srcHandler = ()=> {
        if (title == "Mr") {            
            setSrcString(`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*99)}.jpg`);
        } else{
            setSrcString(`https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*99)}.jpg`);
        }
    };

    //-------------------return-----------
    return (
        <div className="contact-container">

            <div className="new-contact-container">
                <div className="new-contact-avatar">
                    {/* "https://randomuser.me/api/portraits/men/82.jpg" */}
                    <img src={srcString} />
                    <button onClick={srcHandler}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="new-contact-inputs">
                    <div className="new-contact-input">
                        <label>Name</label>
                        <input value={fullName} id="name-id" onChange={e=> setfullName(e.target.value)}/>
                    </div>

                    <div className="new-contact-input">
                        <label>Phone</label>
                        <input value={phone} id="phone-id" onChange={e=> setPhone(e.target.value)}/>
                    </div>

                    <div className="new-contact-input">
                        <label>Title</label>
                        <select value={title} id="title-id" onChange={e=> setTitle(e.target.value) }>
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
                        </select>
                    </div>
                </div>

                <div className="new-contact-buttons">
                    <button className="button-ok" id='save-btn-id' onClick={handleClickSave}>
                        Save
                    </button>

                    <button className="button-cancel" onClick={ ()=> navigate('/contacts')}>
                        Cancel
                    </button>
                </div>

                <h1 style={{color: "red"}} id="contact-msg-id"></h1>
            </div>

        </div>
    )
}
