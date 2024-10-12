import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";

export default function View() {
    const [flight, setFlight] = useState({});
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

    return (
        <div>
            <h2>Flight Details</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Flight Name</h4>
                        <p>{flight.flight_name}</p>
                        <h4>Takeoff Location</h4>
                        <p>{flight.takeoff_location}</p>
                        <h4>Landing Location</h4>
                        <p>{flight.landing_location}</p>
                        <h4>Operating Days</h4>
                        <p>{flight.operating_days}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
