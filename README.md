# OceanTwin 360: Global 3D Ocean Digital Twin Platform

**Smart India Hackathon 2026 Prototype**  
**Problem Statement ID:** SIH26067 — Ministry of Earth Sciences (MoES)  
**Title:** *“Develop a web-based interactive 3D visualization platform that integrates numerical ocean model outputs and in-situ observations.”*  

**Tagline:** *“Explore. Compare. Understand the Ocean.”*

---

## 🌊 Overview

**OceanTwin 360** is a state-of-the-art, web-based 3D scientific visualization digital twin engineered for the Ministry of Earth Sciences (MoES) and INCOIS (Indian National Centre for Ocean Information Services). The platform seamlessly integrates **high-resolution numerical ocean model outputs** (such as INCOIS ROMS, MOM, HYCOM) with real-time **in-situ observations** (Argo Profiling Floats, OMNI Moored Buoys, Research Vessels, and Coastal HF Radar / Tide Gauges).

Built using **HTML5, CSS3, Vanilla JavaScript, Three.js, and Google Maps JavaScript API**, OceanTwin 360 runs out of the box with zero build steps or npm installations.

---

## ✨ Key Features & Capabilities

### 1. 🌍 Realistic 3D Global Ocean Explorer & 🛰️ Google Maps Satellite GIS
* **Multi-Modal Visualizer:** Seamless 1-click switching between:
  * **3D Digital Twin Globe (Three.js WebGL):** Photorealistic planetary visualization with specular sun glints, atmospheric Fresnel glow, dynamic particle ocean current streamlines, and depth stratification.
  * **2D High-Resolution Satellite GIS (Google Maps):** Photorealistic satellite ocean tiles, hybrid coastal borders, topographic bathymetry, and a custom MoES **Dark Ocean Bathymetric GIS** theme.
* **In-Situ Sensor Network on Google Maps:** All 25+ Argo floats, OMNI buoys, RAMA stations, MoES research vessels, and coastal radar observatories rendered with custom SVG pins and dark glassmorphic telemetry InfoWindows.
* **Marine Anomaly Alert Zones:** Pulsing thermal warning circles highlighting heatwave centers directly on Google Maps.
* **Sensor Modal Satellite Fix:** Real-world Google Satellite telemetry viewport inside the sensor inspection modal showing buoy deployment coordinates at sea.
* **Synchronized Cross-Navigation:** Flying to any ocean basin, sea tag, or sensor coordinates smoothly animates both the 3D globe camera and Google Maps in sync.

