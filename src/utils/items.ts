import icons from "../utils/loadIcons";

export interface Item {
  name: string;
  description: string;
  icon?: string;
  type: string;
  amount?: number;
  attributeBonus?: ItemBonus[];
}

export interface ItemBonus {
  attribute:
    | "strength"
    | "constitution"
    | "charisma"
    | "dexterity"
    | "intelligence"
    | "perception";
  modifier: number;
}

export const items: Item[] = [
  {
    name: "Gold",
    description: "Your gold",
    icon: icons["gold"],
    type: "gold",
    amount: 15,
  },
  {
    name: "Gladius",
    description: "A small sword",
    icon: icons["gladius"],
    type: "weapon",
    attributeBonus: [{ attribute: "strength", modifier: 2 }],
  },
  {
    name: "Flat Hammer",
    description: "A standard hammer",
    icon: icons["flatHammer"],
    type: "weapon",
    attributeBonus: [{ attribute: "constitution", modifier: 2 }],
  },
  {
    name: "Old Dagger",
    description: "An old dagger",
    icon: icons["oldDagger"],
    type: "weapon",
    attributeBonus: [{ attribute: "dexterity", modifier: 2 }],
  },
  {
    name: "Walking Staff",
    description: "A standard staff",
    icon: icons["oldStick"],
    type: "weapon",
    attributeBonus: [{ attribute: "intelligence", modifier: 2 }],
  },
  {
    name: "Slingshot",
    description: "A standard bow",
    icon: icons["slingshot"],
    type: "weapon",
    attributeBonus: [{ attribute: "perception", modifier: 2 }],
  },
  {
    name: "Treasure",
    description: "The thing you are here for!",
    icon: icons["treasure"],
    type: "treasure",
  },
];
