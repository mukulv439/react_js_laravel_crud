import { useState, useEffect } from "react";
import http from "../../http";
import { Link } from "react-router-dom";

export default function Home() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchAllFlights();
    }, []);

    const fetchAllFlights = () => {
        http.get('/flights').then(res => {
            setFlights(res.data);
        }).catch(error => {
            console.error("Error fetching flights:", error);
            // Optionally handle error (e.g., show notification)
        });
    }

    const deleteFlight = (id) => {
        http.delete(`/flights/${id}`).then(res => {
            fetchAllFlights();
        }).catch(error => {
            console.error("Error deleting flight:", error);
            // Optionally handle error (e.g., show notification)
        });
    }

    return (
        <div>
            <h2>Flights Listing</h2>
            <div className="d-flex justify-content-end align-items-end">
            <button type="button" className="btn btn-primary"
                                    >
                                 <Link className="btn btn-primary" to={`/admin/create`}>Add Flight</Link>&nbsp;
                                </button>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sno.</th>
                        <th>Flight Name</th>
                        <th>Takeoff Location</th>
                        <th>Landing Location</th>
                        <th>Operating Days</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {flights?.map((flight, index) => (
                        <tr key={flight.id}>
                            <td>{index + 1}</td>
                            <td>{flight.flight_name}</td>
                            <td>{flight.takeoff_location}</td>
                            <td>{flight.landing_location}</td>
                            <td>{flight.operating_days}</td>
                            <td>
                                <Link className="btn btn-info" to={`/admin/edit/${flight.id}`}>Edit</Link>&nbsp;
                                <Link className="btn btn-primary" to={`/admin/view/${flight.id}`}>View</Link>&nbsp;
                                <button type="button" className="btn btn-danger"
                                    onClick={() => { deleteFlight(flight.id) }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