### 2. 🔬 Model vs Real In-Situ Observation Comparator (Core SIH Feature)
* **Real-Time Data Pairing:** Directly compares numerical ocean model predictions against in-situ sensor telemetry for any focused coordinate.
* **Metric Breakdown:**
  * Numerical Model Value (e.g. INCOIS ROMS v3.8)
  * In-Situ Sensor Observed Value (e.g. OMNI Moored Buoy BD-08 / Argo #IN-1024)
  * Systematic Bias / Difference ($\Delta$)
  * Statistical Model Convergence & Accuracy Score (%)
* **Dual-Progress Comparison Gauge:** Dynamic visual deviation indicator comparing model and observed values with needle alignment.
* **Deep Compare Modal:** 7-day time series forecast vs observation chart rendering correlation ($R^2 = 0.968$), RMSE, and mean bias.

### 3. 🎛️ Multi-Dimensional Ocean Controls
* **Parameter Switcher:** Sea Surface Temperature (°C), Salinity (PSU), Current Velocity (m/s), Significant Wave Height (m), Sea Level Anomaly (m), and Dissolved Oxygen (mg/L).
* **Depth Stratification Slider:** Surface ($0\,\text{m}$), $50\,\text{m}$ (Subsurface), $100\,\text{m}$ (Thermocline/Halocline), $500\,\text{m}$ (Intermediate), and $1000\,\text{m}$ (Abyssal).
* **Temporal Timeline Scrubber:** Aug 25 to Aug 31, 2026 with **▶ Play Time** animated playback loop.

### 4. 📈 Vertical Ocean Depth Profile Graph (HTML5 Canvas)
* **High-Performance Canvas Graphing:** Real-time cross-sectional depth profiles ($0\,\text{m}$ to $1000\,\text{m}$) with smooth non-linear depth scaling.
* **Interactive Tabs:** Switch between Temperature (Thermocline), Salinity (Halocline), and Dissolved Oxygen (Oxygen Minimum Zone).
* **Dual Curves:** Model spline vs In-Situ CTD sensor data points.

### 5. ⚠️ Ocean Anomaly Detection & Hotspots
* **Marine Heatwave Alerts:** Identifies anomalous thermal zones (e.g., $+2.1^\circ\text{C}$ in Northern Bay of Bengal, $+3.2^\circ\text{C}$ in Arctic Beaufort Sea).
* **Pulsing 3D Beacons & Map Rings:** Visual alert rings on both the 3D globe and Google Satellite GIS highlighting active anomaly centers.
* **Explanatory Diagnostics:** Real-time scientific explanations of underlying meteorological/oceanographic drivers.

### 6. 🐟 Marine Ecosystem & Aquatic Impact Analysis
* **Biological Stress Metrics:** Real-time assessment of Temperature Stress, Oxygen Stress (Hypoxia/OMZ), and Salinity Stress.
* **Reef & Fisheries Advisory:** Scientific risk guidance on coral bleaching risk (Degree Heating Weeks) and pelagic fish migration patterns.
* **Marine Impact Layer:** Toggleable visualization layer highlighting sensitive shelf ecosystems.

### 7. 🚨 Disaster Intelligence & Risk Monitor
* **Real-Time Warning Feed:** High wave swell alerts ($3.8\,\text{m}-4.4\,\text{m}$ in Arabian Sea), cyclonic surge propagation, and positive Indian Ocean Dipole (IOD) events.
* **One-Click Navigation:** Clicking any hazard fly-navigates both the 3D globe and Google Maps directly to those coordinates.

### 8. 🤖 AI Ocean Assistant (Conversational NLP Widget)
* **Domain-Specific AI Ocean Bot:** Embedded floating chatbot capable of answering questions regarding anomalies, sensor profiles, CTD data, and model bias.
* **Quick Prompt Pills:** One-tap inquiry shortcuts for fast demonstration during hackathon evaluations.

### 9. ⬇️ Simulated Dataset Downloader (CSV Export)
* **Instant Export:** Generates clean, production-ready CSV files containing:
  `Station_ID, Station_Name, Region, Latitude, Longitude, Sensor_Type, Depth_m, Date_Timestamp, Parameter, Numerical_Model_Val, InSitu_Observed_Val, Delta_Difference, Accuracy_Pct, QC_Flag, Marine_Risk_Status`

---

## 🛠️ Technology Stack & Zero-Dependency Setup

* **Frontend:** HTML5, CSS3 (Modern Dark Navy Glassmorphism & Custom Properties), Vanilla JavaScript (ES6+).
* **3D Graphics:** [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) and OrbitControls via CDN.
* **Geospatial & Mapping:** Google Maps JavaScript API with Places, Visualization & Geometry libraries (Integrated API Key `AIzaSyAnV0-hft0h2toROE2gOrNyWyDs9CFvJhk`).
* **Typography:** Space Grotesk, Inter, JetBrains Mono (Google Fonts).
* **Icons:** FontAwesome 6.5.1 (via CDN).

---

## 🚀 How to Run the Prototype

1. Navigate to the project folder:
   ```bash
   cd "c:\Users\bhanu\oceantwin"
   ```
2. Double-click **`index.html`** or open it with any modern web browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, serve with a lightweight local server:
   ```bash
   npx serve .
   ```
   or in Python:
   ```bash
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.

---

## 🛰️ Production Integration Roadmap (MoES / INCOIS)

To replace simulated mock datasets with live MoES infrastructure in production:

1. **INCOIS OpenDAP / ERDDAP Integration:** Replace the static `SENSORS_DATA` array in `script.js` with live GeoJSON/REST queries (`// TODO: Replace mock data with real MoES/ocean model API`).
2. **NetCDF / GRIB2 Ocean Model Stream:** Feed real-time 3D grid outputs from INCOIS ROMS (Regional Ocean Modeling System) directly into WebGL custom shader uniforms.
3. **INSAT / IRIDIUM GTS Data Ingestion:** Connect to real-time GTS (Global Telecommunication System) feeds for Argo profiling floats and OMNI moored buoys.

---

## 👥 Hackathon Submission Details
* **Problem Statement:** SIH26067 (MoES)
* **Project Name:** OceanTwin 360
* **Status:** Working Interactive Prototype (Ready for Demonstration)
