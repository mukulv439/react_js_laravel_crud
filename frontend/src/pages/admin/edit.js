import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";

export default function Edit() {
    const navigate = useNavigate();
    const [flight, setFlight] = useState({
        flight_name: '',
        takeoff_location: '',
        landing_location: '',
        operating_days: '',
    });
    const { id } = useParams();

    useEffect(() => {
        fetchFlight();
    }, []);

    const fetchFlight = () => {
        http.get(`/flights/${id}`).then((res) => {
            setFlight({
                flight_name: res.data.flight_name,
                takeoff_location: res.data.takeoff_location,
                landing_location: res.data.landing_location,
                operating_days: res.data.operating_days,
            });
        }).catch(error => {
            console.error("Error fetching flight:", error);
            // Optionally handle error (e.g., show notification)
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFlight(values => ({ ...values, [name]: value }));
    }

    const submitForm = () => {
        http.put(`/flights/${id}`, flight)
            .then((res) => {
                navigate('/');
            })
            .catch(error => {
                console.error("Error updating flight:", error);
                // Optionally handle error (e.g., show notification)
            });
    }

    return (
        <div>
            <h2>Edit Flight</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Flight Name</label>
                        <input
                            type="text"
                            name="flight_name"
                            className="form-control mb-2"
                            value={flight.flight_name}
                            onChange={handleChange}
                        />

                        <label>Takeoff Location</label>
                        <input
                            type="text"
                            name="takeoff_location"
                            className="form-control mb-2"
                            value={flight.takeoff_location}
                            onChange={handleChange}
                        />

                        <label>Landing Location</label>
                        <input
                            type="text"
                            name="landing_location"
                            className="form-control mb-2"
                            value={flight.landing_location}
                            onChange={handleChange}
                        />

                        <label>Operating Days</label>
                        <input
                            type="text"
                            name="operating_days"
                            className="form-control mb-2"
                            value={flight.operating_days}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            onClick={submitForm}
                            className="btn btn-info mt-2"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
