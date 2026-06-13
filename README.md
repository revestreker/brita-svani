# The Mystery of Brita Svani
A hand-illustrated point & click adventure.

## How to play
Open `index.html` in any web browser. No server needed — just double-click the file.

## Folder structure
```
brita-svani/
├── index.html          ← open this to play
├── engine.js           ← game logic (don't touch)
├── scenes.js           ← all your content: scenes, hotspots, dialogue
├── assets/
│   ├── backgrounds/    ← your painted scenes as JPG or PNG
│   ├── characters/     ← character sprites (PNG with transparency)
│   ├── items/          ← inventory item icons (PNG)
│   ├── ui/             ← cursor, UI graphics
│   └── audio/          ← music, ambience, sound effects (mp3/ogg)
└── README.md
```

## Adding a new scene
1. Put your painted background in `assets/backgrounds/my_scene.jpg`
2. Open `scenes.js` and copy the `living_room` block
3. Change the `id`, `name`, and `background` path
4. Clear out the hotspots array and add your own (see below)

## Adding hotspots with the editor
1. Open `index.html` in browser and press `E` to enter Editor Mode
2. Click and drag a rectangle over any area of the background
3. Copy the JSON snippet that appears in the top-right panel
4. Paste it into the `hotspots` array in `scenes.js`
5. Give it a label and write your dialogue text
6. Save and refresh — done

## Hotspot action types
```js
// Show dialogue
{ "type": "dialogue", "speaker": "You", "text": "..." }

// Pick up an item into inventory
{ "type": "pickup", "item": { "id": "key", "label": "Old Key", "icon": "🗝️" },
  "speaker": "You", "text": "I take it.", "alreadyTaken": "Already got it." }

// Go to another scene
{ "type": "scene", "target": "scene_id" }

// Only works if player has a specific item
{ "type": "conditional", "requiresItem": "item_id",
  "speaker": "You", "textSuccess": "...", "textFail": "I need something for this.",
  "then": { "type": "scene", "target": "next_room" } }
```

## Keyboard shortcuts
- `E` — toggle hotspot editor
- `ESC` — close dialogue
