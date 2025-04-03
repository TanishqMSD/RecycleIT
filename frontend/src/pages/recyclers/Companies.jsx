import { useState, useEffect, useMemo } from "react";
import MapComponent from "./MapComponent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, ArrowUpDown, Navigation } from "lucide-react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// City coordinates
const CITIES = {
    "Mumbai": { lat: 19.0760, lon: 72.8777 },
    "Pune": { lat: 18.5204, lon: 73.8567 },
    "Delhi": { lat: 28.7041, lon: 77.1025 },
    "Bangalore": { lat: 12.9716, lon: 77.5946 },
    "Hyderabad": { lat: 17.3850, lon: 78.4867 },
    "Chennai": { lat: 13.0827, lon: 80.2707 },
    "Kolkata": { lat: 22.5726, lon: 88.3639 },
    "Ahmedabad": { lat: 23.0225, lon: 72.5714 }
};

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [userLocation, setUserLocation] = useState([19.076, 72.8777]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Mumbai");
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);

    const fetchNearbyCompanies = async (latitude, longitude) => {
        try {
            setLoading(true);
            console.log("Fetching companies for location:", latitude, longitude);
            
            const response = await fetch("http://localhost:3000/api/nearby", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ latitude, longitude })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data);

            if (data.length === 0) {
                setError("No nearby e-waste companies found in your area.");
            } else {
                setError("");
            }

            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
            setError(`Could not load company data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (useCurrentLocation) {
            console.log("Attempting to get current location...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Got current location:", latitude, longitude);
                    setUserLocation([latitude, longitude]);
                    fetchNearbyCompanies(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Location access denied. Using default location (Mumbai).");
                    const city = CITIES["Mumbai"];
                    setUserLocation([city.lat, city.lon]);
                    fetchNearbyCompanies(city.lat, city.lon);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.log("Using selected city:", selectedCity);
            const city = CITIES[selectedCity];
            setUserLocation([city.lat, city.lon]);
            fetchNearbyCompanies(city.lat, city.lon);
        }
    }, [selectedCity, useCurrentLocation]);

    const getBadgeVariant = (type) => {
        switch (type) {
            case 'E-Waste':
                return 'destructive';
            case 'Electronics':
                return 'default';
            default:
                return 'secondary';
        }
    };

    const filteredAndSortedCompanies = useMemo(() => {
        let result = [...companies];

        if (searchQuery) {
            result = result.filter(company => 
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType !== "all") {
            result = result.filter(company => company.type === filterType);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "type":
                    return a.type.localeCompare(b.type);
                default:
                    return 0;
            }
        });

        return result;
    }, [companies, searchQuery, filterType, sortBy]);

    const handleCompanyClick = (company) => {
        setSelectedCompany(company);
    };

    const handleLocationToggle = () => {
        setUseCurrentLocation(!useCurrentLocation);
        setSelectedCity("Mumbai"); // Reset to default city when switching modes
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <Card className="shadow-lg rounded-xl overflow-hidden mb-8">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                            <CardTitle className="text-3xl font-bold">E-Waste Recycling Centers</CardTitle>
                            <CardDescription className="text-blue-100">
                                Find e-waste and electronics recycling facilities near you
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant={useCurrentLocation ? "default" : "outline"}
                                        onClick={handleLocationToggle}
                                        className="flex items-center gap-2"
                                    >
                                        <Navigation className="w-4 h-4" />
                                        {useCurrentLocation ? "Using Current Location" : "Use Current Location"}
                                    </Button>
                                    {!useCurrentLocation && (
                                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Select a city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(CITIES).map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <Input
                                            placeholder="Search companies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Select value={filterType} onValueChange={setFilterType}>
                                            <SelectTrigger className="w-[180px]">
                                                <Filter className="mr-2 h-4 w-4" />
                                                <SelectValue placeholder="Filter by type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="E-Waste">E-Waste</SelectItem>
                                                <SelectItem value="Electronics">Electronics</SelectItem>
                                                <SelectItem value="General Recycling">General Recycling</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger className="w-[180px]">
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">Name</SelectItem>
                                                <SelectItem value="type">Type</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-20 w-full rounded-lg" />
                                    <Skeleton className="h-20 w-full rounded-lg" />
                                    <Skeleton className="h-20 w-full rounded-lg" />
                                </div>
                            ) : error ? (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredAndSortedCompanies.map((company, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
                                                selectedCompany === company ? 'ring-2 ring-blue-500' : ''
                                            }`}
                                            onClick={() => handleCompanyClick(company)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                                                    <div className="mt-2 flex items-center space-x-2">
                                                        <Badge variant={getBadgeVariant(company.type)}>
                                                            {company.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>Coordinates: {company.latitude.toFixed(4)}, {company.longitude.toFixed(4)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Interactive Map</h2>
                            <p className="text-sm text-gray-500">Click on markers to view details</p>
                        </div>
                        <MapComponent 
                            userLocation={userLocation} 
                            companies={filteredAndSortedCompanies}
                            selectedCompany={selectedCompany}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Companies;
