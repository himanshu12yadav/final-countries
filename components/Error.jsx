import {useRouteError} from "react-router-dom";

export default function Error() {
    const {status, statusText, data} = useRouteError();

    return (
        <div className="error-container" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{
                fontSize: '6rem',
                color: '#dc3545',
                margin: '0'
            }}>{status}</h1>
            <h2 style={{
                fontSize: '2rem',
                color: '#343a40',
                marginBottom: '20px'
            }}>{statusText}</h2>
            <p style={{
                fontSize: '1.2rem',
                color: '#6c757d',
                maxWidth: '500px',
                marginBottom: '30px'
            }}> {data || "The page you're looking for doesn't exist or has been moved."}</p>
            <button
                onClick={() => window.history.back()}
                style={{
                    padding: '10px 20px',
                    fontSize: '1.1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Go Back
            </button>
        </div>
    )
}
