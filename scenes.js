// scenes.js — The Mystery of Brita Svani
// THIS is your content file. engine.js handles all logic — never touch that.
// To swap a background later: just replace the image file in assets/backgrounds/
// keeping the same filename. No code changes needed.

const SCENES = {

  // ── THE STREET (starting scene, pan left/right) ───────────────────────────
  exterior: {
    id: "exterior",
    name: "The Street",
    background: "assets/backgrounds/exterior.jpg",
    type: "pan",
    panStart: 0.6,
    props: [],
    hotspots: [
      {
        id: "apartment_entrance",
        label: "Brita's Apartment",
        x: 64, y: 38, width: 7, height: 23,
        action: {
          type: "scene",
          target: "living_room"
        }
      },
      {
        id: "cafe_entrance",
        label: "Mamma Cale's",
        x: 41, y: 47, width: 11, height: 28,
        action: {
          type: "scene",
          target: "cafe"
        }
      },
      {
        id: "back_alley",
        label: "Back Alley",
        x: 18, y: 51, width: 4, height: 35,
        action: {
          type: "scene",
          target: "alley"
        }
      },
      {
        id: "camping_wagon",
        label: "Up on the Hill",
        x: 7, y: 5, width: 6, height: 15,
        action: {
          type: "scene",
          target: "cabin"
        }
      },
      {
        id: "theatre_door",
        label: "Theatre Door",
        x: 6, y: 55, width: 12, height: 35,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Locked. The keyhole looks like it belongs to something specific. I don't have it yet."
        }
      }
    ]
  },

  // ── BRITA'S LIVING ROOM ───────────────────────────────────────────────────
  // Background: assets/backgrounds/living_room.jpg
  // To update: replace that file, keep the same name.
  living_room: {
    id: "living_room",
    name: "Brita's Apartment",
    background: "assets/backgrounds/living_room.jpg",
    props: [
      {
        id: "bottle_prop",
        image: "assets/props/bottle.png",
        x: 13, y: 62, width: 3, height: 15
      }
    ],
    hotspots: [
      {
        id: "big_window",
        label: "Back to the Street",
        x: 37, y: 23, width: 49, height: 49,
        action: {
          type: "scene",
          target: "exterior"
        }
      },
      {
        id: "table",
        label: "Coffee Table",
        x: 43, y: 72, width: 21, height: 9,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Two glasses. One with a lipstick mark. The candles burned down to nothing. Someone was here with her."
        }
      },
      {
        id: "bottle",
        label: "Bottle",
        x: 11, y: 62, width: 3, height: 15,
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
        id: "cat_portrait",
        label: "Cat Portrait",
        x: 28.5, y: 22, width: 8, height: 18,
        action: {
          type: "lightbox",
          image: "assets/ui/cat_portrait.png"
        }
      }
    ]
  },

  // ── MAMMA CALE'S CAFÉ ────────────────────────────────────────────────────
  // Background: assets/backgrounds/cafe.jpg
  cafe: {
    id: "cafe",
    name: "Mamma Cale's",
    background: "assets/backgrounds/cafe.jpg",
    props: [],
    hotspots: [
      {
        id: "cafe_exit",
        label: "Back to the Street",
        x: 0, y: 0, width: 8, height: 100,
        action: {
          type: "scene",
          target: "exterior"
        }
      },
      {
        id: "bartender",
        label: "Bartender",
        x: 10, y: 18, width: 12, height: 55,
        action: {
          type: "dialogue",
          speaker: "Bartender",
          text: "We're closing soon. You want something or are you just here to stand there?"
        }
      },
      {
        id: "drunk_man",
        label: "Man at the Bar",
        x: 36, y: 28, width: 12, height: 48,
        action: {
          type: "dialogue",
          speaker: "Drunk Man",
          text: "He's mumbling into his glass. I can't make out a word. Maybe if I had a drink myself."
        }
      },
      {
        id: "brita_friends",
        label: "Women at the Table",
        x: 58, y: 30, width: 30, height: 45,
        action: {
          type: "dialogue",
          speaker: "Brita's Friend",
          text: "We haven't seen her since closing night. She left early — or we thought she did. Her apartment is on the fourth floor. Maybe start there."
        }
      }
    ]
  },

  // ── BACK ALLEY ───────────────────────────────────────────────────────────
  // Background: assets/backgrounds/alley.jpg
  alley: {
    id: "alley",
    name: "The Back Alley",
    background: "assets/backgrounds/alley.jpg",
    props: [],
    hotspots: [
      {
        id: "alley_exit",
        label: "Back to the Street",
        x: 0, y: 0, width: 15, height: 100,
        action: {
          type: "scene",
          target: "exterior"
        }
      },
      {
        id: "theatre_backdoor",
        label: "Theatre Backdoor",
        x: 30, y: 20, width: 25, height: 65,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "A heavy door. There's a lock — old brass, well-used. I need the right key."
        }
      }
    ]
  },

  // ── DETECTIVE'S CABIN (title screen scene) ────────────────────────────────
  // Background: assets/backgrounds/start_frame.png
  cabin: {
    id: "cabin",
    name: "The Hill",
    background: "assets/backgrounds/start_frame.png",
    props: [],
    hotspots: [
      {
        id: "cabin_exit",
        label: "Back to the Street",
        x: 40, y: 60, width: 20, height: 30,
        action: {
          type: "scene",
          target: "exterior"
        }
      }
    ]
  }

  // ── HOW TO ADD A NEW SCENE ───────────────────────────────────────────────
  // 1. Put your background in assets/backgrounds/ with a clean name (no spaces)
  // 2. Copy a scene block below and fill it in
  // 3. Add a hotspot in another scene pointing to it with type: "scene"
  //
  // ,new_scene: {
  //   id: "new_scene",
  //   name: "Scene Name",
  //   background: "assets/backgrounds/filename.jpg",
  //   props: [],
  //   hotspots: []
  // }

};
