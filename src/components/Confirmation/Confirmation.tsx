import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css'

function Confirmation() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Start countdown at 5 seconds

    // Redirect to homepage after 5 seconds
    useEffect(() => {
        // Set up the countdown interval
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Navigate to home when countdown reaches 0
        if (countdown === 0) {
            navigate('/');
        }

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [countdown, navigate]);

    return (
        <div className="confirmation-container">
            <h1>Thank you</h1>
            <p>Your report has been submitted. You will be redirected to the home page in {countdown} seconds.</p>
            <p id='confirmation-link'>If not, click <a href='/'>here</a></p>
        </div>
    );
}

export default Confirmation;