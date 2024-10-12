import { useState, useEffect } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";

export default function List() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        boardingLocation: '',
        destinationLocation: '',
        travelDate: '',
    });
    const [filteredFlights, setFilteredFlights] = useState([]);

    useEffect(() => {
        fetchAllFlights();
    }, []);

    useEffect(() => {
        setFilteredFlights(flights);
    }, [flights]);

    const fetchAllFlights = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await http.get('/flights');
            setFlights(res.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
            setError("Failed to load flights. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const deleteFlight = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this flight?");
        if (confirmed) {
            try {
                await http.delete(`/flights/${id}`);
                fetchAllFlights();
            } catch (error) {
                console.error("Error deleting flight:", error);
                setError("Failed to delete flight. Please try again.");
            }
        }
    };

    const handleSearch = () => {
        const { boardingLocation, destinationLocation, travelDate } = filters;
        const results = flights.filter(flight => {
            const matchesBoarding = flight.takeoff_location.toLowerCase().includes(boardingLocation.toLowerCase());
            const matchesDestination = flight.landing_location.toLowerCase().includes(destinationLocation.toLowerCase());
            const matchesDate = travelDate ? flight.operating_days.includes(travelDate) : true;

            return matchesBoarding && matchesDestination && matchesDate;
        });
        setFilteredFlights(results);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    if (loading) {
        return <div>Loading flights...</div>;
    }

    return (
        <div>
            <h2>Flights Listing</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            {/* Search Form */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <input
                    type="text"
                    name="boardingLocation"
                    placeholder="Boarding Location"
                    value={filters.boardingLocation}
                    onChange={handleChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="destinationLocation"
                    placeholder="Destination Location"
                    value={filters.destinationLocation}
                    onChange={handleChange}
                    className="form-control mb-2  mx-2"
                />
                <input
                    type="text"
                    name="travelDate"
                    value={filters.travelDate}
                    onChange={handleChange}
                    className="form-control mb-2 mx-2"
                    placeholder="monday,tuesday"
                />
                <button onClick={handleSearch} className="btn btn-primary mx-3 mb-3">Search</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Sno.</th>
                        <th>Flight Name</th>
                        <th>Takeoff Location</th>
                        <th>Landing Location</th>
                        <th>Operating Days</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFlights.length > 0 ? (
                        filteredFlights.map((flight, index) => (
                            <tr key={flight.id}>
                                <td>{index + 1}</td>
                                <td>{flight.flight_name}</td>
                                <td>{flight.takeoff_location}</td>
                                <td>{flight.landing_location}</td>
                                <td>{flight.operating_days}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit/${flight.id}`}>Edit</Link>
                                    <button className="btn btn-danger" onClick={() => deleteFlight(flight.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No flights found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
