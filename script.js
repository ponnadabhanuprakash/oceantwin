/**
 * OceanTwin 360 — Global 3D Ocean Digital Twin & In-Situ Observation Platform
 * Developed for Ministry of Earth Sciences (MoES) - SIH26067
 *
 * Tech Stack: HTML5, CSS3, Vanilla JavaScript, Three.js (via CDN)
 */

// ==========================================================================
// 1. SCIENTIFIC MOCK DATASETS & CONSTANTS
// ==========================================================================

// TODO: Replace mock data with real MoES / INCOIS ocean model and in-situ APIs (e.g. ERDDAP, OPeNDAP, INCOIS Web Services)
const OCEAN_REGIONS = {
  indian: {
    name: "Indian Ocean",
    subname: "Primary Showcase (MoES Focus)",
    lat: 5.0,
    lon: 78.0,
    zoom: 2.8,
    status: "Elevated (+1.2°C)",
    statusType: "elevated",
    tempAvg: 28.4,
    salinityAvg: 34.8,
    currentAvg: 0.55,
    waveAvg: 2.2,
    seaLevelAvg: 0.12,
    oxygenAvg: 4.8,
    modelConvergence: 94.2,
    anomaliesCount: 5
  },
  bay_of_bengal: {
    name: "Bay of Bengal",
    subname: "Northern Indian Ocean Basin",
    lat: 14.5,
    lon: 87.5,
    zoom: 2.4,
    status: "High Anomaly (+2.1°C)",
    statusType: "high",
    tempAvg: 29.1,
    salinityAvg: 32.5,
    currentAvg: 0.48,
    waveAvg: 2.5,
    seaLevelAvg: 0.18,
    oxygenAvg: 4.2,
    modelConvergence: 96.5,
    anomaliesCount: 3
  },
  arabian_sea: {
    name: "Arabian Sea",
    subname: "Western Indian Ocean Upwelling Basin",
    lat: 16.0,
    lon: 66.0,
    zoom: 2.4,
    status: "Moderate Anomaly (+1.4°C)",
    statusType: "moderate",
    tempAvg: 28.0,
    salinityAvg: 36.2,
    currentAvg: 0.72,
    waveAvg: 3.4,
    seaLevelAvg: 0.08,
    oxygenAvg: 3.9,
    modelConvergence: 93.8,
    anomaliesCount: 2
  },
  andaman_sea: {
    name: "Andaman Sea",
    subname: "Eastern Indian Ocean Shelf",
    lat: 10.5,
    lon: 94.5,
    zoom: 2.3,
    status: "Elevated (+1.1°C)",
    statusType: "elevated",
    tempAvg: 28.8,
    salinityAvg: 33.1,
    currentAvg: 0.35,
    waveAvg: 1.8,
    seaLevelAvg: 0.14,
    oxygenAvg: 5.1,
    modelConvergence: 95.1,
    anomaliesCount: 1
  },
  pacific: {
    name: "Pacific Ocean",
    subname: "Equatorial & Western Pacific Basin",
    lat: 0.0,
    lon: 160.0,
    zoom: 2.9,
    status: "Normal (ENSO Neutral)",
    statusType: "normal",
    tempAvg: 27.2,
    salinityAvg: 34.6,
    currentAvg: 0.62,
    waveAvg: 2.4,
    seaLevelAvg: 0.04,
    oxygenAvg: 5.3,
    modelConvergence: 95.8,
    anomaliesCount: 2
  },
  atlantic: {
    name: "Atlantic Ocean",
    subname: "North & South Atlantic Basins",
    lat: 18.0,
    lon: -40.0,
    zoom: 2.9,
    status: "Moderate Anomaly (+1.2°C)",
    statusType: "moderate",
    tempAvg: 25.6,
    salinityAvg: 35.8,
    currentAvg: 0.85,
    waveAvg: 2.8,
    seaLevelAvg: 0.09,
    oxygenAvg: 5.6,
    modelConvergence: 92.4,
    anomaliesCount: 2
  },
  arctic: {
    name: "Arctic Ocean",
    subname: "Polar Sea Ice Marginal Zone",
    lat: 78.0,
    lon: 10.0,
    zoom: 2.6,
    status: "High Anomaly (+3.2°C)",
    statusType: "high",
    tempAvg: -0.8,
    salinityAvg: 30.5,
    currentAvg: 0.22,
    waveAvg: 1.2,
    seaLevelAvg: 0.02,
    oxygenAvg: 7.8,
    modelConvergence: 89.1,
    anomaliesCount: 3
  },
  southern: {
    name: "Southern Ocean",
    subname: "Antarctic Circumpolar Current Zone",
    lat: -55.0,
    lon: 30.0,
    zoom: 2.8,
    status: "Normal",
    statusType: "normal",
    tempAvg: 2.4,
    salinityAvg: 34.0,
    currentAvg: 1.15,
    waveAvg: 4.5,
    seaLevelAvg: -0.05,
    oxygenAvg: 7.2,
    modelConvergence: 91.0,
    anomaliesCount: 1
  },
  south_china_sea: {
    name: "South China Sea",
    subname: "Western Pacific Marginal Sea",
    lat: 15.0,
    lon: 114.0,
    zoom: 2.4,
    status: "Normal",
    statusType: "normal",
    tempAvg: 28.5,
    salinityAvg: 33.8,
    currentAvg: 0.45,
    waveAvg: 2.0,
    seaLevelAvg: 0.07,
    oxygenAvg: 5.0,
    modelConvergence: 94.6,
    anomaliesCount: 1
  },
  mediterranean: {
    name: "Mediterranean Sea",
    subname: "Enclosed European-African Basin",
    lat: 35.0,
    lon: 18.0,
    zoom: 2.4,
    status: "Moderate (+1.5°C)",
    statusType: "moderate",
    tempAvg: 24.2,
    salinityAvg: 38.5,
    currentAvg: 0.30,
    waveAvg: 1.5,
    seaLevelAvg: 0.05,
    oxygenAvg: 5.8,
    modelConvergence: 93.2,
    anomaliesCount: 1
  }
};

