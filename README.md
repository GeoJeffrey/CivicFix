# CivicFix Bengaluru

> **Civic Grievance Tracker & Escalation Prototype**  
> A lightweight, responsive web demonstration tracking municipal grievances across Bengaluru with working-day SLAs and automatic escalation tracking.

---

## Overview

CivicFix models civic issue reporting and municipal transparency for Bengaluru, Karnataka, India. Complaints are routed to four civic bodies according to departmental jurisdiction:

- **City Corporation / Civic Body**: Potholes, road surfacing, footpaths, storm water drain grates.
- **BESCOM**: Streetlights, non-functioning fixtures, low-hanging cables, feeder faults.
- **BWSSB**: Water pipe bursts, contaminated supply, open sewer overflows.
- **Solid Waste Management Agency**: Uncollected residential waste, blackspot clearing, illegal dumping.

---

## Key Features

- **Working-Day SLA Accountability**: Resolution countdowns account only for official working days, automatically skipping Karnataka government gazetted holidays and weekends (Saturdays and Sundays).
- **Public Safety First**: Banner alert directing immediate life hazards (live electric wires, gas leaks, road collapse) to emergency service **112**.
- **Reference Code Tracking Widget**: Real-time lookup for reference tickets (e.g. `BLR-2026-01`, `BLR-2026-02`, `BLR-2026-03`, `BLR-2026-04`) with interactive milestone audit logs and area mapping.
- **Area-Wise Transparency**: Live filterable data table covering Indiranagar, Koramangala, Jayanagar, Whitefield, Malleshwaram, HSR Layout, Yelahanka, and Electronic City.
- **Light Theme Civic Aesthetic**: Built following anti-slop principles with calm civic tones (`oklch(0.40 0.13 160)`), high contrast, fluid responsive typography, and mobile-first drawer navigation.

---

## File Structure

```text
├── index.html        # Semantic HTML5 markup
├── style.css         # Modern vanilla CSS with light theme design tokens
├── script.js         # Vanilla JavaScript for tracker, filters, and forms
├── DESIGN.md         # Design system tokens and personality guidelines
└── README.md         # Project documentation
```

---

## Running Locally

No build tools or package managers required. Simply serve the directory with any static HTTP server:

```bash
# Python 3
python -m http.server 8080
```

Then open your browser at:
```
http://localhost:8080
```

---

## Disclaimer

**Student project for demonstration and educational purposes only.**  
This prototype is not an official government service and is not affiliated with BBMP, BESCOM, BWSSB, the Government of Karnataka, or any statutory authority. All complaint numbers, personnel designations, and resolution metrics are synthetic sample data.
