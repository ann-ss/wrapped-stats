# Wrapped Stats - JSON Data Format

## Overview
Upload a JSON file to customize your stats presentation with your own data. This document describes all available slide types and customization options.

## Root Structure

```json
{
  "title": "Your Presentation Title",
  "subtitle": "Subtitle or year",
  "slides": [...]
}
```

## Slide Types

### 1. Stat Slide

Display a single statistic with an icon and optional background.

```json
{
  "type": "stat",
  "title": "Total Steps",
  "value": "3,456,789",
  "subtitle": "steps walked this year",
  "icon": "trending",
  "backgroundIndex": 0,
  "customPhoto": "photo-123456"
}
```

**Fields:**
- `type`: Must be `"stat"`
- `title`: The stat label
- `value`: The stat value (number or string)
- `subtitle`: Optional description
- `icon`: Icon name (see Available Icons below)
- `backgroundIndex`: Optional index (0-3) for preset backgrounds
- `customPhoto`: Optional photo ID from uploaded photos (overrides backgroundIndex)

### 2. Top Ranking Slide

Display a ranked list (top 5, top 10, etc.).

```json
{
  "type": "top-ranking",
  "title": "Top 5 Workouts",
  "icon": "trophy",
  "items": [
    {
      "rank": 1,
      "title": "Running",
      "value": "127",
      "subtitle": "sessions completed"
    },
    {
      "rank": 2,
      "title": "Cycling",
      "value": "89",
      "subtitle": "sessions completed"
    }
  ]
}
```

**Fields:**
- `type`: Must be `"top-ranking"`
- `title`: The ranking title
- `icon`: Optional icon name
- `items`: Array of ranking items
  - `rank`: Position number (1, 2, 3, etc.)
  - `title`: Item name
  - `value`: Item value
  - `subtitle`: Optional description

### 3. Timeline Slide

Display chronological events.

```json
{
  "type": "timeline",
  "title": "Your Fitness Journey",
  "events": [
    {
      "date": "Jan",
      "title": "Started Running",
      "description": "Completed your first 5K run"
    },
    {
      "date": "Mar",
      "title": "Gym Membership",
      "description": "Joined the local fitness center"
    }
  ]
}
```

**Fields:**
- `type`: Must be `"timeline"`
- `title`: The timeline title
- `events`: Array of timeline events
  - `date`: Date label (month, day, or custom)
  - `title`: Event title
  - `description`: Optional event description

### 4. Photo Carousel Slide

Display a slideshow of uploaded photos.

```json
{
  "type": "photo-carousel",
  "title": "Your Best Moments",
  "subtitle": "Memories from this year",
  "photos": ["photo-123456", "photo-789012", "photo-345678"]
}
```

**Fields:**
- `type`: Must be `"photo-carousel"`
- `title`: The carousel title
- `subtitle`: Optional subtitle
- `photos`: Array of photo IDs from uploaded photos

## Available Icons

- `clock` - Clock icon
- `music` - Music note
- `sparkles` - Sparkles/stars
- `trending` - Trending up arrow
- `heart` - Heart
- `heartbreak` - Heart with crack
- `award` - Award medal
- `trophy` - Trophy
- `star` - Star
- `calendar` - Calendar
- `image` - Image/photo
- `phone` - Phone
- `plane` - Plane
- `message` - Text message icon
- `steps` - Footprints
- `utensils` - Fork and Knife

## Background Images

Preset background images are available via `backgroundIndex`:
- `0` - Holographic gradient mesh
- `1` - Purple/pink abstract
- `2` - Cyan/pink waves
- `3` - Geometric patterns

## Using Custom Photos

1. Click the upload button (bottom right) to open the photo manager
2. Upload your photos (max 5MB each)
3. Copy the photo ID shown on each uploaded photo
4. Use the photo ID in your JSON:
   - For stat slides: Set `customPhoto` field
   - For photo carousels: Add to `photos` array

## Complete Example

See `example-data.json` for a complete working example with all slide types.

## Validation Rules
- Maximum 20 slides per presentation
- All required fields must be present
- Icon names must match available options
- backgroundIndex must be 0-3 (if used)

## Tips

- Mix different slide types for variety
- Use 5-10 slides for optimal presentation length
- Test your JSON by uploading it via the "Upload Data" button
- Photo IDs persist in your browser's local storage
- Combine stat slides with rankings and timelines for storytelling
