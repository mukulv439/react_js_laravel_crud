import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../http";

export default function Create() {
    const navigate = useNavigate();
    const [flight, setFlight] = useState({
        flight_name: '',
        takeoff_location: '',
        landing_location: '',
        operating_days: '',
    });

    const handleChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };

    const submitForm = async () => {
        try {
            await http.post('/flights', flight);
            navigate('/admin');
        } catch (error) {
            console.error("Error creating flight:", error);
            // You might want to handle the error, e.g., show a notification
        }
    };

    return (
        <div>
            <h2>Create New Flight</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label htmlFor="flight_name">Flight Name</label>
                        <input
                            type="text"
                            name="flight_name"
                            value={flight.flight_name}
                            onChange={handleChange}
                            placeholder="Flight Name"
                            className="form-control mb-2"
                            id="flight_name"
                        />

                        <label htmlFor="takeoff_location">Takeoff Location</label>
                        <input
                            type="text"
                            name="takeoff_location"
                            value={flight.takeoff_location}
                            onChange={handleChange}
                            placeholder="Takeoff Location"
                            className="form-control mb-2"
                            id="takeoff_location"
                        />

                        <label htmlFor="landing_location">Landing Location</label>
                        <input
                            type="text"
                            name="landing_location"
                            value={flight.landing_location}
                            onChange={handleChange}
                            placeholder="Landing Location"
                            className="form-control mb-2"
                            id="landing_location"
                        />

                        <label htmlFor="operating_days">Operating Days</label>
                        <input
                            type="text"
                            name="operating_days"
                            value={flight.operating_days}
                            onChange={handleChange}
                            placeholder="Days (e.g. Monday, Wednesday)"
                            className="form-control mb-2"
                            id="operating_days"
                        />

                        <button
                            type="button"
                            onClick={submitForm}
                            className="btn btn-info mt-2"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
