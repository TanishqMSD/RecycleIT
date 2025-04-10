import L from 'leaflet';

export const createCustomIcon = (type) => {
    let color = '#3B82F6'; // Default blue
    
    switch (type) {
        case 'E-Waste':
            color = '#EF4444'; // Red
            break;
        case 'Electronics':
            color = '#10B981'; // Green
            break;
        case 'General Recycling':
            color = '#6366F1'; // Indigo
            break;
        default:
            break;
    }

    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div style="
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: ${color};
                border: 2px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
};