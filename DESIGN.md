# DESIGN.md — CivicFix Bengaluru Localization

## 1. Identity & Purpose
CivicFix Bengaluru is an educational prototype and grievance tracker demonstration specifically calibrated for the urban civic infrastructure of Bengaluru, Karnataka, India. It models grievance routing across four key municipal entities: City Corporation (roads/potholes/footpaths), BESCOM (power/lighting), BWSSB (water/drainage), and the Solid Waste Management Agency.

**Disclaimer**: Student project for demonstration purposes only. Not affiliated with any official government authority, BBMP, BESCOM, BWSSB, or the Government of Karnataka.

## 2. Personality
- **Civic & Utilitarian**: Clear redressal expectations, transparent SLA computation skipping state holidays and Sundays.
- **Accessible & Clear**: Legible English labeling with robust typographic hierarchy and high contrast.
- **Safety First**: Immediate redirection to 112 for acute electrical or structural life hazards.

## 3. Visual Palette (Calm Civic Green with Warm Amber Accent)
- **Primary Civic Green**: `oklch(0.40 0.13 160)` — Calm, natural civic authority.
- **Primary Hover**: `oklch(0.34 0.14 160)`
- **Primary Subtle**: `oklch(0.96 0.02 160)`
- **Warm Terracotta Accent**: `oklch(0.62 0.17 48)` — Warm South Indian architectural earth tone.
- **Escalation Alert**: `oklch(0.55 0.22 28)` — Mandatory for SLA breaches and officer escalation.
- **Active Progress**: `oklch(0.52 0.16 230)` — Active work order.
- **Resolved Green**: `oklch(0.54 0.16 142)` — Verified field resolution.
- **Theme**: Strict daylight-optimized light theme (`color-scheme: light`).

## 4. Typography & Font Stack
- **Body Font Stack**: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`.
- **Heading Font**: `'Space Grotesk', var(--font-base)`.
- **Line Heights**: Set to `1.6` across text containers for clean readability.

## 5. Local Context & Honesty Standards
- **Geographic Bounding Box**: 12.80°N to 13.20°N, 77.40°E to 77.80°E (Bengaluru metropolitan area centered at 12.9716, 77.5946).
- **Time Zone**: Asia/Kolkata (IST), formatted as `DD/MM/YYYY, hh:mm A`.
- **Working Days Rule**: Explicitly notes that resolution countdowns exclude gazetted Karnataka government holidays and Sundays.
- **All Numerical Metrics**: Marked with explicit "(Sample data)" labels.
- **Sample Addresses**: Strictly synthetic landmarks (e.g., "Opposite 4th Main BDA Complex", "Near Outer Ring Road Underpass").
