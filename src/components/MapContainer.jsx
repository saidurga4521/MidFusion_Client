import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const LIBRARIES = ["places"];

const MapContainer = ({ meeting }) => {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [middleLocation, setMiddleLocation] = useState(null);
  const [directionsList, setDirectionsList] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const [travelMode, setTravelMode] = useState("DRIVING");

  const { user } = useSelector((store) => store.authSlice);
  const mapRef = useRef(null);

  const handleToggleRoute = () => {
    setShowRoute((prev) => !prev);
  };

  // transform participants to markers
  useEffect(() => {
    if (meeting?.participants) {
      const transformed = meeting.participants
        .map((item) => {
          const lat = item?.location?.lat;
          const lng = item?.location?.lng;
          if (lat != null && lng != null && !isNaN(lat) && !isNaN(lng)) {
            return {
              id: item._id || item.email, // unique key
              name: item.name,
              email: item.email,
              position: { lat: Number(lat), lng: Number(lng) },
              description: item?.location?.placeName || "",
              avatar: item?.avatar || null,
            };
          }
          return null;
        })
        .filter(Boolean);

      setMarkers(transformed);

      // center on creator if exists
      const creatorMarker = transformed.find((m) => m.email === user.email);
      if (creatorMarker) {
        setCenter(creatorMarker.position);
      } else if (transformed.length > 0) {
        setCenter(transformed[0].position);
      }
    }
  }, [meeting, user.email]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // calculate middle point
  useEffect(() => {
    if (markers.length > 0) {
      let totalLat = 0;
      let totalLng = 0;
      markers.forEach((m) => {
        totalLat += m.position.lat;
        totalLng += m.position.lng;
      });
      const mid = {
        lat: totalLat / markers.length,
        lng: totalLng / markers.length,
      };
      setMiddleLocation(mid);
    }
  }, [markers]);

  // fetch all directions when showRoute is toggled on
  useEffect(() => {
    if (showRoute && middleLocation && markers.length > 0 && isLoaded) {
      const service = new google.maps.DirectionsService();

      Promise.all(
        markers.map(
          (marker) =>
            new Promise((resolve, reject) => {
              service.route(
                {
                  origin: marker.position,
                  destination: middleLocation,
                  travelMode: travelMode,
                },
                (result, status) => {
                  if (status === "OK") {
                    const leg = result.routes[0].legs[0];
                    resolve({
                      markerId: marker.id,
                      result,
                      distance: leg.distance.text,
                      duration: leg.duration.text,
                    });
                  } else {
                    reject(status);
                  }
                }
              );
            })
        )
      )
        .then((results) => {
          setDirectionsList(results);
        })
        .catch((err) => {
          console.error("Directions error:", err);
        });
    } else {
      setDirectionsList([]);
    }
  }, [showRoute, middleLocation, markers, isLoaded, travelMode]);

  // fit bounds automatically
  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach((m) => bounds.extend(m.position));
      if (middleLocation) bounds.extend(middleLocation);
      mapRef.current.fitBounds(bounds);
    }
  }, [markers, middleLocation]);

  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative">
      {/* <div className="absolute top-16 left-2 z-10 flex gap-2">
        <button
          onClick={handleToggleRoute}
          className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          {showRoute ? "Hide Routes" : "Show Routes"}
        </button>

        <select
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
          className="px-2 py-1 rounded-md border border-gray-300 shadow-sm bg-white text-sm"
        >
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Cycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div> */}

      <GoogleMap
        mapContainerClassName="w-full h-[500px]"
        center={center}
        zoom={12}
        onLoad={(map) => (mapRef.current = map)}
      >
        {markers.map((marker) => {
          const directions = directionsList.find((d) => d.markerId === marker.id);

          return (
            <MarkerF
              key={marker.id}
              position={marker.position}
              onClick={() => setActiveMarker(marker.id)}
            >
              {activeMarker === marker.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="p-2 min-w-[200px] rounded-lg shadow-md bg-white">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          marker.avatar ||
                          `https://ui-avatars.com/api/?name=${marker.name}`
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          {marker.name}
                        </h3>
                        <p className="text-xs text-gray-500">{marker.email}</p>
                      </div>
                    </div>
                    {marker.description && (
                      <p className="mt-2 text-xs text-gray-600 italic">
                        {marker.description}
                      </p>
                    )}
                    {directions && (
                      <div className="mt-2 text-xs text-gray-700">
                        <p>Distance: {directions.distance}</p>
                        <p>Duration: {directions.duration}</p>
                      </div>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${marker.position.lat},${marker.position.lng}&destination=${middleLocation.lat},${middleLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-2 inline-block"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          );
        })}

        {/* 🎯 Custom midpoint marker */}
        {middleLocation && (
          <MarkerF
            position={middleLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/kml/shapes/target.png",
              scaledSize: new google.maps.Size(40, 40),
            }}
            onClick={() => setActiveMarker("midpoint")}
          >
            {activeMarker === "midpoint" && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="p-2 min-w-[180px] rounded-lg shadow-md bg-white">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Midpoint
                  </h3>
                  <p className="text-xs text-gray-600">
                    Suggested meeting location for all participants 🎯
                  </p>
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        )}

        {/* Render routes */}
        {directionsList.map((dir, i) => (
          <DirectionsRenderer
            key={i}
            directions={dir.result}
            options={{
              polylineOptions: {
                strokeColor: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"][i % 4],
                strokeOpacity: 0.9,
                strokeWeight: 4,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 2,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              },
              suppressMarkers: true,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
