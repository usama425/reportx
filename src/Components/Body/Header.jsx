import React from 'react'
import './HeaderStyles.scss'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    // const navigate = useNavigate();

    // const logOut = async () => {
    //     let login = await localStorage.setItem('Count_me-in', false);
    //     if (login === false) {
    //         navigate('/')
    //         setInterval(() => {
    //             window.location.reload(true)
    //         }, 1500);
    //     }
    // }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-nav">
                <div className="container-fluid">
                    <a className="navbar-brand title-text text-white" href="#"> <i className='fa-solid fa-envelopes-bulk' /></a>
                    {/* <i  className='fa fa-solid fa-right-from-bracket' /> */}
                </div>
            </nav>

        </div>
    )
}

export default Header