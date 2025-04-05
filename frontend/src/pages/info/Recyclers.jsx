import { useState, useEffect, useMemo } from "react";
import MapComponent from "../../components/MapComponent";
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
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nearby`, {
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-green-200/30 to-transparent blur-3xl transform rotate-12 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-emerald-300/30 to-transparent blur-3xl -rotate-12 animate-pulse delay-150"></div>
                </div>
                
                <Card className="backdrop-blur-sm bg-white/90 shadow-xl rounded-2xl overflow-hidden mb-8 border-0 transition-all duration-300 hover:shadow-2xl">
                    <CardHeader className="relative overflow-hidden py-8 px-6 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                        <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">E-Waste Recycling Centers</CardTitle>
                        <CardDescription className="text-emerald-100 text-lg md:text-xl relative z-10">
                            Find e-waste and electronics recycling facilities near you
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="p-2 rounded-lg bg-green-100">
                                                <MapPin className="w-5 h-5 text-green-700" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800">Location Settings</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <Button
                                                variant={useCurrentLocation ? "default" : "outline"}
                                                onClick={handleLocationToggle}
                                                className="w-full justify-center transition-all duration-300 hover:shadow-md bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-base py-6"
                                                size="lg"
                                            >
                                                <Navigation className="w-5 h-5 mr-2" />
                                                {useCurrentLocation ? "Using Current Location" : "Use Current Location"}
                                            </Button>
                                            
                                            {!useCurrentLocation && (
                                                <Select value={selectedCity} onValueChange={setSelectedCity}>
                                                    <SelectTrigger className="w-full h-14 bg-white/90 hover:bg-white transition-colors border-gray-200 hover:border-green-500">
                                                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                                                        <SelectValue placeholder="Select a city" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border-green-100">
                                                        {Object.keys(CITIES).map((city) => (
                                                            <SelectItem key={city} value={city} className="hover:bg-green-50">
                                                                {city}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="p-2 rounded-lg bg-emerald-100">
                                                <Search className="w-5 h-5 text-emerald-700" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800">Search & Filter</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <Input
                                                    placeholder="Search companies..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-12 h-14 bg-white/90 hover:bg-white transition-colors border-gray-200 focus:border-green-500 focus:ring-green-500 text-base"
                                                />
                                            </div>
                                            
                                            <Select value={filterType} onValueChange={setFilterType}>
                                                <SelectTrigger className="w-full h-14 bg-white/90 hover:bg-white transition-colors border-gray-200 hover:border-green-500">
                                                    <Filter className="mr-2 h-5 w-5 text-green-600" />
                                                    <SelectValue placeholder="Filter by type" />
                                                </SelectTrigger>
                                                <SelectContent className="border-green-100">
                                                    <SelectItem value="all" className="hover:bg-green-50">All Types</SelectItem>
                                                    <SelectItem value="E-Waste" className="hover:bg-green-50">E-Waste</SelectItem>
                                                    <SelectItem value="Electronics" className="hover:bg-green-50">Electronics</SelectItem>
                                                    <SelectItem value="General Recycling" className="hover:bg-green-50">General Recycling</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            
                                            <Select value={sortBy} onValueChange={setSortBy}>
                                                <SelectTrigger className="w-full h-14 bg-white/90 hover:bg-white transition-colors border-gray-200 hover:border-green-500">
                                                    <ArrowUpDown className="mr-2 h-5 w-5 text-green-600" />
                                                    <SelectValue placeholder="Sort by" />
                                                </SelectTrigger>
                                                <SelectContent className="border-green-100">
                                                    <SelectItem value="name" className="hover:bg-green-50">Name</SelectItem>
                                                    <SelectItem value="type" className="hover:bg-green-50">Type</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                                    {filteredAndSortedCompanies.map((company, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white p-6 rounded-lg border border-green-100 hover:shadow-md hover:border-green-200 transition-all cursor-pointer ${
                                                selectedCompany === company ? 'ring-2 ring-green-500' : ''
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
                        </div>
                        </CardContent>
                    </Card>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300">
                        <div className="p-4 bg-green-50 border-b border-green-100">
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
    );
};

export default Companies;