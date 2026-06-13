// scenes.js — The Mystery of Brita Svani
// THIS is your content file. engine.js handles all logic — you never touch that.
// Add scenes, hotspots, dialogue, items, and props here.

const SCENES = {

  living_room: {
    id: "living_room",
    name: "Brita's Living Room",
    background: "assets/backgrounds/living_room.jpg",

    // ── PROPS ────────────────────────────────────────────────────────────────
    // Props are image stickers placed on top of the background.
    // They disappear when picked up. Position in % of screen (same as hotspots).
    // The bottle sits on the bar cart, left side of the scene.
    props: [
      {
        id: "bottle_prop",
        image: "assets/props/bottle.png",
        x: 13, y: 62,
        width: 3, height: 15
      }
    ],

    // ── HOTSPOTS ─────────────────────────────────────────────────────────────
    hotspots: [
      {
        id: "big_window",
        label: "Outside",
        x: 37, y: 23, width: 49, height: 49,
        action: {
          type: "scene",
          target: "exterior"
        }
      },
      {
        id: "table",
        label: "Left overs",
        x: 43, y: 72,
        width: 21, height: 9,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Looks like someone left in a hurry."
        }
      },
      {
        id: "bottle",
        label: "Bottle",
        x: 11, y: 62,
        width: 3, height: 15,
        action: {
          type: "pickup",
          removesProp: "bottle_prop",
          item: { id: "mystery_bottle", label: "Mysterious Bottle" },
          speaker: "You",
          text: "Something dark inside. Could be cognac, could be a regret from 1987. I take it.",
          alreadyTaken: "Already taken care of."
        }
      },
      {
        // Cat portrait — clicking opens fullscreen lightbox with eye-tracking
        id: "cat_portrait",
        label: "Cat Portrait",
        x: 28.5, y: 22,
        width: 8, height: 18,
        action: {
          type: "lightbox",
          image: "assets/ui/cat_portrait.png",
          eyeTracking: true
        }
      }
    ]
  },

  exterior: {
    id: "exterior",
    name: "Outside — Mamma Cale's Street",
    background: "assets/backgrounds/exterior.jpg",
    props: [],
    hotspots: [
      {
        id: "apartment_window",
        label: "Apartment Window",
        x: 24, y: 6, width: 20, height: 29,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "The light is on up there. Someone is home. Or maybe they just want it to look that way."
        }
      },
      {
        id: "back_to_apartment",
        label: "Back Inside",
        x: 48, y: 56, width: 13, height: 36,
        action: {
          type: "scene",
          target: "living_room"
        }
      }
    ]
  }

  // ── HOW TO ADD A NEW SCENE ───────────────────────────────────────────────
  // ,my_new_scene: {
  //   id: "my_new_scene",
  //   name: "Room Name",
  //   background: "assets/backgrounds/my_scene.jpg",
  //   props: [],
  //   hotspots: []
  // }

};