// Global & Regional In-Situ Observation Stations (25+ simulated sensors)
// TODO: Replace with real MoES/INCOIS Argo, RAMA, OMNI, and Tide Gauge API streams
const SENSORS_DATA = [
  {
    id: "BD-08",
    name: "INCOIS OMNI Moored Buoy BD-08",
    type: "buoy",
    typeLabel: "Moored Buoy",
    icon: "fa-satellite-dish",
    region: "bay_of_bengal",
    regionName: "Bay of Bengal Central",
    lat: 14.15,
    lon: 86.85,
    depth: 0,
    temp: 28.3,
    modelTemp: 29.1,
    salinity: 32.8,
    modelSalinity: 33.2,
    oxygen: 4.4,
    current: 0.45,
    waves: 2.4,
    lastTime: "35 mins ago (INSAT Telemetry)",
    qc: "Passed (QC Level 1)",
    details: "Equipped with Met-Ocean sensors, subsurface ADCP, and inductive conductivity chain to 500m."
  },
  {
    id: "AD-01",
    name: "INCOIS OMNI Moored Buoy AD-01",
    type: "buoy",
    typeLabel: "Moored Buoy",
    icon: "fa-satellite-dish",
    region: "arabian_sea",
    regionName: "Arabian Sea Northern",
    lat: 18.25,
    lon: 67.45,
    depth: 0,
    temp: 27.9,
    modelTemp: 28.3,
    salinity: 36.4,
    modelSalinity: 36.1,
    oxygen: 3.8,
    current: 0.68,
    waves: 3.6,
    lastTime: "1 hour ago (INSAT)",
    qc: "Passed (QC Level 1)",
    details: "High-salinity Arabian Sea monitoring station with real-time wave directional spectra."
  },
  {
    id: "ARGO-IN-1024",
    name: "Argo Profiling Float #IN-1024",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "bay_of_bengal",
    regionName: "Bay of Bengal Offshore",
    lat: 12.54,
    lon: 86.18,
    depth: 100,
    temp: 26.4,
    modelTemp: 27.0,
    salinity: 34.2,
    modelSalinity: 34.5,
    oxygen: 3.9,
    current: 0.38,
    waves: 2.1,
    lastTime: "2 hours ago (IRIDIUM)",
    qc: "Passed (Real-Time QC)",
    details: "Autonomous robotic float profiling 0–2000m every 10 days. CTD & biogeochemical sensors."
  },
  {
    id: "ARGO-IN-2190",
    name: "Argo Profiling Float #IN-2190",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "indian",
    regionName: "Equatorial Indian Ocean",
    lat: 1.50,
    lon: 80.50,
    depth: 50,
    temp: 28.8,
    modelTemp: 29.2,
    salinity: 34.9,
    modelSalinity: 34.8,
    oxygen: 4.8,
    current: 0.75,
    waves: 1.9,
    lastTime: "4 hours ago (IRIDIUM)",
    qc: "Passed (Real-Time QC)",
    details: "Monitoring Indian Ocean Dipole (IOD) equatorial wave dynamics."
  },
  {
    id: "RAMA-EQ-01",
    name: "RAMA Ocean Climate Mooring #EQ-01",
    type: "buoy",
    typeLabel: "Moored Buoy",
    icon: "fa-satellite-dish",
    region: "indian",
    regionName: "Central Indian Ocean Equatorial",
    lat: 0.0,
    lon: 80.5,
    depth: 0,
    temp: 29.0,
    modelTemp: 29.4,
    salinity: 34.7,
    modelSalinity: 34.9,
    oxygen: 4.7,
    current: 0.82,
    waves: 2.0,
    lastTime: "1 hour ago",
    qc: "Passed",
    details: "Research Moored Array for African-Asian-Australian Monsoon Analysis and Prediction."
  },
  {
    id: "RV-SAMUDRA-01",
    name: "RV Samudra Ratnakiran (MoES)",
    type: "ship",
    typeLabel: "Research Vessel",
    icon: "fa-ship",
    region: "bay_of_bengal",
    regionName: "Bay of Bengal Transect",
    lat: 16.20,
    lon: 84.10,
    depth: 0,
    temp: 28.9,
    modelTemp: 29.3,
    salinity: 31.9,
    modelSalinity: 32.3,
    oxygen: 4.6,
    current: 0.52,
    waves: 2.6,
    lastTime: "Live Telemetry",
    qc: "Verified In-Situ",
    details: "Deep-sea oceanographic survey vessel executing continuous Underway CTD & ADCP profiles."
  },
  {
    id: "RV-SAGAR-NIDHI",
    name: "ORV Sagar Nidhi (NIOT/MoES)",
    type: "ship",
    typeLabel: "Research Vessel",
    icon: "fa-ship",
    region: "arabian_sea",
    regionName: "Arabian Sea Southwest",
    lat: 11.20,
    lon: 72.80,
    depth: 0,
    temp: 28.2,
    modelTemp: 28.5,
    salinity: 35.8,
    modelSalinity: 35.9,
    oxygen: 4.1,
    current: 0.60,
    waves: 3.1,
    lastTime: "Live Telemetry",
    qc: "Verified In-Situ",
    details: "Ice-class vessel conducting multidisciplinary monsoon and seabed ecosystem studies."
  },
  {
    id: "STN-CHN-01",
    name: "Chennai INCOIS Coastal Station",
    type: "station",
    typeLabel: "Coastal Observatory",
    icon: "fa-location-dot",
    region: "bay_of_bengal",
    regionName: "Coromandel Coast, Chennai",
    lat: 13.08,
    lon: 80.28,
    depth: 0,
    temp: 28.7,
    modelTemp: 29.0,
    salinity: 33.4,
    modelSalinity: 33.6,
    oxygen: 5.3,
    current: 0.32,
    waves: 1.6,
    lastTime: "10 mins ago",
    qc: "Passed",
    details: "High Frequency Coastal Radar (HF-Radar) and acoustic tide gauge station."
  },
  {
    id: "STN-VIZAG-02",
    name: "Visakhapatnam Ocean Radar",
    type: "station",
    typeLabel: "Coastal Observatory",
    icon: "fa-location-dot",
    region: "bay_of_bengal",
    regionName: "Andhra Coast, Visakhapatnam",
    lat: 17.68,
    lon: 83.22,
    depth: 0,
    temp: 28.5,
    modelTemp: 28.8,
    salinity: 32.2,
    modelSalinity: 32.5,
    oxygen: 4.9,
    current: 0.40,
    waves: 2.1,
    lastTime: "15 mins ago",
    qc: "Passed",
    details: "Monitoring cyclonic surge propagation and coastal current shear."
  },
  {
    id: "STN-KOCHI-03",
    name: "Kochi Marine Observation Tower",
    type: "station",
    typeLabel: "Coastal Observatory",
    icon: "fa-location-dot",
    region: "arabian_sea",
    regionName: "Malabar Coast, Kochi",
    lat: 9.93,
    lon: 76.26,
    depth: 0,
    temp: 27.6,
    modelTemp: 28.0,
    salinity: 35.1,
    modelSalinity: 35.3,
    oxygen: 3.7,
    current: 0.58,
    waves: 2.8,
    lastTime: "12 mins ago",
    qc: "Passed",
    details: "Upwelling biogeochemistry monitoring and mud-bank ocean dynamics."
  },
  {
    id: "STN-MUMBAI-04",
    name: "Mumbai High Offshore Platform",
    type: "station",
    typeLabel: "Coastal Observatory",
    icon: "fa-location-dot",
    region: "arabian_sea",
    regionName: "Maharashtra Offshore",
    lat: 19.42,
    lon: 71.33,
    depth: 0,
    temp: 27.8,
    modelTemp: 28.1,
    salinity: 36.6,
    modelSalinity: 36.4,
    oxygen: 4.0,
    current: 0.70,
    waves: 3.4,
    lastTime: "8 mins ago",
    qc: "Passed",
    details: "Continuous sea-state, meteorology, and boundary-layer current profile monitoring."
  },
  {
    id: "STN-PORTBLAIR",
    name: "Port Blair Marine Observatory",
    type: "station",
    typeLabel: "Coastal Observatory",
    icon: "fa-location-dot",
    region: "andaman_sea",
    regionName: "Andaman & Nicobar Islands",
    lat: 11.62,
    lon: 92.72,
    depth: 0,
    temp: 28.9,
    modelTemp: 29.2,
    salinity: 33.0,
    modelSalinity: 33.2,
    oxygen: 5.2,
    current: 0.36,
    waves: 1.7,
    lastTime: "20 mins ago",
    qc: "Passed",
    details: "Coral reef thermal stress monitoring and tsunami early warning sensor station."
  },
  // GLOBAL OBSERVATION STATIONS (Pacific, Atlantic, Arctic, Southern)
  {
    id: "ARGO-PAC-4401",
    name: "Argo Float #PAC-4401 (NOAA)",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "pacific",
    regionName: "Tropical Western Pacific",
    lat: 5.20,
    lon: 155.40,
    depth: 100,
    temp: 28.1,
    modelTemp: 28.3,
    salinity: 34.6,
    modelSalinity: 34.7,
    oxygen: 5.1,
    current: 0.65,
    waves: 2.2,
    lastTime: "3 hours ago (IRIDIUM)",
    qc: "Passed",
    details: "Western Pacific Warm Pool climate sensor profiling 0–1000m."
  },
  {
    id: "ARGO-PAC-8812",
    name: "Argo Float #PAC-8812 (JAMSTEC)",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "pacific",
    regionName: "Kuroshio Extension Zone",
    lat: 32.50,
    lon: 145.20,
    depth: 50,
    temp: 23.4,
    modelTemp: 23.8,
    salinity: 34.9,
    modelSalinity: 35.1,
    oxygen: 5.7,
    current: 1.10,
    waves: 2.8,
    lastTime: "5 hours ago",
    qc: "Passed",
    details: "Measuring strong Kuroshio Current thermal transport and eddy shedding."
  },
  {
    id: "ARGO-ATL-1902",
    name: "Argo Float #ATL-1902 (Euro-Argo)",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "atlantic",
    regionName: "North Atlantic Gulf Stream",
    lat: 36.80,
    lon: -64.20,
    depth: 100,
    temp: 22.8,
    modelTemp: 23.3,
    salinity: 36.2,
    modelSalinity: 36.4,
    oxygen: 5.5,
    current: 1.25,
    waves: 3.2,
    lastTime: "2 hours ago",
    qc: "Passed",
    details: "AMOC (Atlantic Meridional Overturning Circulation) deep convection monitor."
  },
  {
    id: "BATS-ATL-01",
    name: "Bermuda Atlantic Time-Series (BATS)",
    type: "station",
    typeLabel: "Deep Ocean Station",
    icon: "fa-location-dot",
    region: "atlantic",
    regionName: "Sargasso Sea / Atlantic",
    lat: 31.67,
    lon: -64.17,
    depth: 0,
    temp: 26.5,
    modelTemp: 26.8,
    salinity: 36.7,
    modelSalinity: 36.9,
    oxygen: 5.9,
    current: 0.42,
    waves: 2.0,
    lastTime: "1 hour ago",
    qc: "Passed",
    details: "Decadal ocean carbon uptake, acidification, and biogeochemical benchmark station."
  },
  {
    id: "ARGO-ARC-0042",
    name: "Arctic Profiler #ARC-0042 (IMR Norway)",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "arctic",
    regionName: "Arctic Fram Strait",
    lat: 79.10,
    lon: 4.50,
    depth: 50,
    temp: 1.2,
    modelTemp: 1.9,
    salinity: 34.1,
    modelSalinity: 34.3,
    oxygen: 7.9,
    current: 0.32,
    waves: 1.4,
    lastTime: "6 hours ago (Under-Ice Acoustic)",
    qc: "Passed",
    details: "Under-ice acoustic telemetry measuring Atlantic water inflow into Arctic basin."
  },
  {
    id: "ARGO-SOU-7711",
    name: "Argo Float #SOU-7711 (SOCCOM)",
    type: "argo",
    typeLabel: "Argo Float",
    icon: "fa-circle-dot",
    region: "southern",
    regionName: "Southern Ocean Drake Passage",
    lat: -58.30,
    lon: -60.10,
    depth: 100,
    temp: 1.8,
    modelTemp: 2.2,
    salinity: 34.0,
    modelSalinity: 33.9,
    oxygen: 7.4,
    current: 1.35,
    waves: 4.8,
    lastTime: "4 hours ago",
    qc: "Passed",
    details: "Biogeochemical Argo float analyzing Southern Ocean carbon sink and pH."
  },
  {
    id: "SHIP-RON-BROWN",
    name: "NOAA Ship Ronald H. Brown",
    type: "ship",
    typeLabel: "Research Vessel",
    icon: "fa-ship",
    region: "pacific",
    regionName: "Eastern Tropical Pacific",
    lat: 8.50,
    lon: -110.20,
    depth: 0,
    temp: 26.8,
    modelTemp: 27.2,
    salinity: 34.4,
    modelSalinity: 34.6,
    oxygen: 4.8,
    current: 0.55,
    waves: 2.3,
    lastTime: "Live Underway",
    qc: "Passed",
    details: "Global ocean climate survey cruise."
  }
];

// Active Ocean Anomaly Hotspots
const ANOMALIES_DATA = [
  {
    id: "ANOM-BOB-01",
    locationKey: "bay_of_bengal",
    name: "Bay of Bengal Northern Sector",
    lat: 16.5,
    lon: 88.2,
    type: "Marine Heatwave",
    severity: "HIGH",
    severityClass: "high",
    deltaTemp: "+2.1°C",
    modelVal: "30.4°C",
    obsVal: "28.3°C (Baseline)",
    explanation: "Simulated SST is significantly above climatological baseline (+2.1°C). High thermal potential for convective storm intensification and coral bleaching in nearby shelf reefs."
  },
  {
    id: "ANOM-ARB-02",
    locationKey: "arabian_sea",
    name: "Arabian Sea Offshore Gujarat",
    lat: 20.1,
    lon: 68.4,
    type: "High Salinity & Wave Swell",
    severity: "MEDIUM",
    severityClass: "medium",
    deltaTemp: "+1.4°C",
    modelVal: "36.8 PSU",
    obsVal: "35.4 PSU (Baseline)",
    explanation: "Elevated sea surface salinity and strong wind-driven wave swell (3.8m – 4.4m) detected by satellite altimetry and coastal HF radar."
  },
  {
    id: "ANOM-ARC-03",
    locationKey: "arctic",
    name: "Arctic Beaufort Sea Marginal Ice",
    lat: 74.5,
    lon: -140.0,
    type: "Rapid Sea-Ice Thinning & Warm Inflow",
    severity: "HIGH",
    severityClass: "high",
    deltaTemp: "+3.2°C",
    modelVal: "2.4°C",
    obsVal: "-0.8°C (Baseline)",
    explanation: "Abnormally high surface water temperature causing accelerated peripheral sea-ice ablation."
  }
];

