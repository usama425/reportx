import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
const SendBulkEmail = ({ emailArray, modalBulkEmail, bulkModal }) => {

    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const sendEMail = () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "emails": emailArray,
            "subject": subject,
            "message": message
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://apis.reportsxapis.com/api/send_bulk_email", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === "200") {
                    toast.success("Email sent successfully")
                    setLoading(false)
                }
                else if (result.status === "401") {
                    toast.warn("something went wrong...")
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error(error)
                toast.warn("Try again later")
                setLoading(false)
            });
    }

    return (
        <div>
            <Modal
                show={modalBulkEmail}
                onHide={bulkModal}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Subject</label>
                            <input type="text" className="form-control" onChange={(e) => setSubject(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>


                        <div className='col-lg-12'>
                            <label htmlFor="exampleInputEmail1" className="form-label">Body</label>
                            <textarea type="text" className="form-control" onChange={(e) => setMessage(e.target.value)} rows={5} aria-describedby="emailHelp" />

                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading === true ? (
                            <>
                            <Button variant="outline-success"><i className='fa fa-solid fa-spin fa-spinner'/></Button>
                            </>
                        ) : (
                            <>
                            <Button onClick={sendEMail} variant="outline-success">Send Email</Button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SendBulkEmail