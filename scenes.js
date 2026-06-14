// scenes.js — The Mystery of Brita Svani
// THIS is your content file. engine.js handles all logic — never touch that.
// To swap a background: replace the image file keeping the same filename.

const SCENES = {

  // ── THE STREET (pan scene) ────────────────────────────────────────────────
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
        x: 70, y: 38, width: 6, height: 23,
        action: { type: "scene", target: "living_room" }
      },
      {
        id: "cafe_entrance",
        label: "Mamma Cale's",
        x: 51, y: 48, width: 10, height: 31,
        action: { type: "scene", target: "cafe" }
      },
      {
        id: "back_alley",
        label: "Back Alley",
        x: 18, y: 51, width: 4, height: 35,
        action: { type: "scene", target: "alley" }
      },
      {
        id: "camping_wagon",
        label: "Up on the Hill",
        x: 7, y: 5, width: 6, height: 15,
        action: { type: "scene", target: "cabin" }
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
        x: 38, y: 22, width: 41, height: 50,
        action: { type: "scene", target: "exterior" }
      },
      {
        id: "table",
        label: "Coffee Table",
        x: 45, y: 72, width: 18, height: 15,
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
        x: 29, y: 22, width: 7, height: 18,
        action: { type: "lightbox", image: "assets/ui/cat_portrait.png" }
      }
    ]
  },

  // ── MAMMA CALE'S CAFÉ (pan scene) ────────────────────────────────────────
  cafe: {
    id: "cafe",
    name: "Mamma Cale's",
    background: "assets/backgrounds/cafe.jpg",
    type: "pan",
    panStart: 0.0,
    showPanHint: true,
    props: [],
    hotspots: [
      {
        id: "cafe_exit_left",
        label: "Back to the Street",
        x: 0, y: 0, width: 4, height: 100,
        action: { type: "scene", target: "exterior" }
      },
      {
        id: "cafe_exit_right",
        label: "Back to the Street",
        x: 96, y: 0, width: 4, height: 100,
        action: { type: "scene", target: "exterior" }
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
        x: 40, y: 37, width: 13, height: 31,
        action: {
          type: "dialogue",
          speaker: "Drunk Man",
          text: "He's mumbling into his glass. I can't make out a word. Maybe if I had a drink myself."
        }
      },
      {
        id: "take_a_seat",
        label: "Take a Seat",
        x: 36, y: 70, width: 18, height: 25,
        action: { type: "scene", target: "bar" }
      },
      {
        id: "brita_friends",
        label: "Talk to Brita's Friends",
        x: 72, y: 39, width: 14, height: 34,
        action: { type: "scene", target: "ladies" }
      }
    ]
  },

  // ── LADIES TABLE ─────────────────────────────────────────────────────────
  ladies: {
    id: "ladies",
    name: "Brita's Friends",
    background: "assets/backgrounds/ladies.jpg",
    props: [],
    hotspots: [
      {
        id: "ladies_exit",
        label: "Back to the Café",
        x: 0, y: 16, width: 8, height: 69,
        action: { type: "scene", target: "cafe" }
      },
      {
        id: "lady_left",
        label: "Talk",
        x: 14, y: 17, width: 15, height: 64,
        action: {
          type: "dialogue",
          speaker: "Brita's Friend",
          text: "She seemed perfectly fine at the show. Laughing, drinking. That's Brita. Then she was just — gone."
        }
      },
      {
        id: "lady_centre",
        label: "Talk",
        x: 36, y: 13, width: 16, height: 61,
        action: {
          type: "dialogue",
          speaker: "Brita's Friend",
          text: "She bought a house somewhere. Mentioned it once, weeks ago. I didn't think anything of it. Brita was always talking about leaving."
        }
      },
      {
        id: "lady_right",
        label: "Talk",
        x: 70, y: 10, width: 17, height: 70,
        action: {
          type: "dialogue",
          speaker: "Brita's Friend",
          text: "Ask the man at the bar. He and Brita had words that night. I saw them."
        }
      }
    ]
  },

  // ── BAR CLOSE-UP ─────────────────────────────────────────────────────────
  bar: {
    id: "bar",
    name: "At the Bar",
    background: "assets/backgrounds/bar.jpg",
    props: [],
    hotspots: [
      {
        id: "bar_exit",
        label: "Back to the Café",
        x: 0, y: 0, width: 8, height: 100,
        action: { type: "scene", target: "cafe" }
      },
      {
        id: "bartender_close",
        label: "Bartender",
        x: 18, y: 15, width: 28, height: 72,
        action: {
          type: "dialogue",
          speaker: "Bartender",
          text: "One drink. Then I'm closing up and you're leaving."
        }
      },
      {
        id: "drunk_man_close",
        label: "Drunk Man",
        x: 58, y: 8, width: 38, height: 85,
        action: {
          type: "dialogue",
          speaker: "Drunk Man",
          text: "She was unhappy. Long time. Last week she said she bought something. A house. Out in Feelianco. Far out. Nobody goes there anymore."
        }
      }
    ]
  },

  // ── BACK ALLEY ───────────────────────────────────────────────────────────
  alley: {
    id: "alley",
    name: "The Back Alley",
    background: "assets/backgrounds/alley.jpg",
    props: [],
    hotspots: [
      {
        id: "alley_exit",
        label: "Back to the Street",
        x: 27, y: 16, width: 13, height: 61,
        action: { type: "scene", target: "exterior" }
      },
      {
        id: "theatre_backdoor",
        label: "Theatre Backdoor",
        x: 40, y: 49, width: 6, height: 38,
        action: { type: "scene", target: "wardrobe" }
      }
    ]
  },

  // ── THEATRE WARDROBE ─────────────────────────────────────────────────────
  wardrobe: {
    id: "wardrobe",
    name: "Theatre Wardrobe",
    background: "assets/backgrounds/wardrobe.jpg",
    props: [],
    hotspots: [
      {
        id: "wardrobe_exit",
        label: "Back Outside",
        x: 2, y: 12, width: 11, height: 79,
        action: { type: "scene", target: "alley" }
      },
      {
        id: "mirror",
        label: "Dressing Mirror",
        x: 25, y: 20, width: 17, height: 32,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "A silhouette in the mirror. For a second I thought someone was still here. Just the light playing tricks."
        }
      },
      {
        id: "wardrobe_cabinet",
        label: "Costume Cabinet",
        x: 54, y: 54, width: 24, height: 39,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Costumes from a dozen productions. She would have touched every one of these. Thirty years of work hanging in the dark."
        }
      }
    ]
  },

  // ── DETECTIVE'S CABIN ────────────────────────────────────────────────────
  cabin: {
    id: "cabin",
    name: "The Hill",
    background: "assets/backgrounds/start_frame.png",
    props: [],
    hotspots: [
      {
        id: "cabin_city",
        label: "Go Back to Town",
        x: 55, y: 25, width: 42, height: 50,
        action: { type: "scene", target: "exterior" }
      }
    ]
  }

};