// Parameter Metadata Configurations (Scales, Units, Legends)
const PARAM_CONFIG = {
  temperature: {
    name: "Sea Surface Temperature",
    unit: "°C",
    min: 18,
    max: 32,
    gradient: "linear-gradient(90deg, #0012ff 0%, #00f2fe 35%, #38ef7d 65%, #ffb300 85%, #ff2a2a 100%)",
    labels: ["18°C (Min)", "22°C", "26°C", "29°C", "32°C (Max)"],
    field: "temp",
    modelField: "modelTemp"
  },
  salinity: {
    name: "Sea Surface Salinity",
    unit: "PSU",
    min: 30,
    max: 38,
    gradient: "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
    labels: ["30 PSU", "32 PSU", "35 PSU", "37 PSU", "38+ PSU"],
    field: "salinity",
    modelField: "modelSalinity"
  },
  currents: {
    name: "Ocean Current Velocity",
    unit: "m/s",
    min: 0.1,
    max: 1.8,
    gradient: "linear-gradient(90deg, #0f2027 0%, #203a43 40%, #2c5364 70%, #00f2fe 100%)",
    labels: ["0.1 m/s (Calm)", "0.5 m/s", "0.9 m/s", "1.4 m/s", "1.8 m/s (Strong)"],
    field: "current",
    modelField: "current"
  },
  wave_height: {
    name: "Significant Wave Height",
    unit: "m",
    min: 0.5,
    max: 6.0,
    gradient: "linear-gradient(90deg, #00c6ff 0%, #0072ff 50%, #f953c6 100%)",
    labels: ["0.5 m (Smooth)", "1.5 m", "3.0 m (Moderate)", "4.5 m", "6.0+ m (Rough)"],
    field: "waves",
    modelField: "waves"
  },
  sea_level: {
    name: "Sea Level Anomaly",
    unit: "m",
    min: -0.2,
    max: 0.3,
    gradient: "linear-gradient(90deg, #130cb7 0%, #52e5e7 50%, #f77062 100%)",
    labels: ["-0.20 m (Low)", "-0.05 m", "0.00 m (Mean)", "+0.15 m", "+0.30 m (Surge)"],
    field: "seaLevelAvg",
    modelField: "seaLevelAvg"
  },
  dissolved_oxygen: {
    name: "Dissolved Oxygen",
    unit: "mg/L",
    min: 2.0,
    max: 8.0,
    gradient: "linear-gradient(90deg, #e53935 0%, #fbc02d 40%, #43a047 80%, #00acc1 100%)",
    labels: ["2.0 (Hypoxic)", "3.5", "5.0 (Optimal)", "6.5", "8.0 mg/L"],
    field: "oxygen",
    modelField: "oxygen"
  }
};

// Depth Layers
const DEPTH_LAYERS = [
  { index: 0, label: "Surface (0 m)", depthM: 0, tempFactor: 1.0, salinityFactor: 1.0, o2Factor: 1.0 },
  { index: 1, label: "50 m (Subsurface)", depthM: 50, tempFactor: 0.94, salinityFactor: 1.02, o2Factor: 0.90 },
  { index: 2, label: "100 m (Thermocline)", depthM: 100, tempFactor: 0.82, salinityFactor: 1.04, o2Factor: 0.72 },
  { index: 3, label: "500 m (Intermediate)", depthM: 500, tempFactor: 0.45, salinityFactor: 1.01, o2Factor: 0.40 },
  { index: 4, label: "1000 m (Abyssal)", depthM: 1000, tempFactor: 0.22, salinityFactor: 0.99, o2Factor: 0.55 }
];

// Temporal Timeline Dates
const TIME_STEPS = [
  { index: 0, dateStr: "25 Aug 2026", tempBias: -0.4, currentMult: 0.92 },
  { index: 1, dateStr: "26 Aug 2026", tempBias: -0.2, currentMult: 0.95 },
  { index: 2, dateStr: "27 Aug 2026", tempBias: 0.0, currentMult: 0.98 },
  { index: 3, dateStr: "28 Aug 2026", tempBias: 0.2, currentMult: 1.00 },
  { index: 4, dateStr: "29 Aug 2026", tempBias: 0.4, currentMult: 1.05 },
  { index: 5, dateStr: "30 Aug 2026", tempBias: 0.6, currentMult: 1.10 },
  { index: 6, dateStr: "31 Aug 2026", tempBias: 0.8, currentMult: 1.15 }
];

// ==========================================================================
// 2. APPLICATION STATE
// ==========================================================================
const AppState = {
  currentOceanKey: "bay_of_bengal",
  currentParam: "temperature",
  currentDepthIdx: 0,
  currentTimeIdx: 6,
  selectedSensor: SENSORS_DATA[0],
  isTimePlaying: false,
  timePlayInterval: null,
  isAutoRotating: false,
  showCurrents: true,
  showMarineLayer: true,
  activeGraphTab: "temperature"
};

// ==========================================================================
// 3. THREE.JS 3D GLOBE & OCEAN VISUALIZATION ENGINE
// ==========================================================================

let scene, camera, renderer, controls;
let globeMesh, cloudsMesh, atmosphereMesh, oceanCurrentsGroup, markersGroup, labelsGroup;
let raycaster, mouse;
let targetCameraPos = null, isAnimatingCamera = false;

function initThreeGlobe() {
  const container = document.getElementById("canvasContainer");
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x01060f);

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 15, 38);

  // WebGL Renderer
  const canvas = document.getElementById("globeCanvas");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.8;
  controls.minDistance = 14;
  controls.maxDistance = 55;
  controls.enablePan = false;

  // Lights
  const ambientLight = new THREE.AmbientLight(0x334466, 1.2);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
  sunLight.position.set(40, 20, 30);
  scene.add(sunLight);

  const secondarySunLight = new THREE.DirectionalLight(0x00f2fe, 0.6);
  secondarySunLight.position.set(-30, -10, -20);
  scene.add(secondarySunLight);

  // Raycaster & Mouse for Interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Build Globe Meshes
  createRealisticGlobe();
  createStarfield();
  createAtmosphereGlow();
  createOceanCurrentStreamlines();
  createSensorMarkers();
  createOcean3DLabels();

  // Initial focus on Indian Ocean / Bay of Bengal
  flyToLocation(OCEAN_REGIONS.bay_of_bengal.lat, OCEAN_REGIONS.bay_of_bengal.lon, 28, 1200);

  // Window Resize Listener
  window.addEventListener("resize", onWindowResize);

  // Canvas Mouse Move & Click Listeners for 3D Beacons
  canvas.addEventListener("mousemove", onCanvasMouseMove);
  canvas.addEventListener("click", onCanvasClick);

  // Start Render Loop
  animateThreeLoop();
}

/**
 * Creates High-Resolution Realistic Earth Texture via Procedural Canvas
 * Ensures 100% offline & CORS-free reliability with bathymetry, topography, and ocean specular sheen.
 */
function createRealisticGlobe() {
  const globeRadius = 10;
  const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);

  // Create High-Fidelity Procedural Earth Texture
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 2048;
  textureCanvas.height = 1024;
  const ctx = textureCanvas.getContext("2d");

  // 1. Deep Ocean Base with Bathymetric Gradients
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  oceanGrad.addColorStop(0.0, "#08182d"); // Polar deep
  oceanGrad.addColorStop(0.25, "#0b254a");
  oceanGrad.addColorStop(0.5, "#073b6a"); // Tropical vibrant
  oceanGrad.addColorStop(0.75, "#0b254a");
  oceanGrad.addColorStop(1.0, "#08182d");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // 2. Draw Realistic Continents (Equirectangular Map Projection)
  ctx.fillStyle = "#1b382b"; // Lush dark land
  ctx.strokeStyle = "#2e5c46";
  ctx.lineWidth = 2;

  drawContinentPolygons(ctx, 2048, 1024);

  // 3. Ice Caps (Arctic & Antarctic)
  const polarGradN = ctx.createLinearGradient(0, 0, 0, 160);
  polarGradN.addColorStop(0, "rgba(220, 240, 255, 0.95)");
  polarGradN.addColorStop(1, "rgba(220, 240, 255, 0)");
  ctx.fillStyle = polarGradN;
  ctx.fillRect(0, 0, 2048, 160);

  const polarGradS = ctx.createLinearGradient(0, 1024 - 180, 0, 1024);
  polarGradS.addColorStop(0, "rgba(220, 240, 255, 0)");
  polarGradS.addColorStop(1, "rgba(220, 240, 255, 0.95)");
  ctx.fillStyle = polarGradS;
  ctx.fillRect(0, 1024 - 180, 2048, 180);

  // 4. Subtle Latitude / Longitude Scientific Grid
  ctx.strokeStyle = "rgba(0, 242, 254, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= 2048; x += 2048 / 12) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 1024 / 6) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }

  // Create Three.js Texture
  const earthTexture = new THREE.CanvasTexture(textureCanvas);
  earthTexture.anisotropy = 8;

  // Globe Material with Specular Ocean Reflection
  const globeMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 35,
    specular: new THREE.Color(0x00a8ff),
    emissive: new THREE.Color(0x020813),
    bumpScale: 0.05
  });

  globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globeMesh);

  // Clouds Layer (Rotating semi-transparent cloud sphere)
  createCloudsLayer(globeRadius);
}

/**
 * Draws Continent Polygons on Canvas
 */
