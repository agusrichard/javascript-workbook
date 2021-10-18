import React, { useState } from 'react'
import "./Accomplishment.css"
import ClipLoader from "react-spinners/ClipLoader";
import confetti from "../../svg/confetti.svg"
import axios from "axios"

function Accomplishment() {

    const [title, setTitle] = useState("")
    const [accomplishment, setAccomplishment] = useState("")
    const [valid, setValid] = useState(false);

    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async () => {
        if(!title || !accomplishment || !valid) {
            setErrorMsg("Complete the items above to continue")
            setShowError(true)
            return 
        }
        
        try {
            await axios.post("http://localhost:4000", {
                title,
                accomplishment
            });
        } catch (error) {
            setErrorMsg(error.response.data.msg)
            setShowError(true)
            return
        }

        setShowSuccess(true)
    }

    return (
        <div className="Accomplishment">
            <div className="Accomplishment__heading-container">
                <h2 className="Accomplishment-header">Accomplishment</h2>
            </div>
            <div className="Accomplishment-cards-container">
                {
                    (!loading && !showSuccess) && (
                        <>
                            <input 
                                className="Accomplishment-input" 
                                placeholder="Title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                data-cy="accomplishment-title-input"
                            />
                            <textarea 
                                className="Accomplishment-textarea" 
                                placeholder="My accomplishment..." 
                                value={accomplishment}
                                onChange={(e) => setAccomplishment(e.target.value)}
                                data-cy="accomplishment-input"
                            />
                            <div className="Accomplishment-checkbox-container">
                                <input 
                                    type="checkbox" 
                                    checked={valid} 
                                    onChange={(e) => setValid(e.target.checked)}
                                    data-cy="accomplishment-checkbox"
                                />
                                <p>This accomplishment is valid</p>
                            </div>
                            {
                                showError && (
                                    <div className="Accomplishment-error-container">
                                        <p>{errorMsg}</p>
                                    </div>
                                )
                            }
                            <button className="Accomplishment-btn" onClick={handleSubmit}>Submit Accomplishment</button>
                        </>
                    )
                }
                {
                    (loading) && (
                        <div className="Accomplishment-spinner-container">
                            <ClipLoader size={150} />
                        </div>
                    )
                }
                {
                    (showSuccess) && (
                        <div>
                            <div className="Accomplishment-spinner-container">
                                <img src={confetti} className="Accomplishment-img"/> 
                                <h1>This Accomplisment was Successfully Submitted</h1> 
                            </div>
                            <button className="Accomplishment-btn" onClick={() => {
                                setShowSuccess(false);
                                setTitle("")
                                setAccomplishment("")
                                setValid(false);
                                setShowError(false)
                            }}>Go Back</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Accomplishment
