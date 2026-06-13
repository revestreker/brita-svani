// scenes.js — The Mystery of Brita Svani
const SCENES = {

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
          type: "dialogue",
          speaker: "You",
          text: "Mamma Cale's. Still open. I can see figures inside through the window."
        }
      },
      {
        id: "back_alley",
        label: "Back Alley",
        x: 18, y: 51, width: 4, height: 35,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "A narrow passage between the buildings. Dark. Smells like last week."
        }
      },
      {
        id: "camping_wagon",
        label: "Up on the Hill",
        x: 7, y: 5, width: 6, height: 15,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Up on the hill. That's where I came from. No reason to go back yet."
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

  living_room: {
    id: "living_room",
    name: "Brita's Living Room",
    background: "assets/backgrounds/living_room.jpg",
    props: [
      {
        id: "bottle_prop",
        image: "assets/props/bottle.png",
        x: 13, y: 62,
        width: 3, height: 15
      }
    ],
    hotspots: [
      {
        id: "big_window",
        label: "Back Outside",
        x: 37, y: 23, width: 49, height: 49,
        action: {
          type: "scene",
          target: "exterior"
        }
      },
      {
        id: "table",
        label: "Left overs",
        x: 43, y: 72, width: 21, height: 9,
        action: {
          type: "dialogue",
          speaker: "You",
          text: "Looks like someone left in a hurry."
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
  }

};