function drawContinentPolygons(ctx, w, h) {
  function toX(lon) { return ((lon + 180) / 360) * w; }
  function toY(lat) { return ((90 - lat) / 180) * h; }

  // Array of simplified continent coordinates [ [lat, lon], ... ]
  const continents = [
    // India & South Asia (Detailed for MoES focus)
    [ [28, 68], [34, 74], [32, 78], [28, 88], [26, 92], [22, 90], [20, 86], [16, 82], [13, 80], [8.5, 77.5], [10, 76], [15, 74], [20, 72.8], [24, 69] ],
    // Sri Lanka
    [ [9.5, 80.2], [8.0, 81.5], [6.0, 80.5], [8.0, 79.8] ],
    // Southeast Asia & Indonesia
    [ [22, 92], [20, 106], [10, 105], [1, 104], [3, 101], [15, 99], [18, 96] ],
    [ [5, 95], [-5, 106], [-8, 115], [-6, 106], [1, 98] ],
    // Africa
    [ [36, -5], [37, 10], [32, 32], [12, 44], [12, 51], [0, 42], [-15, 40], [-34, 26], [-34, 18], [-18, 12], [4, 9], [6, 2], [5, -4], [14, -17], [28, -13], [36, -5] ],
    // Madagascar
    [ [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-16, 44] ],
    // Eurasia
    [ [36, -5], [44, 0], [50, 2], [54, 8], [60, 10], [70, 28], [72, 70], [76, 110], [66, 170], [60, 162], [45, 140], [35, 120], [22, 114], [22, 98], [28, 68], [36, 50], [40, 30], [36, 28] ],
    // Australia
    [ [-12, 131], [-15, 136], [-12, 142], [-22, 150], [-34, 151], [-38, 145], [-35, 115], [-22, 114], [-14, 126] ],
    // North America
    [ [70, -160], [72, -120], [60, -80], [50, -60], [42, -70], [30, -80], [25, -80], [18, -95], [15, -92], [20, -105], [32, -117], [48, -124], [60, -140], [65, -168] ],
    // South America
    [ [12, -72], [10, -62], [-5, -35], [-22, -41], [-35, -53], [-55, -67], [-50, -75], [-18, -71], [-5, -81], [8, -78] ]
  ];

  continents.forEach(poly => {
    ctx.beginPath();
    poly.forEach((pt, idx) => {
      const x = toX(pt[1]);
      const y = toY(pt[0]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}

/**
 * Creates Clouds Layer
 */
function createCloudsLayer(radius) {
  const cloudGeo = new THREE.SphereGeometry(radius * 1.015, 48, 48);

  const cloudCanvas = document.createElement("canvas");
  cloudCanvas.width = 1024;
  cloudCanvas.height = 512;
  const cctx = cloudCanvas.getContext("2d");

  // Draw semi-transparent atmospheric cloud swirls
  cctx.fillStyle = "rgba(255, 255, 255, 0.28)";
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * 1024;
    const cy = Math.random() * 512;
    const cr = 30 + Math.random() * 60;
    cctx.beginPath();
    cctx.arc(cx, cy, cr, 0, Math.PI * 2);
    cctx.fill();
  }

  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });

  cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
  scene.add(cloudsMesh);
}

/**
 * Realistic Atmospheric Rim Glow Shader
 */
function createAtmosphereGlow() {
  const atmoGeo = new THREE.SphereGeometry(10.6, 48, 48);
  const atmoMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
        gl_FragColor = vec4(0.0, 0.85, 1.0, 1.0) * intensity * 0.8;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });

  atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
  scene.add(atmosphereMesh);
}

/**
 * Starfield Background with realistic twinkling particles
 */
function createStarfield() {
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1800;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    const r = 180 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i] = r * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = r * Math.cos(phi);

    // Subtle blue/white star tints
    colors[i] = 0.7 + Math.random() * 0.3;
    colors[i + 1] = 0.8 + Math.random() * 0.2;
    colors[i + 2] = 1.0;
  }

  starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);
}

/**
 * Converts Latitude and Longitude to 3D Sphere Coordinates
 */
function latLonToVector3(lat, lon, radius = 10) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * Creates 3D Ocean Current Streamlines and Particle Flow
 */
function createOceanCurrentStreamlines() {
  oceanCurrentsGroup = new THREE.Group();

  // Major Global Ocean Current Paths [ [lat, lon], ... ]
  const currentTrajectories = [
    // Indian Ocean: Somali Current & Monsoon Drift
    [ [0, 48], [8, 52], [14, 58], [15, 70], [12, 85], [10, 92], [5, 90], [0, 80] ],
    // Indian Ocean: Agulhas Current
    [ [-10, 45], [-20, 38], [-30, 32], [-36, 22], [-40, 30], [-35, 60], [-25, 80] ],
    // Bay of Bengal Gyre
    [ [10, 82], [14, 82], [18, 86], [16, 92], [11, 90], [10, 82] ],
    // Arabian Sea Anticyclonic Circulation
    [ [12, 60], [16, 60], [19, 64], [18, 70], [14, 68], [12, 60] ],
    // Atlantic: Gulf Stream & North Atlantic Drift
    [ [24, -80], [30, -75], [38, -60], [45, -40], [52, -20], [60, -5] ],
    // Pacific: Kuroshio Current
    [ [15, 128], [24, 126], [32, 136], [38, 148], [42, 165], [40, 180] ],
    // Southern Ocean: Antarctic Circumpolar Current
    [ [-55, -60], [-54, 0], [-56, 60], [-55, 120], [-53, 180], [-55, -120], [-55, -60] ]
  ];

  currentTrajectories.forEach((traj, idx) => {
    const points = traj.map(pt => latLonToVector3(pt[0], pt[1], 10.15));
    const curve = new THREE.CatmullRomCurve3(points, true);
    
    // Tube Geometry for Glow Streamline
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.05, 6, true);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: idx < 4 ? 0x00f2fe : 0x4facfe,
      transparent: true,
      opacity: 0.55
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    oceanCurrentsGroup.add(tubeMesh);

    // Particle Sprites along the current path
    const particleCount = 20;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const u = p / particleCount;
      const pt = curve.getPoint(u);
      particlePositions[p * 3] = pt.x;
      particlePositions[p * 3 + 1] = pt.y;
      particlePositions[p * 3 + 2] = pt.z;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38ef7d,
      size: 0.45,
      transparent: true,
      opacity: 0.9
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particleSystem.userData = { curve: curve, speed: 0.003 + (idx % 3) * 0.001 };
    oceanCurrentsGroup.add(particleSystem);
  });

  scene.add(oceanCurrentsGroup);
}

/**
 * Creates 3D Beacon Markers for In-Situ Sensors & Anomaly Hotspots
 */
