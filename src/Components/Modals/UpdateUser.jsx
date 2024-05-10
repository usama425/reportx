import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UpdateUser = ({ userId, modalClose, modalShow }) => {

    const [email, setEmail] = useState(userId?.email)
    const [gender, setGender] = useState(userId?.gender)
    const [name, setName] = useState(userId?.name)
    const [dob, setDob] = useState(userId?.dob)
    const [country, setCountry] = useState(userId?.country)
    const [goal, setGoal] = useState(userId?.goal)
    const [age, setAge] = useState(userId?.age)

    const updateData = () => {
        if (email === "" || gender === "" || name === "" || dob === "" || country === "" || goal === "" || age === "") {
            toast.warn("Please fill all fields")
        }
        else {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("gender", gender);
            formdata.append("name", name);
            formdata.append("dob", dob);
            formdata.append("country", country);
            formdata.append("goal", goal);
            formdata.append("age", age);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch(`https://apis.reportsxapis.com/api/update_general_data_by_id/${userId?.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === "200") {
                        toast.success("User updated successfully")
                        setInterval(() => {
                            window.location.reload()
                        }, 1500);
                    }
                    else if (result.status === "401") {
                        toast.warn(result.message)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    toast.danger("Something went wrong...")
                });
        }
    }

    return (
        <div>
            <Modal
                show={modalShow}
                onHide={modalClose}
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
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                            <input type="text" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                            <input type="text" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label" >Gender</label>
                            <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Goal</label>
                            <input type="text" className="form-control" value={goal} onChange={(e) => setGoal(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-6 mb-1 mt-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                            <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateData} variant="outline-success">Update User</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateUser