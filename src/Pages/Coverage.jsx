import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);
    
    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
       
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            // console.log(district, coord)
            // go to the location
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div className='py-20 px-27 bg-white rounded-4xl mt-8 mb-25'>
            <h2 className="text-[56px] font-extrabold text-green-blue">We are available in 64 districts</h2>
            <div className='mt-8 mb-12'>
                {/* search  */}
                <form onSubmit={handleSearch}>
                    <div className='relative'>
                        <input className='py-4 px-10 bg-gray-200  rounded-full w-1/2 outline-none' type="text" placeholder='Search' name="location"/>
                        <button className='py-3 px-8 rounded-full bg-[#c0dd67] text-base font-semibold cursor-pointer absolute right-[50.4%] bottom-1'>Search</button>
                    </div>
                </form>
            </div>
            <hr className='text-gray-300' />
            <h1 className='my-10 text-3xl font-extrabold text-green-blue'>We deliver almost all over Bangladesh</h1>
            {/*  */}
            <div>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[600px] w-full rounded-3xl'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenters.map((center, index) => <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;