function createSensorMarkers() {
  markersGroup = new THREE.Group();

  // 1. In-Situ Observation Stations (Argo, Buoys, Ships, Radar)
  SENSORS_DATA.forEach(sensor => {
    const pos = latLonToVector3(sensor.lat, sensor.lon, 10.2);

    // Marker Pin Anchor
    const pinGroup = new THREE.Group();
    pinGroup.position.copy(pos);
    pinGroup.lookAt(new THREE.Vector3(0, 0, 0)); // Align with surface normal

    // Colored Core Sphere
    let markerColor = 0x00f2fe; // Buoy / General
    if (sensor.type === "argo") markerColor = 0x4facfe;
    else if (sensor.type === "ship") markerColor = 0x00e676;
    else if (sensor.type === "station") markerColor = 0xffd166;

    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: markerColor });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.userData = { isSensor: true, sensorData: sensor };
    pinGroup.add(coreMesh);

    // Pulsing Outer Wave Ring
    const ringGeo = new THREE.RingGeometry(0.24, 0.38, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: markerColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.userData = { isRing: true, baseScale: 1.0 };
    pinGroup.add(ringMesh);

    markersGroup.add(pinGroup);
  });

  // 2. Ocean Anomaly Hotspots (Pulsating Red Beacons)
  ANOMALIES_DATA.forEach(anomaly => {
    const pos = latLonToVector3(anomaly.lat, anomaly.lon, 10.25);
    const anomGroup = new THREE.Group();
    anomGroup.position.copy(pos);

    const anomGeo = new THREE.SphereGeometry(0.26, 16, 16);
    const anomMat = new THREE.MeshBasicMaterial({ color: 0xff5252 });
    const anomMesh = new THREE.Mesh(anomGeo, anomMat);
    anomMesh.userData = { isAnomaly: true, anomalyData: anomaly };
    anomGroup.add(anomMesh);

    // Anomaly Warning Ring
    const anomRingGeo = new THREE.RingGeometry(0.35, 0.6, 24);
    const anomRingMat = new THREE.MeshBasicMaterial({
      color: 0xff5252,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const anomRingMesh = new THREE.Mesh(anomRingGeo, anomRingMat);
    anomRingMesh.userData = { isAnomalyRing: true };
    anomGroup.add(anomRingMesh);

    markersGroup.add(anomGroup);
  });

  scene.add(markersGroup);
}

/**
 * Creates 3D Ocean Basin Labels
 */
function createOcean3DLabels() {
  labelsGroup = new THREE.Group();

  const labels = [
    { text: "INDIAN OCEAN", lat: -10, lon: 78 },
    { text: "BAY OF BENGAL", lat: 15, lon: 88 },
    { text: "ARABIAN SEA", lat: 17, lon: 65 },
    { text: "PACIFIC OCEAN", lat: 0, lon: 165 },
    { text: "ATLANTIC OCEAN", lat: 20, lon: -40 },
    { text: "ARCTIC OCEAN", lat: 80, lon: 10 },
    { text: "SOUTHERN OCEAN", lat: -58, lon: 30 }
  ];

  labels.forEach(lbl => {
    const pos = latLonToVector3(lbl.lat, lbl.lon, 10.35);

    // Create Canvas Text Sprite
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 80;
    const ctx = canvas.getContext("2d");

    ctx.font = "bold 26px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "rgba(0, 242, 254, 0.85)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#00f2fe";
    ctx.shadowBlur = 8;
    ctx.fillText(lbl.text, 160, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.85
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(pos);
    sprite.scale.set(3.5, 0.88, 1);

    labelsGroup.add(sprite);
  });

  scene.add(labelsGroup);
}

/**
 * Smooth Camera Fly-To Navigation with Spherical Coordinates Interpolation
 */
function flyToLocation(lat, lon, targetDistance = 28, duration = 1200) {
  const targetPos = latLonToVector3(lat, lon, targetDistance);
  const startPos = camera.position.clone();
  const startTime = performance.now();

  isAnimatingCamera = true;
  controls.enabled = false;

  function updateFlyTo(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1.0);
    // Smooth easeInOutCubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    camera.position.lerpVectors(startPos, targetPos, ease);
    camera.lookAt(0, 0, 0);

    if (progress < 1.0) {
      requestAnimationFrame(updateFlyTo);
    } else {
      isAnimatingCamera = false;
      controls.enabled = true;
      controls.update();
    }
  }

  requestAnimationFrame(updateFlyTo);
}

/**
 * Three.js Main Render & Animation Loop
 */
function animateThreeLoop() {
  requestAnimationFrame(animateThreeLoop);

  // 1. Slow subtle globe & cloud rotation if auto-rotation is on
  if (AppState.isAutoRotating && !isAnimatingCamera) {
    globeMesh.rotation.y += 0.001;
    if (cloudsMesh) cloudsMesh.rotation.y += 0.0014;
  } else if (cloudsMesh) {
    cloudsMesh.rotation.y += 0.0003;
  }

  // 2. Animate Marker Pulsing Waves
  if (markersGroup) {
    const time = performance.now() * 0.003;
    markersGroup.children.forEach(group => {
      group.children.forEach(mesh => {
        if (mesh.userData.isRing) {
          const s = 1.0 + 0.3 * Math.sin(time + mesh.id);
          mesh.scale.set(s, s, s);
          mesh.material.opacity = 0.8 - 0.4 * (s - 1.0);
        } else if (mesh.userData.isAnomalyRing) {
          const s = 1.0 + 0.5 * Math.sin(time * 2 + mesh.id);
          mesh.scale.set(s, s, s);
          mesh.material.opacity = 0.9 - 0.5 * (s - 1.0);
        }
      });
    });
  }

  // 3. Animate Ocean Current Flow Particles
  if (oceanCurrentsGroup && AppState.showCurrents) {
    const time = performance.now();
    oceanCurrentsGroup.children.forEach(child => {
      if (child.isPoints && child.userData.curve) {
        const positions = child.geometry.attributes.position.array;
        const curve = child.userData.curve;
        const count = positions.length / 3;
        const speed = child.userData.speed;

        for (let p = 0; p < count; p++) {
          let u = (p / count + time * speed * 0.05) % 1.0;
          const pt = curve.getPoint(u);
          positions[p * 3] = pt.x;
          positions[p * 3 + 1] = pt.y;
          positions[p * 3 + 2] = pt.z;
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
  }

  // Controls update
  controls.update();

  // Render Scene
  renderer.render(scene, camera);
}

/**
 * Handle Window Resize
 */
function onWindowResize() {
  const container = document.getElementById("canvasContainer");
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

/**
 * Raycasting Canvas Mouse Move for Tooltips
 */
function onCanvasMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Check intersections with markers
  const intersects = raycaster.intersectObjects(markersGroup.children, true);
  const tooltip = document.getElementById("sensorHoverTooltip");

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.userData && (obj.userData.isSensor || obj.userData.isAnomaly)) {
      document.body.style.cursor = "pointer";

      if (obj.userData.isSensor) {
        const s = obj.userData.sensorData;
        document.getElementById("tooltipHeader").textContent = `${s.name} (${s.id})`;
        document.getElementById("tooltipBody").innerHTML = `
          <strong>Type:</strong> ${s.typeLabel}<br>
          <strong>Region:</strong> ${s.regionName}<br>
          <strong>Temp:</strong> ${s.temp}°C (Obs) vs ${s.modelTemp}°C (Model)<br>
          <strong>Salinity:</strong> ${s.salinity} PSU • <strong>Depth:</strong> ${s.depth}m
        `;
      } else if (obj.userData.isAnomaly) {
        const a = obj.userData.anomalyData;
        document.getElementById("tooltipHeader").textContent = `⚠️ ${a.name}`;
        document.getElementById("tooltipBody").innerHTML = `
          <strong>Anomaly:</strong> ${a.type}<br>
          <strong>Severity:</strong> <span style="color:#ff5252">${a.severity}</span> (${a.deltaTemp})<br>
          <strong>Observation:</strong> ${a.modelVal} vs ${a.obsVal}
        `;
      }

      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY}px`;
      tooltip.style.display = "block";
      return;
    }
  }

  document.body.style.cursor = "default";
  tooltip.style.display = "none";
}

/**
 * Raycasting Canvas Click to Open Sensor Details
 */
function onCanvasClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(markersGroup.children, true);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.userData && obj.userData.isSensor) {
      openSensorModal(obj.userData.sensorData);
    } else if (obj.userData && obj.userData.isAnomaly) {
      const anom = obj.userData.anomalyData;
      selectOceanRegion(anom.locationKey);
      showToast(`Inspecting Anomaly: ${anom.name} (${anom.deltaTemp})`, "alert");
    }
  }
}

// ==========================================================================
// 4. SCIENTIFIC CALCULATIONS & UI DATA SYNC
// ==========================================================================

/**
 * Selects an active Ocean Region and updates all dashboard modules
 */
function selectOceanRegion(regionKey) {
  const region = OCEAN_REGIONS[regionKey];
  if (!region) return;

  AppState.currentOceanKey = regionKey;

  // 1. Smoothly fly 3D Camera to the region
  flyToLocation(region.lat, region.lon, region.zoom * 10, 1100);

  // 2. Update HUD Overlay
  document.getElementById("hudRegionName").textContent = `${region.name} • ${region.subname}`;
  document.getElementById("hudCoords").textContent = `${Math.abs(region.lat).toFixed(2)}° ${region.lat >= 0 ? 'N' : 'S'}, ${Math.abs(region.lon).toFixed(2)}° ${region.lon >= 0 ? 'E' : 'W'} • Alt: ${(region.zoom * 850).toFixed(0)} km`;

  // 3. Update Global Ocean Tabs & Sea Tags active states
  document.querySelectorAll(".ocean-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-ocean") === regionKey);
  });
  document.querySelectorAll(".sea-tag").forEach(tag => {
    tag.classList.toggle("active", tag.getAttribute("data-location") === regionKey);
  });

  // 4. Select representative sensor for this region
  const regionalSensor = SENSORS_DATA.find(s => s.region === regionKey) || SENSORS_DATA[0];
  AppState.selectedSensor = regionalSensor;

  // 5. Update Model vs Observation Card
  updateModelVsObservationCard();

  // 6. Update Top Statistics & Anomaly Panel
  updateStatisticsAndAnomalies(region);

  // 7. Update Marine Ecosystem Impact Card
  updateMarineImpactCard(region);

  // 8. Re-draw Depth Profile Chart
  drawOceanProfileChart();
}

/**
 * Updates the core MODEL vs REAL OBSERVATION card
 */
function updateModelVsObservationCard() {
  const sensor = AppState.selectedSensor;
  const paramKey = AppState.currentParam;
  const paramCfg = PARAM_CONFIG[paramKey];
  const depthLayer = DEPTH_LAYERS[AppState.currentDepthIdx];
  const timeStep = TIME_STEPS[AppState.currentTimeIdx];

  // Calculate realistic simulated depth and temporal adjustments
  let baseObsVal = sensor[paramCfg.field] || 28.0;
  let baseModelVal = sensor[paramCfg.modelField] || (baseObsVal + 0.6);

  // Adjust for depth layer
  let depthFactor = 1.0;
  if (paramKey === "temperature") depthFactor = depthLayer.tempFactor;
  else if (paramKey === "salinity") depthFactor = depthLayer.salinityFactor;
  else if (paramKey === "dissolved_oxygen") depthFactor = depthLayer.o2Factor;

  let obsVal = baseObsVal * depthFactor;
  let modelVal = (baseModelVal + timeStep.tempBias) * depthFactor;

  // Formatting values
  let decimals = paramKey === "currents" || paramKey === "sea_level" ? 2 : 1;
  let obsStr = `${obsVal.toFixed(decimals)} ${paramCfg.unit}`;
  let modelStr = `${modelVal.toFixed(decimals)} ${paramCfg.unit}`;

  // Difference Delta
  let diff = modelVal - obsVal;
  let diffSign = diff >= 0 ? "+" : "";
  let diffStr = `${diffSign}${diff.toFixed(decimals)} ${paramCfg.unit}`;

  // Accuracy calculation: 100 - ( |diff| / max_range * 100 )
  let range = paramCfg.max - paramCfg.min;
  let accuracy = Math.max(88, Math.min(99.4, (100 - (Math.abs(diff) / range) * 100))).toFixed(1);

  // Update DOM Elements
  document.getElementById("compLocationName").textContent = `${sensor.name} (${sensor.regionName})`;
  document.getElementById("compParamName").textContent = `Parameter: ${paramCfg.name} (${depthLayer.label})`;
  document.getElementById("modelValDisplay").textContent = modelStr;
  document.getElementById("obsValDisplay").textContent = obsStr;
  document.getElementById("obsSourceDisplay").textContent = `${sensor.typeLabel} #${sensor.id}`;
  
  const diffElem = document.getElementById("diffValDisplay");
  diffElem.textContent = diffStr;
  diffElem.className = `comp-diff ${diff >= 0 ? 'positive' : 'negative'}`;

  document.getElementById("accuracyScoreBadge").textContent = `Accuracy: ${accuracy}%`;

  // Dual Progress Bar Gauge Percentages
  let pctModel = Math.max(10, Math.min(95, ((modelVal - paramCfg.min) / range) * 100));
  let pctObs = Math.max(10, Math.min(95, ((obsVal - paramCfg.min) / range) * 100));

  document.getElementById("modelBarFill").style.width = `${pctModel}%`;
  document.getElementById("obsBarFill").style.width = `${pctObs}%`;
  document.getElementById("gaugeNeedle").style.left = `${(pctModel + pctObs) / 2}%`;
}

/**
 * Updates Top Statistics and Anomaly Card
 */
function updateStatisticsAndAnomalies(region) {
  document.getElementById("statAvgTemp").textContent = `${region.tempAvg.toFixed(1)}°C`;
  document.getElementById("statModelConvergence").textContent = `${region.modelConvergence.toFixed(1)}%`;
  document.getElementById("statAnomalies").textContent = region.anomaliesCount;

  // Anomaly Card
  const activeAnomaly = ANOMALIES_DATA.find(a => a.locationKey === AppState.currentOceanKey) || ANOMALIES_DATA[0];
  document.getElementById("anomalyLocName").textContent = activeAnomaly.name;
  document.getElementById("anomalyDelta").textContent = `${activeAnomaly.deltaTemp} (${activeAnomaly.type})`;
  document.getElementById("anomalyExplanation").textContent = activeAnomaly.explanation;

  const badge = document.getElementById("anomalySeverityBadge");
  badge.textContent = `${activeAnomaly.severity} ALERT`;
  badge.className = `severity-badge severity-${activeAnomaly.severityClass}`;
}

/**
 * Updates Marine Ecosystem Impact Analysis
 */
function updateMarineImpactCard(region) {
  const tempStressElem = document.getElementById("tempStressVal");
  const oxygenStressElem = document.getElementById("oxygenStressVal");
  const salinityStressElem = document.getElementById("salinityStressVal");
  const overallRiskElem = document.getElementById("overallEcosystemRisk");
  const advisoryElem = document.getElementById("marineAdvisoryText");

  if (region.statusType === "high" || region.tempAvg > 29.0) {
    tempStressElem.textContent = "HIGH";
    tempStressElem.className = "stress-val stress-high";
    overallRiskElem.textContent = "RISK: ELEVATED";
    overallRiskElem.className = "risk-badge risk-moderate";
    advisoryElem.textContent = `“Persistent elevated SST in ${region.name} may trigger thermal stress in sensitive coral reef ecosystems (Gulf of Mannar & Andaman) and displace pelagic fish migrations.”`;
  } else if (region.statusType === "moderate") {
    tempStressElem.textContent = "MODERATE";
    tempStressElem.className = "stress-val stress-low";
    overallRiskElem.textContent = "RISK: MODERATE";
    advisoryElem.textContent = `“Moderate temperature and salinity variance detected. Localized monitoring recommended for benthic and coastal aquaculture zones.”`;
  } else {
    tempStressElem.textContent = "NORMAL";
    tempStressElem.className = "stress-val stress-normal";
    overallRiskElem.textContent = "RISK: LOW";
    advisoryElem.textContent = `“Oceanographic indicators are within normal seasonal baselines. No widespread marine ecological stress detected.”`;
  }
}

// ==========================================================================
// 5. HTML5 CANVAS CHART RENDERING ENGINE
// ==========================================================================

/**
 * Draws Vertical Ocean Profile (Depth 0–1000m vs Parameter)
 */
function drawOceanProfileChart() {
  const canvas = document.getElementById("oceanProfileCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  // Clear Canvas
  ctx.clearRect(0, 0, w, h);

  const padLeft = 45;
  const padRight = 20;
  const padTop = 15;
  const padBottom = 25;
  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBottom;

  const activeTab = AppState.activeGraphTab; // temperature, salinity, oxygen
  const sensor = AppState.selectedSensor;

  // Setup scale ranges based on active profile tab
  let minVal = 0, maxVal = 32, unit = "°C";
  if (activeTab === "temperature") {
    minVal = 4; maxVal = 32; unit = "°C";
  } else if (activeTab === "salinity") {
    minVal = 32; maxVal = 37; unit = "PSU";
  } else if (activeTab === "oxygen") {
    minVal = 1; maxVal = 8; unit = "mg/L";
  }

  // 1. Draw Gridlines & Axes
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#8b9bb4";
  ctx.font = "9.5px 'JetBrains Mono', monospace";

  // Depth Horizontal Lines (0m, 100m, 200m, 500m, 1000m)
  const depths = [0, 100, 200, 500, 1000];
  depths.forEach((d, i) => {
    const y = padTop + (i / (depths.length - 1)) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();

    ctx.textAlign = "right";
    ctx.fillText(`${d}m`, padLeft - 6, y + 3);
  });

  // Parameter Vertical Ticks on Bottom
  const valTicks = 4;
  for (let i = 0; i <= valTicks; i++) {
    const x = padLeft + (i / valTicks) * chartW;
    const val = (minVal + (i / valTicks) * (maxVal - minVal)).toFixed(1);

    ctx.beginPath();
    ctx.moveTo(x, padTop);
    ctx.lineTo(x, padTop + chartH);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillText(`${val}`, x, h - 8);
  }

  // 2. Generate Simulated Vertical Profile Points
  // Thermocline curve for temp, halocline for salinity, OMZ for oxygen
  const profileDepths = [0, 50, 100, 200, 350, 500, 750, 1000];

  function getParamAtDepth(depth, isModel) {
    const bias = isModel ? 0.6 : 0.0;
    if (activeTab === "temperature") {
      // Classic thermocline decay: T(z) = T_deep + (T_surf - T_deep) * exp(-z / z0)
      const surf = (sensor.temp || 28.5) + bias;
      const deep = 4.2;
      return deep + (surf - deep) * Math.exp(-depth / 260);
    } else if (activeTab === "salinity") {
      const surf = (sensor.salinity || 33.5) + (isModel ? 0.3 : 0.0);
      return surf + 1.8 * (1 - Math.exp(-depth / 200));
    } else { // Oxygen Minimum Zone (OMZ) at 200-400m
      const surf = (sensor.oxygen || 5.2) + bias;
      if (depth < 300) return surf - (surf - 1.8) * (depth / 300);
      return 1.8 + 2.5 * ((depth - 300) / 700);
    }
  }

  function depthToY(d) {
    // Non-linear depth scaling to emphasize surface & thermocline
    const depthFrac = Math.pow(d / 1000, 0.65);
    return padTop + depthFrac * chartH;
  }

  function valToX(v) {
    const frac = (v - minVal) / (maxVal - minVal);
    return padLeft + Math.max(0, Math.min(1, frac)) * chartW;
  }

  // 3. Draw Numerical Model Line (Cyan)
  ctx.beginPath();
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 2;
  profileDepths.forEach((d, idx) => {
    const val = getParamAtDepth(d, true);
    const x = valToX(val);
    const y = depthToY(d);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // 4. Draw In-Situ Observation Points & Line (Emerald)
  ctx.beginPath();
  ctx.strokeStyle = "#00e676";
  ctx.lineWidth = 2;
  profileDepths.forEach((d, idx) => {
    const val = getParamAtDepth(d, false);
    const x = valToX(val);
    const y = depthToY(d);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw Observation Point Dots
  profileDepths.forEach(d => {
    const val = getParamAtDepth(d, false);
    const x = valToX(val);
    const y = depthToY(d);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#00e676";
    ctx.fill();
    ctx.strokeStyle = "#040d1a";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

/**
 * Draws Deep Compare Modal 7-Day Time-Series Forecast vs Observations
 */
function drawCompareModalChart() {
  const canvas = document.getElementById("compareModalCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const padLeft = 50;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 35;
  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBottom;

  // Draw Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#8b9bb4";
  ctx.font = "10px 'JetBrains Mono', monospace";

  const days = ["25 Aug", "26 Aug", "27 Aug", "28 Aug", "29 Aug", "30 Aug", "31 Aug"];
  days.forEach((day, idx) => {
    const x = padLeft + (idx / (days.length - 1)) * chartW;
    ctx.beginPath();
    ctx.moveTo(x, padTop);
    ctx.lineTo(x, padTop + chartH);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillText(day, x, h - 12);
  });

  const tempTicks = [26.0, 27.0, 28.0, 29.0, 30.0];
  tempTicks.forEach(t => {
    const y = padTop + (1 - (t - 26.0) / 4.0) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();

    ctx.textAlign = "right";
    ctx.fillText(`${t.toFixed(1)}°C`, padLeft - 8, y + 3);
  });

  // Simulated Model Curve vs In-Situ Points
  const modelTemps = [28.2, 28.5, 28.9, 29.1, 29.4, 29.2, 29.1];
  const obsTemps = [28.0, 28.3, 28.6, 28.8, 28.9, 28.5, 28.3];

  // Draw Model Curve
  ctx.beginPath();
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 3;
  modelTemps.forEach((t, idx) => {
    const x = padLeft + (idx / (days.length - 1)) * chartW;
    const y = padTop + (1 - (t - 26.0) / 4.0) * chartH;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw In-Situ Observed Points & Dashed Line
  ctx.beginPath();
  ctx.strokeStyle = "#00e676";
  ctx.setLineDash([5, 5]);
  ctx.lineWidth = 2;
  obsTemps.forEach((t, idx) => {
    const x = padLeft + (idx / (days.length - 1)) * chartW;
    const y = padTop + (1 - (t - 26.0) / 4.0) * chartH;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Observation Dots
  obsTemps.forEach((t, idx) => {
    const x = padLeft + (idx / (days.length - 1)) * chartW;
    const y = padTop + (1 - (t - 26.0) / 4.0) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#00e676";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

/**
 * Draws CTD Profile in Sensor Detail Modal
 */
function drawSensorModalCTD(sensor) {
  const canvas = document.getElementById("sensorModalCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillStyle = "#8b9bb4";
  ctx.font = "9.5px 'JetBrains Mono', monospace";

  const padLeft = 45, padRight = 30, padTop = 15, padBottom = 25;
  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBottom;

  // Axes
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop);
  ctx.lineTo(padLeft, padTop + chartH);
  ctx.lineTo(w - padRight, padTop + chartH);
  ctx.stroke();

  // Depth marks
  [0, 200, 500, 1000].forEach((d, i) => {
    const y = padTop + (i / 3) * chartH;
    ctx.textAlign = "right";
    ctx.fillText(`${d}m`, padLeft - 6, y + 3);
  });

  // Temperature CTD line
  ctx.beginPath();
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 2.5;
  const depths = [0, 50, 100, 250, 500, 750, 1000];
  depths.forEach((d, idx) => {
    const t = 4.0 + (sensor.temp - 4.0) * Math.exp(-d / 280);
    const x = padLeft + ((t - 2) / 30) * chartW;
    const y = padTop + (d / 1000) * chartH;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Legend
  ctx.fillStyle = "#00f2fe";
  ctx.textAlign = "left";
  ctx.fillText("● In-Situ CTD Temperature (°C)", padLeft + 10, padTop + 14);
}

// ==========================================================================
// 6. AI OCEAN ASSISTANT (NLP MOCK ENGINE)
// ==========================================================================

const AI_KNOWLEDGE_BASE = {
  temperature_high: {
    keywords: ["temperature", "hot", "warm", "anomaly", "high temp", "why is the temperature"],
    response: (region) => `Based on numerical model data (INCOIS ROMS) and in-situ buoy telemetry in the ${region.name}, the sea surface temperature is currently ${region.tempAvg.toFixed(1)}°C (approximately +1.2°C to +2.1°C above the climatological normal). This is driven by positive net surface heat flux, reduced monsoonal wind stirring, and cyclonic eddy convergence in the upper mixed layer.`
  },
  compare_data: {
    keywords: ["compare", "model vs", "sensor data", "accuracy", "difference", "bias"],
    response: (region) => `Comparing the numerical ocean model with in-situ Argo profiling floats and OMNI moored buoys in the ${region.name}: The model achieves a 94.2% convergence rate with a Root Mean Square Error (RMSE) of 0.41°C. A slight systematic positive bias (+0.28°C) is noted in the upper 50m thermocline layer due to unresolved sub-mesoscale vertical mixing.`
  },
  unusual_conditions: {
    keywords: ["unusual", "anomaly", "condition", "risk", "hazard", "cyclone", "surge"],
    response: (region) => `Active Ocean Anomalies Alert: The Northern Bay of Bengal is showing a Grade 2 Marine Heatwave (+2.1°C SST anomaly), while the Arabian Sea is experiencing elevated wave swell (3.8m – 4.4m). Coastal tide gauges in Visakhapatnam and Chennai indicate a +0.18m sea-level anomaly consistent with a developing low-pressure depression.`
  },
  marine_impact: {
    keywords: ["marine", "aquatic", "fish", "coral", "ecosystem", "bleaching", "reef"],
    response: (region) => `Ecosystem Stress Assessment: Elevated surface temperatures create moderate thermal stress for coral reef calcification in the Gulf of Mannar and Andaman shelf (Degree Heating Weeks: 2.8). Pelagic fish species (such as Indian oil sardine and tuna) may temporarily migrate to deeper, cooler subsurface thermocline layers (60m–100m).`
  },
  deepest_observation: {
    keywords: ["deepest", "depth", "deep", "abyssal", "bottom", "1000m", "profile"],
    response: (region) => `The deepest in-situ observation currently active in our digital twin is recorded by Argo Float #IN-1024 at a depth of 1,000 meters (with park-depth capabilities to 2,000m). At 1,000m depth in the ${region.name}, the abyssal water temperature is 4.8°C with a salinity of 34.82 PSU and dissolved oxygen of 5.1 mg/L.`
  },
  default: {
    response: (region, query) => `MoES OceanTwin 360 has processed your inquiry regarding "${query}" in the ${region.name}. Our digital twin integrates 1,248 active observation cycles with INCOIS numerical ocean models. Would you like to inspect vertical CTD profiles, compare sensor accuracy, or review marine ecosystem risk indices?`
  }
};

function handleAiQuery(queryText) {
  if (!queryText || !queryText.trim()) return;

  const chatContainer = document.getElementById("aiChatMessages");
  const currentRegion = OCEAN_REGIONS[AppState.currentOceanKey] || OCEAN_REGIONS.bay_of_bengal;

  // Append User Message
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "chat-msg user";
  userMsgDiv.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="msg-bubble">${escapeHTML(queryText)}</div>
  `;
  chatContainer.appendChild(userMsgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Append Typing Indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-msg assistant typing-msg";
  typingDiv.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-bubble">
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Simulate AI Thinking Delay
  setTimeout(() => {
    typingDiv.remove();

    // Match Query against Knowledge Base
    const lowerQ = queryText.toLowerCase();
    let responseText = null;

    for (const key in AI_KNOWLEDGE_BASE) {
      if (key === "default") continue;
      const entry = AI_KNOWLEDGE_BASE[key];
      if (entry.keywords.some(kw => lowerQ.includes(kw))) {
        responseText = entry.response(currentRegion);
        break;
      }
    }

    if (!responseText) {
      responseText = AI_KNOWLEDGE_BASE.default.response(currentRegion, queryText);
    }

    // Append Assistant Response
    const botMsgDiv = document.createElement("div");
    botMsgDiv.className = "chat-msg assistant";
    botMsgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble">${responseText}</div>
    `;
    chatContainer.appendChild(botMsgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 650);
}

// ==========================================================================
// 7. CSV & DATASET EXPORT ENGINE
// ==========================================================================

function exportSimulatedCsvDataset() {
  const headers = [
    "Station_ID",
    "Station_Name",
    "Region",
    "Latitude",
    "Longitude",
    "Sensor_Type",
    "Depth_m",
    "Date_Timestamp",
    "Parameter",
    "Numerical_Model_Val",
    "InSitu_Observed_Val",
    "Delta_Difference",
    "Accuracy_Pct",
    "QC_Flag",
    "Marine_Risk_Status"
  ];

  const rows = [];
  const activeDate = TIME_STEPS[AppState.currentTimeIdx].dateStr;
  const paramCfg = PARAM_CONFIG[AppState.currentParam];

  SENSORS_DATA.forEach(sensor => {
    const obsVal = sensor[paramCfg.field] || 28.0;
    const modelVal = sensor[paramCfg.modelField] || (obsVal + 0.6);
    const delta = (modelVal - obsVal).toFixed(2);
    const acc = (100 - (Math.abs(delta) / (paramCfg.max - paramCfg.min)) * 100).toFixed(1);

    rows.push([
      sensor.id,
      `"${sensor.name}"`,
      `"${sensor.regionName}"`,
      sensor.lat,
      sensor.lon,
      sensor.typeLabel,
      sensor.depth,
      `"${activeDate} 12:00:00 UTC"`,
      `"${paramCfg.name} (${paramCfg.unit})"`,
      modelVal.toFixed(2),
      obsVal.toFixed(2),
      delta,
      acc,
      `"${sensor.qc}"`,
      '"Normal/Moderate"'
    ]);
  });

  const csvContent = "data:text/csv;charset=utf-8," + [
    headers.join(","),
    ...rows.map(r => r.join(","))
  ].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `OceanTwin360_MoES_Dataset_${activeDate.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Exported OceanTwin 360 CSV Dataset successfully!", "success");
}

// ==========================================================================
// 8. EVENT LISTENERS & MODAL MANAGEMENT
// ==========================================================================

function setupEventListeners() {
  // Navigation Links View Switching
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.getAttribute("data-view");
      if (view === "explorer") {
        selectOceanRegion("indian");
      } else if (view === "observations") {
        openSensorListModal();
      } else if (view === "analytics") {
        openCompareModal();
      } else if (view === "marine-impact") {
        showToast("Switched to Marine Ecosystem Impact View", "success");
      }
    });
  });

  // Global Ocean Tab Click
  document.querySelectorAll(".ocean-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const oceanKey = tab.getAttribute("data-ocean");
      selectOceanRegion(oceanKey);
    });
  });

  // Regional Sea Tag Click
  document.querySelectorAll(".sea-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const locKey = tag.getAttribute("data-location");
      selectOceanRegion(locKey);
    });
  });

  // Parameter Selector Click
  document.querySelectorAll(".param-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".param-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const paramKey = btn.getAttribute("data-param");
      AppState.currentParam = paramKey;

      const cfg = PARAM_CONFIG[paramKey];
      document.getElementById("currentParamUnit").textContent = `${cfg.unit} (${cfg.name.split(' ')[0]})`;
      document.getElementById("legendTitle").textContent = `${cfg.name} Scale`;
      document.getElementById("legendUnit").textContent = `Range: ${cfg.min} – ${cfg.max} ${cfg.unit}`;
      document.getElementById("legendColorBar").style.background = cfg.gradient;

      const labelsDiv = document.getElementById("legendScaleLabels");
      labelsDiv.innerHTML = cfg.labels.map(lbl => `<span>${lbl}</span>`).join("");

      updateModelVsObservationCard();
      drawOceanProfileChart();
      showToast(`Parameter switched to ${cfg.name}`, "success");
    });
  });

  // Depth Slider Input
  const depthSlider = document.getElementById("depthSlider");
  depthSlider.addEventListener("input", (e) => {
    const idx = parseInt(e.target.value);
    AppState.currentDepthIdx = idx;
    const layer = DEPTH_LAYERS[idx];

    document.getElementById("depthValueDisplay").textContent = layer.label;
    document.querySelectorAll(".depth-ticks .tick").forEach((tick, i) => {
      tick.classList.toggle("active", i === idx);
    });

    updateModelVsObservationCard();
    drawOceanProfileChart();
  });

  // Time Slider & Play Animation
  const timeSlider = document.getElementById("timeSlider");
  const playTimeBtn = document.getElementById("playTimeBtn");

  timeSlider.addEventListener("input", (e) => {
    const idx = parseInt(e.target.value);
    AppState.currentTimeIdx = idx;
    const step = TIME_STEPS[idx];

    document.getElementById("dateValueDisplay").textContent = step.dateStr;
    updateModelVsObservationCard();
  });

  playTimeBtn.addEventListener("click", () => {
    AppState.isTimePlaying = !AppState.isTimePlaying;
    const icon = document.getElementById("playIcon");
    const text = document.getElementById("playBtnText");

    if (AppState.isTimePlaying) {
      playTimeBtn.classList.add("playing");
      icon.className = "fa-solid fa-pause";
      text.textContent = "Pause";

      AppState.timePlayInterval = setInterval(() => {
        let nextIdx = (AppState.currentTimeIdx + 1) % TIME_STEPS.length;
        timeSlider.value = nextIdx;
        AppState.currentTimeIdx = nextIdx;
        document.getElementById("dateValueDisplay").textContent = TIME_STEPS[nextIdx].dateStr;
        updateModelVsObservationCard();
      }, 1000);
    } else {
      playTimeBtn.classList.remove("playing");
      icon.className = "fa-solid fa-play";
      text.textContent = "Play Time";
      clearInterval(AppState.timePlayInterval);
    }
  });

  // Profile Graph Tabs (Temp, Salinity, O2)
  document.querySelectorAll(".profile-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".profile-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      AppState.activeGraphTab = tab.getAttribute("data-graph");
      drawOceanProfileChart();
    });
  });

  // Camera Toolbar Controls
  document.getElementById("camResetBtn").addEventListener("click", () => {
    selectOceanRegion("bay_of_bengal");
  });
  document.getElementById("camZoomInBtn").addEventListener("click", () => {
    camera.position.multiplyScalar(0.85);
    controls.update();
  });
  document.getElementById("camZoomOutBtn").addEventListener("click", () => {
    camera.position.multiplyScalar(1.15);
    controls.update();
  });
  document.getElementById("camRotateToggleBtn").addEventListener("click", (e) => {
    AppState.isAutoRotating = !AppState.isAutoRotating;
    e.currentTarget.classList.toggle("active", AppState.isAutoRotating);
  });
  document.getElementById("camCurrentsToggleBtn").addEventListener("click", (e) => {
    AppState.showCurrents = !AppState.showCurrents;
    oceanCurrentsGroup.visible = AppState.showCurrents;
    e.currentTarget.classList.toggle("active", AppState.showCurrents);
  });

  // Global Location Search
  setupSearchAutocomplete();

  // AI Assistant Widget Toggle & Form
  const aiToggleBtn = document.getElementById("aiToggleBtn");
  const aiModal = document.getElementById("aiAssistantModal");
  const aiCloseBtn = document.getElementById("aiCloseBtn");

  aiToggleBtn.addEventListener("click", () => {
    aiModal.classList.toggle("open");
  });
  aiCloseBtn.addEventListener("click", () => {
    aiModal.classList.remove("open");
  });

  document.getElementById("aiInputForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("aiInputField");
    const val = input.value.trim();
    if (val) {
      handleAiQuery(val);
      input.value = "";
    }
  });

  document.querySelectorAll(".prompt-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const q = pill.getAttribute("data-question");
      handleAiQuery(q);
      aiModal.classList.add("open");
    });
  });

  // Deep Compare Modal Trigger
  document.getElementById("openCompareModalBtn").addEventListener("click", openCompareModal);
  document.getElementById("closeCompareModalBtn").addEventListener("click", closeCompareModal);
  document.getElementById("closeCompareModalBtn2").addEventListener("click", closeCompareModal);

  // Sensor Directory Modal Trigger
  document.getElementById("viewAllSensorsBtn").addEventListener("click", openSensorListModal);
  document.getElementById("closeSensorListModalBtn").addEventListener("click", closeSensorListModal);

  // Sensor Detail Modal Close
  document.getElementById("closeSensorModalBtn").addEventListener("click", closeSensorModal);

  // Notifications Modal
  document.getElementById("notificationsBtn").addEventListener("click", openNotificationsModal);
  document.getElementById("closeNotificationsModalBtn").addEventListener("click", closeNotificationsModal);

  // Download CSV Buttons
  document.getElementById("dataExportNavBtn").addEventListener("click", exportSimulatedCsvDataset);
  document.getElementById("downloadCsvBtnFooter").addEventListener("click", exportSimulatedCsvDataset);
  document.getElementById("downloadCompareCsvBtn").addEventListener("click", exportSimulatedCsvDataset);

  // Risk Feed Item Clicks
  document.querySelectorAll(".risk-alert-item").forEach(item => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-target");
      selectOceanRegion(target);
      showToast(`Navigated to Risk Zone: ${target.replace('_', ' ').toUpperCase()}`, "alert");
    });
  });

  // Anomaly Hotspot List Item Clicks
  document.querySelectorAll(".hotspot-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".hotspot-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const loc = item.getAttribute("data-loc");
      selectOceanRegion(loc);
    });
  });
}

/**
 * Global Search Autocomplete Setup
 */
function setupSearchAutocomplete() {
  const searchInput = document.getElementById("globalSearchInput");
  const suggestionsBox = document.getElementById("searchSuggestions");
  const clearBtn = document.getElementById("searchClearBtn");

  const searchableItems = [
    // Oceans
    { name: "Indian Ocean", key: "indian", type: "Ocean", lat: 5.0, lon: 78.0 },
    { name: "Pacific Ocean", key: "pacific", type: "Ocean", lat: 0.0, lon: 160.0 },
    { name: "Atlantic Ocean", key: "atlantic", type: "Ocean", lat: 18.0, lon: -40.0 },
    { name: "Arctic Ocean", key: "arctic", type: "Ocean", lat: 78.0, lon: 10.0 },
    { name: "Southern Ocean", key: "southern", type: "Ocean", lat: -55.0, lon: 30.0 },
    // Key Seas
    { name: "Bay of Bengal", key: "bay_of_bengal", type: "Sea", lat: 14.5, lon: 87.5 },
    { name: "Arabian Sea", key: "arabian_sea", type: "Sea", lat: 16.0, lon: 66.0 },
    { name: "Andaman Sea", key: "andaman_sea", type: "Sea", lat: 10.5, lon: 94.5 },
    { name: "South China Sea", key: "south_china_sea", type: "Sea", lat: 15.0, lon: 114.0 },
    { name: "Mediterranean Sea", key: "mediterranean", type: "Sea", lat: 35.0, lon: 18.0 },
    // Major Coastal Cities & Ports
    { name: "Chennai, India", key: "bay_of_bengal", type: "Coastal City", lat: 13.08, lon: 80.28 },
    { name: "Visakhapatnam, India", key: "bay_of_bengal", type: "Coastal City", lat: 17.68, lon: 83.22 },
    { name: "Kochi, India", key: "arabian_sea", type: "Coastal City", lat: 9.93, lon: 76.26 },
    { name: "Mumbai, India", key: "arabian_sea", type: "Coastal City", lat: 18.92, lon: 72.83 },
    { name: "Singapore", key: "south_china_sea", type: "Port City", lat: 1.35, lon: 103.82 },
    { name: "Tokyo, Japan", key: "pacific", type: "Port City", lat: 35.68, lon: 139.76 },
    { name: "New York, USA", key: "atlantic", type: "Coastal City", lat: 40.71, lon: -74.00 },
    { name: "London, UK", key: "atlantic", type: "Port City", lat: 51.50, lon: -0.12 },
    { name: "Sydney, Australia", key: "pacific", type: "Coastal City", lat: -33.86, lon: 151.20 },
    { name: "Cape Town, South Africa", key: "atlantic", type: "Coastal City", lat: -33.92, lon: 18.42 }
  ];

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();
    clearBtn.style.display = val ? "block" : "none";

    if (!val) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = searchableItems.filter(item => item.name.toLowerCase().includes(val));

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `<div style="padding:10px;color:#8b9bb4;font-size:11px;">No matching locations found.</div>`;
      suggestionsBox.style.display = "block";
      return;
    }

    suggestionsBox.innerHTML = matches.map(m => `
      <div class="search-suggestion-item" data-lat="${m.lat}" data-lon="${m.lon}" data-key="${m.key}">
        <div class="item-title"><i class="fa-solid fa-location-dot" style="color:#00f2fe"></i> ${m.name}</div>
        <div class="item-type">${m.type}</div>
      </div>
    `).join("");

    suggestionsBox.style.display = "block";

    // Item click listener
    suggestionsBox.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        const lat = parseFloat(item.getAttribute("data-lat"));
        const lon = parseFloat(item.getAttribute("data-lon"));
        const key = item.getAttribute("data-key");

        searchInput.value = item.querySelector(".item-title").textContent.trim();
        suggestionsBox.style.display = "none";

        if (OCEAN_REGIONS[key]) {
          selectOceanRegion(key);
        } else {
          flyToLocation(lat, lon, 24, 1100);
        }

        showToast(`Navigated to ${searchInput.value}`, "success");
      });
    });
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    suggestionsBox.style.display = "none";
  });

  // Close search suggestions on outside click
  document.addEventListener("click", (e) => {
    if (!document.getElementById("searchContainer").contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
}

// ==========================================================================
// 9. MODALS (Sensors, Deep Compare, Notifications)
// ==========================================================================

function openSensorModal(sensor) {
  AppState.selectedSensor = sensor;

  document.getElementById("modalSensorTitle").textContent = `${sensor.name} (${sensor.id})`;
  document.getElementById("modalSensorSub").textContent = `${sensor.regionName} • ${sensor.typeLabel}`;
  document.getElementById("modalSensorCoords").textContent = `${sensor.lat.toFixed(2)}° N, ${sensor.lon.toFixed(2)}° E`;
  document.getElementById("modalSensorDepth").textContent = `${sensor.depth} m`;
  document.getElementById("modalSensorTemp").textContent = `${sensor.temp.toFixed(1)}°C`;
  document.getElementById("modalSensorSalinity").textContent = `${sensor.salinity.toFixed(1)} PSU`;
  document.getElementById("modalSensorOxygen").textContent = `${sensor.oxygen.toFixed(1)} mg/L`;
  document.getElementById("modalSensorCurrent").textContent = `${sensor.current.toFixed(2)} m/s`;
  document.getElementById("modalSensorTime").textContent = sensor.lastTime;
  document.getElementById("modalSensorQC").textContent = sensor.qc;

  document.getElementById("sensorModalBackdrop").classList.add("open");

  // Draw Vertical CTD Sensor Graph
  drawSensorModalCTD(sensor);

  document.getElementById("modalFlyToSensorBtn").onclick = () => {
    closeSensorModal();
    flyToLocation(sensor.lat, sensor.lon, 20, 1000);
    showToast(`Focused on ${sensor.id}`, "success");
  };
}

function closeSensorModal() {
  document.getElementById("sensorModalBackdrop").classList.remove("open");
}

function openCompareModal() {
  document.getElementById("compareModalBackdrop").classList.add("open");
  drawCompareModalChart();
}

function closeCompareModal() {
  document.getElementById("compareModalBackdrop").classList.remove("open");
}

function openSensorListModal() {
  const tbody = document.getElementById("sensorTableBody");
  tbody.innerHTML = SENSORS_DATA.map(s => `
    <tr>
      <td><i class="fa-solid ${s.icon}" style="color:#00f2fe"></i> ${s.typeLabel}</td>
      <td><strong>${s.id}</strong> - ${s.name}</td>
      <td>${s.regionName}</td>
      <td>${s.lat.toFixed(2)}°, ${s.lon.toFixed(2)}°</td>
      <td><span style="color:#00f2fe">${s.temp}°C</span></td>
      <td>${s.salinity} PSU</td>
      <td>${s.depth}m</td>
      <td><span class="badge badge-pulse" style="font-size:9px">${s.qc}</span></td>
      <td>
        <button class="btn btn-sm btn-outline table-inspect-btn" data-id="${s.id}">Inspect</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".table-inspect-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const sensor = SENSORS_DATA.find(s => s.id === id);
      if (sensor) {
        closeSensorListModal();
        openSensorModal(sensor);
      }
    });
  });

  document.getElementById("sensorListModalBackdrop").classList.add("open");
}

function closeSensorListModal() {
  document.getElementById("sensorListModalBackdrop").classList.remove("open");
}

function openNotificationsModal() {
  const notifList = document.getElementById("notificationsList");
  notifList.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px;">
      <div style="background:rgba(255,82,82,0.15);border:1px solid rgba(255,82,82,0.4);border-radius:8px;padding:10px;">
        <div style="font-weight:700;color:#ff5252;margin-bottom:2px;">🚨 High Risk: Bay of Bengal Marine Heatwave</div>
        <div style="font-size:11px;color:#f0f6fc;">Simulated SST exceeds +2.1°C above baseline. Potential cyclone intensification advisory active.</div>
      </div>
      <div style="background:rgba(255,209,102,0.15);border:1px solid rgba(255,209,102,0.4);border-radius:8px;padding:10px;">
        <div style="font-weight:700;color:#ffd166;margin-bottom:2px;">⚠️ Swell Advisory: Arabian Sea High Waves</div>
        <div style="font-size:11px;color:#f0f6fc;">Directional wave swell 3.8m to 4.4m reported by OMNI Moored Buoy AD-01.</div>
      </div>
      <div style="background:rgba(0,230,118,0.15);border:1px solid rgba(0,230,118,0.4);border-radius:8px;padding:10px;">
        <div style="font-weight:700;color:#00e676;margin-bottom:2px;">✅ Telemetry Sync: 25 Sensors Online</div>
        <div style="font-size:11px;color:#f0f6fc;">All in-situ Argo floats and moored buoys passed Level-1 Quality Control checks.</div>
      </div>
    </div>
  `;
  document.getElementById("notificationsModalBackdrop").classList.add("open");
}

function closeNotificationsModal() {
  document.getElementById("notificationsModalBackdrop").classList.remove("open");
}

// Toast Notification
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'alert' ? 'fa-triangle-exclamation' : 'fa-circle-check'}" style="color:${type === 'alert' ? '#ff5252' : '#00e676'}"></i>
    <span>${escapeHTML(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// ==========================================================================
// 10. INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initThreeGlobe();
  setupEventListeners();
  selectOceanRegion("bay_of_bengal");
});
