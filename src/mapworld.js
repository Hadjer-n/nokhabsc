import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from 'lucide-react';

const ProfessionalWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const countries = [
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      coordinates: { x: 180, y: 160 },
      color: '#3B82F6',
      capital: 'Washington D.C.',
      population: '331M',
      continent: 'North America',
      area: '9.8M km²',
      language: 'English'
    },
    {
      id: 'algeria',
      name: 'Algeria',
      flag: '🇩🇿',
      coordinates: { x: 440, y: 190 },
      color: '#10B981',
      capital: 'Algiers',
      population: '44M',
      continent: 'Africa',
      area: '2.4M km²',
      language: 'Arabic'
    },
    {
      id: 'france',
      name: 'France',
      flag: '🇫🇷',
      coordinates: { x: 430, y: 150 },
      color: '#EF4444',
      capital: 'Paris',
      population: '68M',
      continent: 'Europe',
      area: '643,801 km²',
      language: 'French'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      coordinates: { x: 420, y: 140 },
      color: '#8B5CF6',
      capital: 'London',
      population: '67M',
      continent: 'Europe',
      area: '242,495 km²',
      language: 'English'
    },
    {
      id: 'south-korea',
      name: 'South Korea',
      flag: '🇰🇷',
      coordinates: { x: 640, y: 170 },
      color: '#F59E0B',
      capital: 'Seoul',
      population: '52M',
      continent: 'Asia',
      area: '100,363 km²',
      language: 'Korean'
    },
    {
      id: 'netherlands',
      name: 'Netherlands',
      flag: '🇳🇱',
      coordinates: { x: 430, y: 145 },
      color: '#EC4899',
      capital: 'Amsterdam',
      population: '17M',
      continent: 'Europe',
      area: '41,865 km²',
      language: 'Dutch'
    }
  ];

  // Continent outlines data
  const continents = [
    {
      name: 'North America',
      paths: [
        'M150,120 Q200,100 250,140 Q280,180 220,220 Q180,200 150,180 Z',
        'M100,80 Q130,60 160,90 Q140,120 100,100 Z'
      ]
    },
    {
      name: 'South America',
      paths: [
        'M220,250 Q260,220 300,280 Q270,320 230,300 Q200,280 220,250 Z'
      ]
    },
    {
      name: 'Europe',
      paths: [
        'M400,120 Q450,100 480,140 Q460,180 420,160 Q400,140 400,120 Z',
        'M420,100 Q440,90 460,110 Q450,130 420,120 Z'
      ]
    },
    {
      name: 'Africa',
      paths: [
        'M420,180 Q480,150 520,200 Q500,260 430,240 Q400,220 420,180 Z'
      ]
    },
    {
      name: 'Asia',
      paths: [
        'M480,120 Q580,100 650,160 Q620,220 550,200 Q500,180 480,120 Z',
        'M520,80 Q560,70 590,90 Q580,110 540,100 Z'
      ]
    },
    {
      name: 'Australia',
      paths: [
        'M620,280 Q660,260 680,300 Q650,320 620,310 Q600,290 620,280 Z'
      ]
    }
  ];

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom(prevZoom => Math.min(Math.max(0.3, prevZoom + delta), 3));
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'circle' || e.target.tagName === 'text') return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel);
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            World Map Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Professional visualization of global countries with detailed information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
            <div className="relative overflow-hidden rounded-lg bg-gray-900 border border-gray-600">
              <svg
                ref={svgRef}
                width="100%"
                height="500"
                viewBox="0 0 800 400"
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-200`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: 'center center'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Ocean Background */}
                <rect width="800" height="400" fill="#0f172a" />
                
                {/* Continent Outlines */}
                {continents.map((continent, index) => (
                  <g key={continent.name} opacity="0.4">
                    {continent.paths.map((path, pathIndex) => (
                      <path
                        key={pathIndex}
                        d={path}
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                    ))}
                  </g>
                ))}

                {/* Grid Lines */}
                <g stroke="#1e293b" strokeWidth="0.5" opacity="0.3">
                  {Array.from({ length: 16 }, (_, i) => (
                    <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                  ))}
                  {Array.from({ length: 8 }, (_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
                  ))}
                </g>

                {/* Country Markers */}
                {countries.map((country) => (
                  <g
                    key={country.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedCountry(country)}
                  >
                    {/* Connection line to label */}
                    <line
                      x1={country.coordinates.x}
                      y1={country.coordinates.y}
                      x2={country.coordinates.x}
                      y2={country.coordinates.y - 35}
                      stroke={country.color}
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      opacity="0"
                      className="group-hover:opacity-100 transition-opacity duration-200"
                    />
                    
                    {/* Pulsing effect */}
                    <circle
                      cx={country.coordinates.x}
                      cy={country.coordinates.y}
                      r="8"
                      fill={country.color}
                      opacity="0.4"
                      className="animate-pulse"
                    />
                    
                    {/* Main marker */}
                    <circle
                      cx={country.coordinates.x}
                      cy={country.coordinates.y}
                      r="6"
                      fill={country.color}
                      stroke="#0f172a"
                      strokeWidth="2"
                      className="group-hover:r-8 transition-all duration-200"
                    />
                    
                    {/* Flag */}
                    <text
                      x={country.coordinates.x}
                      y={country.coordinates.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      fontWeight="bold"
                      fill="white"
                    >
                      {country.flag}
                    </text>
                    
                    {/* Country name label */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <rect
                        x={country.coordinates.x - 40}
                        y={country.coordinates.y - 50}
                        width="80"
                        height="20"
                        fill={country.color}
                        rx="4"
                      />
                      <text
                        x={country.coordinates.x}
                        y={country.coordinates.y - 40}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="white"
                      >
                        {country.name}
                      </text>
                    </g>
                  </g>
                ))}

                {/* Map Title */}
                <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#94a3b8">
                  WORLD MAP
                </text>
              </svg>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 border border-gray-600">
                <button
                  onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-110"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.3))}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-110"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={resetView}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-110"
                  title="Reset View"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              {/* Scale Indicator */}
              <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={16} className="text-cyan-400" />
                  <span>Scale: {Math.round(zoom * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Map Instructions */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span>Click and drag to pan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Scroll to zoom</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Click flags for details</span>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Selected Country Info */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center space-x-2">
                <MapPin size={20} />
                <span>{selectedCountry ? 'Country Details' : 'Select a Country'}</span>
              </h3>
              {selectedCountry ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedCountry.flag}</span>
                    <div>
                      <p className="text-2xl font-bold text-white">{selectedCountry.name}</p>
                      <p className="text-gray-400">{selectedCountry.continent}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-750 rounded-lg p-3">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Capital</p>
                      <p className="font-semibold text-white text-sm">{selectedCountry.capital}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-3">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Population</p>
                      <p className="font-semibold text-white text-sm">{selectedCountry.population}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-3">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Area</p>
                      <p className="font-semibold text-white text-sm">{selectedCountry.area}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-3">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Language</p>
                      <p className="font-semibold text-white text-sm">{selectedCountry.language}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-750 to-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Country Color</p>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg border-2 border-gray-600"
                        style={{ backgroundColor: selectedCountry.color }}
                      ></div>
                      <div>
                        <p className="font-mono text-white text-sm">{selectedCountry.color}</p>
                        <p className="text-gray-400 text-xs">Visual identifier</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="text-gray-400">Click on any country flag to see detailed information</p>
                </div>
              )}
            </div>

            {/* Countries List */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Featured Countries</h3>
              <div className="space-y-2">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all group ${
                      selectedCountry?.id === country.id 
                        ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-l-4 border-cyan-400' 
                        : 'bg-gray-750 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {country.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{country.name}</p>
                      <p className="text-xs text-gray-400 truncate">{country.continent}</p>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: country.color }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Statistics */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Map Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Countries Displayed:</span>
                  <span className="font-semibold text-white">{countries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Continents Covered:</span>
                  <span className="font-semibold text-white">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Zoom:</span>
                  <span className="font-semibold text-white">{Math.round(zoom * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Update:</span>
                  <span className="font-semibold text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalWorldMap;