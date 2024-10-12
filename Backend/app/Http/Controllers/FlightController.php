<?php

namespace App\Http\Controllers;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function index()
    {
        return Flight::all();
    }

    // Read a single flight
    public function show($id)
    {
        return Flight::findOrFail($id);
    }

    // Create a new flight
    public function store(Request $request)
    {
        $request->validate([
            'flight_name' => 'required|string|max:255',
            'takeoff_location' => 'required|string|max:255',
            'landing_location' => 'required|string|max:255',
            'operating_days' => 'required|string', // Adjust validation rules as needed
        ]);

        $flight = Flight::create($request->all());
        return response()->json($flight, 201);
    }

    // Update an existing flight
    public function update(Request $request, $id)
    {
        $flight = Flight::findOrFail($id);

        $request->validate([
            'flight_name' => 'sometimes|required|string|max:255',
            'takeoff_location' => 'sometimes|required|string|max:255',
            'landing_location' => 'sometimes|required|string|max:255',
            'operating_days' => 'sometimes|required|string',
        ]);

        $flight->update($request->all());
        return response()->json($flight);
    }

    // Delete a flight
    public function destroy($id)
    {
        $flight = Flight::findOrFail($id);
        $flight->delete();
        return response()->json(null, 204);
    }
}
