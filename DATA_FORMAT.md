# Wrapped Stats - JSON Data Format

## Overview
Upload a JSON file to customize your stats presentation with your own data.

## JSON Schema

```json
{
  "title": "Your Year in Stats",
  "subtitle": "2024 Wrapped",
  "slides": [
    {
      "type": "stat",
      "title": "Total Listening Time",
      "value": "52,847",
      "subtitle": "minutes of pure vibes",
      "icon": "clock",
      "backgroundIndex": 0
    },
    {
      "type": "stat",
      "title": "Top Genre",
      "value": "Indie Pop",
      "subtitle": "You're a trendsetter",
      "icon": "music",
      "backgroundIndex": 1
    }
  ]
}
```

## Field Descriptions

### Root Level
- **title** (string, required): Main title for the intro slide
- **subtitle** (string, required): Subtitle for the intro slide
- **slides** (array, required): Array of slide objects

### Slide Object
- **type** (string, required): Must be "stat"
- **title** (string, required): Title of the stat
- **value** (string | number, required): The main stat value to display
- **subtitle** (string, optional): Additional context or description
- **icon** (string, required): Icon name. Available icons:
  - `clock` - Clock icon
  - `music` - Music note icon
  - `sparkles` - Sparkles icon
  - `trending` - Trending up arrow
  - `heart` - Heart icon
  - `award` - Award/trophy icon
- **backgroundIndex** (number, required): Background image index (0-3)

## Example Files

### Music Stats
```json
{
  "title": "Your Music Journey",
  "subtitle": "2024 Wrapped",
  "slides": [
    {
      "type": "stat",
      "title": "Total Listening Time",
      "value": "52,847",
      "subtitle": "minutes of pure vibes",
      "icon": "clock",
      "backgroundIndex": 0
    },
    {
      "type": "stat",
      "title": "Top Artist",
      "value": "Taylor Swift",
      "subtitle": "Your #1 artist this year",
      "icon": "music",
      "backgroundIndex": 1
    }
  ]
}
```

### Fitness Stats
```json
{
  "title": "Your Fitness Year",
  "subtitle": "2024 Achievements",
  "slides": [
    {
      "type": "stat",
      "title": "Total Steps",
      "value": "2.5M",
      "subtitle": "steps walked this year",
      "icon": "trending",
      "backgroundIndex": 2
    },
    {
      "type": "stat",
      "title": "Calories Burned",
      "value": "425,000",
      "subtitle": "calories torched",
      "icon": "sparkles",
      "backgroundIndex": 3
    }
  ]
}
```

## Validation Rules
- Maximum 10 slides per presentation
- All required fields must be present
- Icon names must match available options
- backgroundIndex must be 0-3
