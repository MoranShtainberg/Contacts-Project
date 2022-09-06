import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function ContactItem( { singleContact, deleteContact } ) {
    const navigate = useNavigate();

    return (
        <div>         
                
            <div className="contact" onClick={ ()=> navigate(`/contacts/${singleContact.id}`)}>
					<div className="contact-avatar">
						<img src={singleContact.pic} alt="contactPic"/>
					</div>
                    
					<div className="contact-details">
						<div className="contact-name">{singleContact.fullName} </div>
						<div className="contact-phone">{singleContact.phone}</div>
					</div>

					<div className="contact-buttons">
						<button>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                        </button>
					</div>

                    {/* add random contact */}
					<div className="contact-button-close">
						<i className="fa fa-times" aria-hidden="true"  onClick={ ()=> deleteContact(singleContact.id) }></i>
					</div>
			</div>
            
        </div>
    )
}
