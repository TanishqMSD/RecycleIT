import React, { useEffect, useRef } from "react";
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

const MapComponent = ({ userLocation, companies, selectedCompany }) => {
    const mapRef = useRef();

    return (
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
            <MapContainer 
                center={userLocation} 
                zoom={12} 
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg"
                ref={mapRef}
            >
                <MapController center={userLocation} selectedCompany={selectedCompany} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {companies.length > 0 ? (
                    companies.map((company, index) =>
                        company.latitude && company.longitude ? (
                            <Marker 
                                key={index} 
                                position={[company.latitude, company.longitude]}
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
                        ) : null
                    )
                ) : (
                    <p>No companies found.</p>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;