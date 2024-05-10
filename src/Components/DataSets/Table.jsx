import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import UpdateUser from '../Modals/UpdateUser';
import SendBulkEmail from '../Modals/SendBulkEmail';
import countries from '../SourceFiles/CountriesList';
import goals from '../SourceFiles/GoalsList';
import numbers from '../SourceFiles/CountList';
toast.configure();

const Table = () => {

    const [data, setData] = useState([])
    const [filteredTable, setFilteredTable] = useState([])
    const [genderCount, setGenderCount] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [modalBulkEmail, setModalBulkEmail] = useState(false);
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState('');
    const [userId, setUserId] = useState(null)
    const resultsPerPage = 50;

    const handleNextPage = () => {
        setPages((prevPage) => prevPage + 1);
    };
    const handlePrevPage = () => {
        setPages((prevPage) => Math.max(prevPage - 1, 1));
    };
    const totalResults = count || 0;
    const startResult = (pages - 1) * resultsPerPage + 1;
    const endResult = Math.min(pages * resultsPerPage, totalResults);

    const emailArray = filteredTable?.map(item => (item.email));

    useEffect(() => {
        getData()
    }, [])

    const getData = (e, attr) => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer 8|JE5SHg4ESU5vBkiwpdGp4Fzli7dpulcsrlLbfVPz18b952af");
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjI2ekFNNFlhVEZOSWlqazhoUUZpQ1E9PSIsInZhbHVlIjoiSklCdUpHTkUvUURnTDBwTmVkWi9obFpwQ202eUZwMFhmNFcyQkh0LzlFNnRJR1JmTk5UV1JvTE1VdlV5QmI5OUVMT1VsaFRVcU82V2lNMkI2dy9yTkY5WTVwaWZrUjd1ZkxBRDZaNmtrQ2IvY2FvUFFtaHJVVVNTQTdkV0VucVMiLCJtYWMiOiI2NGZhMmFmOTUyOGMwYWFjNjkzY2VlNDJiODBkNDljNmU0YTVlZDNmNDJhMWYxMGFmNDIwYWQ4OGFmZjMwMDE0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjRmL0pjbGh0K3JFaG1PeElDOTZqU3c9PSIsInZhbHVlIjoiYVk5TXRBUFF6RVdEeFhZN2VUWGxNeXphbWtlbjZFZWFIREp5Q05MOElpMFNrckMySUcwbGVxcFhWdmNZSmduUHJnWHh0R3ZoZXV0UXV2L1hNM1A1U3ZLWjZUaS90V2pyNFAwbXJCRldVeC9meDR4ODI1SHpqN1g4TWpBMFNLRWkiLCJtYWMiOiI4NDRjYjQ4ZDQ1YjE2NjM3ZDQ3OWQ2NzQyZjY5NDM0NTJlY2E0ZWE4NzM3N2YwMWJkZjk1Njk2Y2NlOTZiYjE3IiwidGFnIjoiIn0%3D");

        const fromAge = document.getElementById("fromAge").value;
        const toAge = document.getElementById("toAge").value;
        const country = document.getElementById("country").value;
        const gender = document.getElementById("gender").value;
        const goal = document.getElementById("goal").value;
        const appno = document.getElementById("appno").value;


        const formdata = new FormData();
        if (fromAge && toAge) {
            const ageRange = `${fromAge}-${toAge}`;
            formdata.append("age_range", ageRange);
        }

        if (country) {
            formdata.append("country", country);
        }

        if (gender) {
            formdata.append("gender", gender);
        }

        if (goal) {
            formdata.append("goal", goal);
        }

        if (appno) {
            formdata.append("appno", appno);
        }

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: formdata,
        };

        fetch(`https://apis.reportsxapis.com/api/get_general_data?page=${pages}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                setData(result.data)
                setCount(result.total_count)
                setFilteredTable(result.data)
                setGenderCount(result.data)
                console.log(result.data)
            })
            .catch((error) => console.error(error));
    }

    const deleteUser = (id) => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`https://apis.reportsxapis.com/api/delete_general_data_by_id/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.status === "200") {
                    toast.success("User deleted successfully")
                    setInterval(() => {
                        window.location.reload()
                    }, 1500);
                }
                else if (result?.status === "401") {
                    toast.warn(result?.message)
                }
            })
            .catch((error) => {
                console.error(error)
                toast.danger("Something went wrong...")
            });
    }

    const exportAllData = () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer 8|JE5SHg4ESU5vBkiwpdGp4Fzli7dpulcsrlLbfVPz18b952af");
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjI2ekFNNFlhVEZOSWlqazhoUUZpQ1E9PSIsInZhbHVlIjoiSklCdUpHTkUvUURnTDBwTmVkWi9obFpwQ202eUZwMFhmNFcyQkh0LzlFNnRJR1JmTk5UV1JvTE1VdlV5QmI5OUVMT1VsaFRVcU82V2lNMkI2dy9yTkY5WTVwaWZrUjd1ZkxBRDZaNmtrQ2IvY2FvUFFtaHJVVVNTQTdkV0VucVMiLCJtYWMiOiI2NGZhMmFmOTUyOGMwYWFjNjkzY2VlNDJiODBkNDljNmU0YTVlZDNmNDJhMWYxMGFmNDIwYWQ4OGFmZjMwMDE0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjRmL0pjbGh0K3JFaG1PeElDOTZqU3c9PSIsInZhbHVlIjoiYVk5TXRBUFF6RVdEeFhZN2VUWGxNeXphbWtlbjZFZWFIREp5Q05MOElpMFNrckMySUcwbGVxcFhWdmNZSmduUHJnWHh0R3ZoZXV0UXV2L1hNM1A1U3ZLWjZUaS90V2pyNFAwbXJCRldVeC9meDR4ODI1SHpqN1g4TWpBMFNLRWkiLCJtYWMiOiI4NDRjYjQ4ZDQ1YjE2NjM3ZDQ3OWQ2NzQyZjY5NDM0NTJlY2E0ZWE4NzM3N2YwMWJkZjk1Njk2Y2NlOTZiYjE3IiwidGFnIjoiIn0%3D");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`https://apis.reportsxapis.com/api/get_general_data`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                exportCSV(result.data)
                setLoading(false)
            })
            .catch((error) => console.error(error));
    }

    const exportCSV = (data) => {
        const filteredData = data.map(({ id, Idate, created_at, updated_at, ...rest }) => rest);
        const columnOrder = ['email', 'name', 'dob', 'age', 'gender', 'goal', 'country'];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [columnOrder.join(',')].concat(
                filteredData.map((item) => columnOrder.map((key) => item[key]).join(","))
            ).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    };

    const exportFilteredCSV = () => {
        const filteredData = filteredTable.map(({ Idate, created_at, updated_at, ...rest }) => rest);
        const columnOrder = ['email', 'name', 'dob', 'age', 'gender', 'goal', 'country'];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [columnOrder.join(',')].concat(
                filteredData.map((item) => columnOrder.map((key) => item[key]).join(","))
            ).join("\n");


        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    };

    const modalClose = (items) => {
        setModalShow((prev) => !prev)
        setUserId(items)
    }

    const bulkModal = (items) => {
        setModalBulkEmail((prev) => !prev)
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-lg-5">
                        <div className="card-body">
                            <h3 className="card-title">Report <i className='fa-thin fa-x' /></h3>
                            <p className="card-text">Efficiently send multiple emails at once with our website, <br /> streamlining communication and saving you valuable time and effort.</p>


                            <div className="accordion" id="accordionExample">

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Analytics
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">

                                            {/* <div className='table-responsive' >
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>App No.</th>
                                                            <th>Gender</th>
                                                            <th>Goal</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr>
                                                            <td>{genderCount.filter((x) => x.appno === "1").length}</td>
                                                            <td>{genderCount.filter((x) => x.gender === "male" || x.gender === "Male").length}</td>
                                                            <td>{genderCount.filter((x) => x.goal === "To Enlarge profile photos").length}</td>
                                                        </tr>
                                                    </tbody>

                                                </table>
                                            </div> */}

                                            <div className='row'>
                                                <div className='col-lg-3'>
                                                    <h3>Gender:</h3>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>Gender Male </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.gender === "male" || x.gender === "Male").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>Gender Female </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.gender === "female" || x.gender === "Female").length}</span>
                                                    </div>
                                                </div>

                                                <div className='col-lg-3'>
                                                    <h3>Goals:</h3>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>To detect my Blockers </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.goal === "To detect my Blockers").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>To see my lost followers </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.goal === "To see my lost followers").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>To Massunfollow </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.goal === "To Massunfollow").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>To watch Stories Anon </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.goal === "To watch Stories Anon").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>To Enlarge profile photos </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.goal === "To Enlarge profile photos").length}</span>
                                                    </div>
                                                </div>

                                                <div className='col-lg-3'>
                                                    <h3>App No.</h3>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>App #1 </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.appno === "1").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>App #2 </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.appno === "2").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>App #3 </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.appno === "3").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>App #4 </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.appno === "4").length}</span>
                                                    </div>
                                                    <div className='m-0 p-0  d-flex justify-content-between align-items-baseline'>
                                                        <p className='m-0 p-0' style={{ fontSize: "18px" }}>App #5 </p>
                                                        <span style={{ fontWeight: 700, fontSize: "26px" }}>{genderCount.filter((x) => x.appno === "5").length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <a className="btn btn-outline-success mt-2 mb-3" onClick={exportAllData}>Export All CSVs</a>
                            <a className="btn btn-outline-success mt-2 mb-3 ms-2" onClick={exportFilteredCSV}>Export Filtered CSVs</a>
                            <a className="btn btn-outline-secondary mt-2 mb-3 ms-2" onClick={bulkModal} >Send Email</a>

                            <div className='row mx-auto'>
                                <div className='col-lg-2 p-0 m-0' >
                                    <div className='d-flex'>
                                        <input className='form-control' id='fromAge' onChange={(e) => getData(e, "fromAge")} placeholder='From Age' style={{ borderRadius: "15px 0px 0px 15px", borderRight: "none" }} type="number" />
                                        <input className='form-control' id='toAge' onChange={(e) => getData(e, "toAge")} placeholder='To Age' style={{ borderRadius: "0px 15px 15px 0px", borderLeft: "none" }} type="number" />
                                    </div>

                                </div>
                                <div className='col-lg-2 p-0 m-0' >
                                    <select className="form-select" id="appno" onChange={(e) => getData(e, "number")} style={{ borderRadius: "15px" }} aria-label="Default select example">
                                        <option value="">Select App No.</option>
                                        {
                                            numbers.map((numbers) => {
                                                return (
                                                    <>
                                                        <option value={numbers.count}>{numbers.count}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-lg-2 p-0 m-0' >
                                    <select className="form-select" id="gender" onChange={(e) => getData(e, "gender")} style={{ borderRadius: "15px" }} aria-label="Default select example">
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className='col-lg-2 p-0 m-0' >

                                    <select className="form-select" id="goal" onChange={(e) => getData(e, "goal")} style={{ borderRadius: "15px" }} aria-label="Default select example">
                                        <option value="">Select Goals</option>
                                        {
                                            goals.map((goal, index) => {
                                                return (
                                                    <option value={goal.goal} key={index}>{goal.goal}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className='col-lg-2 p-0 m-0' >

                                    <select className="form-select" id="country" onChange={(e) => getData(e, "country")} style={{ borderRadius: "15px" }} aria-label="Default select example">
                                        <option value="">Select Country</option>
                                        {
                                            countries.map((earth, index) => {
                                                return (
                                                    <option value={earth.country} key={index}>{earth.country}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            {
                                data.length === 0 ? (
                                    <>
                                        <h1 className='d-flex justify-content-center align-items-center vh-100'>No Data Found</h1>
                                    </>
                                ) :
                                    loading === true ? (
                                        <div className='row'>
                                            <div className='col-lg-12'>
                                                <div className="d-flex justify-content-center align-items-center vh-100">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        <div className='table-responsive' >
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th># id</th>
                                                        <th># App</th>
                                                        <th>Email</th>
                                                        <th>Full Name</th>
                                                        <th>Date of Birth</th>
                                                        <th>Age</th>
                                                        <th>Gender</th>
                                                        <th>Goal</th>
                                                        <th>Country</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data?.map((items) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{items?.id}</td>
                                                                        <td>{items?.appno}</td>
                                                                        <td>{items?.email}</td>
                                                                        <td>{items?.name}</td>
                                                                        <td>{items?.dob}</td>
                                                                        <td>{items?.age}</td>
                                                                        <td>{items?.gender}</td>
                                                                        <td>{items?.goal}</td>
                                                                        <td>{items?.country}</td>
                                                                        <td><button className='btn btn-outline-success' onClick={() => modalClose(items)}><i className='fa fa-solid fa-marker' /></button></td>
                                                                        <td><button className='btn btn-outline-danger' onClick={() => deleteUser(items?.id)}><i className='fa fa-solid fa-trash' /></button></td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </tbody>

                                            </table>
                                        </div>
                                    )
                            }
                            <div>
                                <div className=" mt-5">
                                    <button className="btn btn-outline-success btn-sm" style={{ cursor: "pointer" }} onClick={handlePrevPage} disabled={pages === 1}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-outline-success btn-sm" style={{ cursor: "pointer" }} onClick={handleNextPage} disabled={totalResults <= endResult}>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                    <div>
                                        <p>Showing {startResult} - {count}  results  -  total :&nbsp;&nbsp;{count}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                modalShow === true ? <UpdateUser userId={userId} modalShow={modalShow} modalClose={modalClose} /> : null
                            }

                            {
                                modalBulkEmail === true ? <SendBulkEmail emailArray={emailArray} modalBulkEmail={modalBulkEmail} bulkModal={bulkModal} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Table