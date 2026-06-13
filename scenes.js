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
        id: "apartment_entrance",
        label: "Brita's Apartment",
        x: 70, y: 40, width: 6, height: 22,
        action: {
          type: "scene",
          target: "living_room"
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
