import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createCustomIcon } from "./MapMarkerIcon";

const MapController = ({ center, selectedCompany }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedCompany) {
            map.flyTo([selectedCompany.latitude, selectedCompany.longitude], 15, {
                duration: 1.5
            });
        }
    }, [selectedCompany, map]);

    return null;
};

const MapComponent = ({ userLocation = [19.0760, 72.8777], companies = [], selectedCompany }) => {
    const mapRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Validate userLocation and companies
    const defaultLocation = [19.0760, 72.8777]; // Mumbai coordinates
    const validUserLocation = Array.isArray(userLocation) && userLocation.length === 2 && 
        !isNaN(userLocation[0]) && !isNaN(userLocation[1]) ? userLocation : defaultLocation;
    
    const validCompanies = Array.isArray(companies) ? companies.filter(company => 
        company && 
        typeof company === 'object' &&
        company.latitude !== undefined &&
        company.longitude !== undefined &&
        !isNaN(parseFloat(company.latitude)) &&
        !isNaN(parseFloat(company.longitude))
    ) : [];

    useEffect(() => {
        setIsLoading(false);
        if (validCompanies.length === 0 && companies.length > 0) {
            setError('Invalid company data received');
        }
    }, [companies]);

    if (isLoading) {
        return <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">Loading map...</div>;
    }

    if (error) {
        return <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-red-50 text-red-600">{error}</div>;
    }

    return (
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg relative">
            <MapContainer 
                center={validUserLocation} 
                zoom={12} 
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg"
                ref={mapRef}
            >
                <MapController center={validUserLocation} selectedCompany={selectedCompany} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {validCompanies.length > 0 ? (
                    validCompanies.map((company, index) => (
                        <Marker 
                            key={`${company.name}-${index}`}
                            position={[parseFloat(company.latitude), parseFloat(company.longitude)]}
                            icon={createCustomIcon(company.type)}
                            eventHandlers={{
                                click: () => {
                                    if (mapRef.current) {
                                        mapRef.current.flyTo(
                                            [company.latitude, company.longitude],
                                            15,
                                            { duration: 1.5 }
                                        );
                                    }
                                }
                            }}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-semibold text-lg">{company.name}</h3>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Type: {company.type}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Coordinates: {company.latitude.toFixed(4)}, {company.longitude.toFixed(4)}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))
                ) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-lg shadow-lg z-[1000] text-gray-600">
                        No companies found in this area
                    </div>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;