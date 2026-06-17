// scenes.js — The Mystery of Brita Svani

const SCENES = {

  // ── STREET (pan) ──────────────────────────────────────────────────────────
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
        action: { type: "scene", target: "living_room" }
      },
      {
        id: "cafe_entrance",
        label: "Mamma Cale's",
        x: 41, y: 47, width: 11, height: 28,
        action: { type: "scene", target: "cafe" }
      },
      {
        id: "back_alley",
        label: "Back Alley",
        x: 18, y: 51, width: 4, height: 35,
        action: { type: "scene", target: "alley" }
      },
      {
        // Feelianco — only accessible after coordinates found
        // Before that, just a nice observation from the detective
        id: "feelianco_travel",
        label: "The Hill",
        x: 7, y: 5, width: 6, height: 15,
        action: {
          type: "conditional",
          requiresItem: "coordinates",
          speaker: "You",
          textFail: "I have never understood why people work so hard to stay in the busy city. Looks better over there.",
          textSuccess: "67 degrees north. Past the city lights. I get in the car.",
          then: { type: "scene", target: "feelianco" }
        }
      },
      {
        id: "theatre_door",
        label: "Theatre Door",
        x: 6, y: 55, width: 12, height: 35,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Locked. Looks like we're too early out."
        }
      }
    ]
  },

  // ── CABIN ─────────────────────────────────────────────────────────────────
  cabin: {
    id: "cabin",
    name: "The Hill",
    background: "assets/backgrounds/start_frame.png",
    props: [],
    hotspots: [
      {
        id: "mailbox",
        label: "Mailbox",
        x: 8, y: 45, width: 10, height: 20,
        action: {
          type: "lightbox",
          image: "assets/ui/note_edvard_letter.png",
          caption: "A key falls out when you unfold it. First case in three months. You get in the car."
        }
      },
      {
        id: "cabin_city",
        label: "Go to Town",
        x: 55, y: 25, width: 42, height: 50,
        action: { type: "scene", target: "exterior" }
      }
    ]
  },

  // ── APARTMENT ─────────────────────────────────────────────────────────────
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
        action: { type: "scene", target: "exterior" }
      },
      {
        id: "bar_cart",
        label: "Bar Cart",
        x: 2, y: 44, width: 13, height: 40,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Two thirds empty. Someone was here after the play."
        }
      },
      {
        id: "bottle",
        label: "Bottle",
        x: 11, y: 62, width: 3, height: 15,
        action: {
          type: "pickup",
          removesProp: "bottle_prop",
          item: { id: "mystery_bottle", label: "Brita's Bottle" },
          speaker: "You",
          text: "Something dark inside. I take it.",
          alreadyTaken: "Already taken care of."
        }
      },
      {
        id: "coffee_table",
        label: "Coffee Table",
        x: 43, y: 60, width: 22, height: 20,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Two glasses. One with a lipstick mark. The candles burned down to nothing. Someone was here with her."
        }
      },
      {
        id: "zebra_rug",
        label: "Rug",
        x: 38, y: 75, width: 30, height: 14,
        action: {
          type: "pickup",
          item: { id: "note_h", label: "Note from H" },
          speaker: "You",
          text: "A note under the rug. Who is H.",
          alreadyTaken: "\"The key is in the usual place. Don't be late. — H.\" Still don't know who H is.",
          showLightbox: "assets/ui/note_hector.png"
        }
      },
      {
        id: "theatre_key_cabinet",
        label: "Cabinet",
        x: 77, y: 55, width: 8, height: 25,
        action: {
          type: "pickup",
          item: { id: "theatre_key", label: "Theatre Key" },
          speaker: "You",
          text: "A key. Old brass, well-used. It has to go somewhere.",
          alreadyTaken: "I already have the key."
        }
      },
      {
        id: "cat_portrait",
        label: "Cat Portrait",
        x: 28.5, y: 22, width: 8, height: 18,
        action: {
          type: "lightbox",
          image: "assets/ui/cat_portrait.png",
          caption: "Cat's not here either. Strange."
        }
      },
      {
        // Second visit only — Edward's note on floor
        id: "edwards_note_floor",
        label: "Note on the floor",
        x: 18, y: 82, width: 12, height: 10,
        requiresItem: "coordinates",
        action: {
          type: "lightbox",
          image: "assets/ui/note_edward_midgame.png",
          caption: "He's running out of patience. I should find her before he does something stupid."
        }
      }
    ]
  },

  // ── CAFÉ (pan) ────────────────────────────────────────────────────────────
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
          text: "Everybody knew her."
        }
      },
      {
        id: "drunk_man_approach",
        label: "Man at the Bar",
        x: 36, y: 28, width: 12, height: 48,
        action: {
          type: "conditional",
          requiresItem: "mystery_bottle",
          speaker: "You",
          textFail: "He's somewhere between asleep and somewhere else entirely. Not going to get much from him like this.",
          textSuccess: "I set the bottle on the bar.",
          then: { type: "scene", target: "bar" }
        }
      },
      {
        id: "take_a_seat",
        label: "Take a Seat",
        x: 36, y: 70, width: 18, height: 25,
        action: {
          type: "conditional",
          requiresItem: "mystery_bottle",
          speaker: "You",
          textFail: "I should have something to offer before I sit down.",
          textSuccess: "I set the bottle on the bar. He opens one eye.",
          then: { type: "scene", target: "bar" }
        }
      },
      {
        id: "brita_friends",
        label: "Talk to Brita's Friends",
        x: 58, y: 30, width: 30, height: 45,
        action: { type: "scene", target: "ladies" }
      }
    ]
  },

  // ── LADIES TABLE ──────────────────────────────────────────────────────────
  ladies: {
    id: "ladies",
    name: "Brita's Friends",
    background: "assets/backgrounds/ladies.jpg",
    props: [],
    hotspots: [
      {
        id: "ladies_exit",
        label: "Back to the Café",
        x: 0, y: 0, width: 10, height: 100,
        action: { type: "scene", target: "cafe" }
      },
      {
        id: "lotte",
        label: "Lotte",
        x: 5, y: 8, width: 28, height: 75,
        action: {
          type: "dialogue_sequence",
          lines: [
            { speaker: "You", text: "You were with Brita the night she disappeared?" },
            { speaker: "Lotte", text: "We were all at the premiere. She was wonderful. Radiant. I've never seen her so present. Like she'd decided something." },
            { speaker: "You", text: "Decided what?" },
            { speaker: "Lotte", text: "I don't know. She just seemed light. That night she wasn't performing. Isn't that strange?" },
            { speaker: "You", text: "Did she leave with anyone?" },
            { speaker: "Lotte", text: "She was talking to someone at the bar. An older man. I didn't recognise him." },
            { speaker: "You", text: "What did they talk about?" },
            { speaker: "Lotte", text: "I couldn't hear. But she was laughing. Really laughing." }
          ]
        }
      },
      {
        id: "mette",
        label: "Mette",
        x: 35, y: 5, width: 28, height: 75,
        action: {
          type: "dialogue_sequence",
          lines: [
            { speaker: "You", text: "When did you last see Brita?" },
            { speaker: "Mette", text: "After the second act. She was a wreck. Absolutely beside herself backstage. Nobody listened." },
            { speaker: "You", text: "A wreck how?" },
            { speaker: "Mette", text: "Crying. Shaking. This is not a woman who just wanders off, you understand." },
            { speaker: "You", text: "Did she say anything?" },
            { speaker: "Mette", text: "She said \"I can't do this anymore.\" I remember it exactly." },
            { speaker: "You", text: "Do this... the show?" },
            { speaker: "Mette", text: "Everything. All of it. She's been saying it for years but this time it was different." }
          ]
        }
      },
      {
        id: "regitte",
        label: "Regitte",
        x: 68, y: 8, width: 27, height: 75,
        action: {
          type: "dialogue_sequence",
          lines: [
            { speaker: "You", text: "Are you worried about her?" },
            { speaker: "Regitte", text: "Yes. Terribly. She owes me money, actually, but that's not... that's not why I'm worried." },
            { speaker: "You", text: "What happened after the show?" },
            { speaker: "Regitte", text: "I saw her outside. In the alley. She was talking to someone. A man. I didn't see his face." },
            { speaker: "You", text: "The alley behind the theatre?" },
            { speaker: "Regitte", text: "Yes. The backdoor. She had a key to that door. Said the front entrance was for people who needed to be seen." },
            { speaker: "You", text: "Did they argue?" },
            { speaker: "Regitte", text: "He touched her face. She let him. That's all I saw." }
          ]
        }
      }
    ]
  },

  // ── BAR CLOSE-UP ──────────────────────────────────────────────────────────
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
        id: "hector",
        label: "Hector",
        x: 58, y: 8, width: 38, height: 85,
        action: {
          type: "conditional",
          requiresItem: "box_key",
          // After getting box key, Hector just mumbles
          speaker: "Hector",
          textSuccess: "She'll be fine... she always is... known her forty years... always lands on her feet...",
          textFail_sequence: {
            type: "dialogue_sequence",
            lines: [
              { speaker: "Hector", text: "...That's hers." },
              { speaker: "You", text: "You knew her." },
              { speaker: "Hector", text: "Knew. Know. She's not dead, if that's what they're saying." },
              { speaker: "You", text: "Where is she?" },
              { speaker: "Hector", text: "We used to go to a place. When we were young. She called it the end of the world. I called it Tuesday." },
              { speaker: "You", text: "Where?" },
              { speaker: "Hector", text: "Feelianco. Past the city lights, up the hill, past the old wall. She bought something out there. Said she was going to fix it up. She's been saying that for forty years." },
              { speaker: "You", text: "The note in her apartment. H. That was you." },
              { speaker: "Hector", text: "She told me she was going. The night of the play. Said she was done. I gave her the key to the backdoor." },
              { speaker: "You", text: "Her things. There's a box." },
              { speaker: "Hector", text: "She forgot it. Or she left it on purpose. With her, you never know." },
              { speaker: "You", text: "Why didn't you tell anyone?" },
              { speaker: "Hector", text: "She asked me not to. First time she ever asked me for anything." }
            ],
            onComplete: {
              type: "pickup",
              item: { id: "box_key", label: "Box Key" },
              speaker: "Hector",
              text: "Here. The key to the box."
            }
          }
        }
      }
    ]
  },

  // ── BACK ALLEY ────────────────────────────────────────────────────────────
  alley: {
    id: "alley",
    name: "The Back Alley",
    background: "assets/backgrounds/alley.jpg",
    onEnter: {
      type: "dialogue",
      speaker: "You",
      text: "Something moved. White. Gone now."
    },
    props: [],
    hotspots: [
      {
        id: "alley_exit",
        label: "Back to the Street",
        x: 0, y: 30, width: 12, height: 60,
        action: { type: "scene", target: "exterior" }
      },
      {
        id: "theatre_backdoor",
        label: "Theatre Backdoor",
        x: 30, y: 20, width: 25, height: 65,
        action: {
          type: "conditional",
          requiresItem: "theatre_key",
          speaker: "You",
          textSuccess: "The key fits.",
          textFail: "Closed. Maybe Brita has a key.",
          then: { type: "scene", target: "wardrobe" }
        }
      }
    ]
  },

  // ── WARDROBE ──────────────────────────────────────────────────────────────
  wardrobe: {
    id: "wardrobe",
    name: "Theatre Wardrobe",
    background: "assets/backgrounds/wardrobe.jpg",
    props: [],
    hotspots: [
      {
        id: "wardrobe_exit",
        label: "Back Outside",
        x: 0, y: 0, width: 7, height: 100,
        action: { type: "scene", target: "alley" }
      },
      {
        id: "mirror",
        label: "Dressing Mirror",
        x: 17, y: 10, width: 28, height: 65,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "This is not helping the case."
        }
      },
      {
        id: "costumes",
        label: "Costumes",
        x: 82, y: 5, width: 16, height: 80,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Thirty years of productions hanging in the dark. She touched every one of these."
        }
      },
      {
        id: "photograph_drawer",
        label: "Drawer",
        x: 55, y: 45, width: 18, height: 30,
        action: {
          type: "pickup",
          item: { id: "photograph", label: "Old Photograph" },
          speaker: "You",
          text: "Two people on a hill. Young. Happy in the way people are before they know what's coming. Feelianco, 1987. Isn't that the man from the bar?",
          alreadyTaken: "The man from the bar. Feelianco, 1987.",
          showLightbox: "assets/ui/photograph_young.png"
        }
      },
      {
        id: "wooden_box",
        label: "Wooden Box",
        x: 8, y: 52, width: 10, height: 25,
        action: {
          type: "conditional",
          requiresItem: "box_key",
          speaker: "You",
          textFail: "A wooden box. Old. Locked. She wasn't leaving this behind on accident.",
          textSuccess: "Stones. Letters. A pair of earrings. And a photograph.",
          // Show front of photo first, clicking flips to coordinates
          showLightboxOnSuccess: null, // handled by photograph_flip below
          then: null
        }
      },
      {
        // This replaces wooden_box after box_key is used
        id: "wooden_box_open",
        label: "Wooden Box",
        x: 8, y: 52, width: 10, height: 25,
        requiresItem: "box_key",
        action: {
          type: "conditional",
          requiresItem: "coordinates",
          speaker: "You",
          textSuccess: "Nothing left in the box. But those coordinates have to lead somewhere.",
          textFail_sequence: {
            type: "photograph_flip",
            imageFront: "assets/ui/photograph_young.png",
            imageBack: "assets/ui/photograph_coordinates.png",
            captionFront: "Two people on a hill. There's something written on the back.",
            captionBack: "67°23'41\"N 14°52'09\"E — Feelianco.",
            then: {
              type: "pickup",
              item: { id: "coordinates", label: "Coordinates" },
              speaker: "You",
              text: "Feelianco. That's where she went."
            }
          }
        }
      }
    ]
  },

  // ── FEELIANCO ─────────────────────────────────────────────────────────────
  feelianco: {
    id: "feelianco",
    name: "Feelianco",
    background: "assets/backgrounds/feelianco.jpg",
    onEnter: {
      type: "dialogue",
      speaker: "You",
      text: "Wait. I've seen this place before. The photograph."
    },
    props: [],
    hotspots: [
      {
        id: "brita_hammock",
        label: "Someone in the Hammock",
        x: 25, y: 30, width: 45, height: 55,
        action: { type: "scene", target: "ending_brita" }
      },
      {
        id: "record_player",
        label: "Record Player",
        x: 42, y: 62, width: 16, height: 24,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "An old record player. Opera. The needle's been on this record a long time."
        }
      },
      {
        id: "city_view",
        label: "The City",
        x: 10, y: 5, width: 80, height: 25,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "The city is just a smudge of light from here. From a distance it looks almost peaceful."
        }
      }
    ]
  },

  // ── ENDING BRITA (conversation scene) ────────────────────────────────────
  ending_brita: {
    id: "ending_brita",
    name: "Feelianco",
    background: "assets/backgrounds/ending_brita.jpg",
    onEnter: {
      type: "dialogue_sequence_auto",
      lines: [
        { speaker: "Brita", text: "I wondered how long it would take." },
        { speaker: "You", text: "Edvard hired me." },
        { speaker: "Brita", text: "Of course he did. Are you going to tell him?" }
      ],
      onComplete: { type: "choice" }
    },
    props: [],
    hotspots: [
      {
        id: "brita_talk",
        label: "Brita",
        x: 20, y: 20, width: 60, height: 70,
        action: {
          type: "dialogue",
          speaker: "Brita",
          text: "You can go now. The case is closed."
        }
      }
    ]
  },

  // ── ENDING A ──────────────────────────────────────────────────────────────
  ending_a: {
    id: "ending_a",
    name: "Feelianco",
    background: "assets/backgrounds/ending_brita.jpg",
    props: [],
    hotspots: [
      {
        id: "brita_ending_a",
        label: "Brita",
        x: 20, y: 20, width: 60, height: 70,
        action: {
          type: "dialogue_sequence",
          lines: [
            { speaker: "You", text: "He deserves to know you're safe." },
            { speaker: "Brita", text: "Safe. Yes, I suppose I am." },
            { speaker: "You", text: "He's frightened. Whatever complicated thing is between you, he loves you." },
            { speaker: "Brita", text: "Edvard loves the idea of me. The successful older sister who makes him look good by comparison." },
            { speaker: "Brita", text: "But you're right. That's still a kind of love. Give me a week. I'll come back on my own terms." },
            { speaker: "Brita", text: "Edvard. It's me. I'm alive. Tell the detective thank you." },
            { speaker: "Brita", text: "You can go now. The case is closed." }
          ],
          onComplete: { type: "endcard", branch: "a" }
        }
      }
    ]
  },

  // ── ENDING B ──────────────────────────────────────────────────────────────
  ending_b: {
    id: "ending_b",
    name: "Feelianco",
    background: "assets/backgrounds/ending_brita.jpg",
    props: [],
    hotspots: [
      {
        id: "brita_ending_b",
        label: "Brita",
        x: 20, y: 20, width: 60, height: 70,
        action: {
          type: "dialogue_sequence",
          lines: [
            { speaker: "You", text: "I'll tell Edvard it's a lost case." },
            { speaker: "Brita", text: "You'd do that?" },
            { speaker: "You", text: "It's not my job to bring people back who don't want to be brought back." },
            { speaker: "Brita", text: "No. I suppose it isn't." },
            { speaker: "You", text: "Is there anything you want me to tell him?" },
            { speaker: "Brita", text: "Tell him I was happy. He won't believe it, but tell him anyway." },
            { speaker: "Brita", text: "Detective. Thank you for not asking me why." }
          ],
          onComplete: { type: "endcard", branch: "b" }
        }
      }
    ]
  }

};
