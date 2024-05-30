export interface Event {
  id: string;
  descriptionCurrentPlayer: string;
  descriptionOthers: string;
  actions: { [key: string]: Action };
}

export interface Action {
  label: string;
  nextEventId?: string;
  test?: {
    attribute:
      | "strength"
      | "constitution"
      | "charisma"
      | "dexterity"
      | "knowledge"
      | "perception";
    bonus: number;
  };
  successEventId?: string;
  failureEventId?: string;
  changeTurn: boolean;
  effects?: string[];
}

export const events: { [key: string]: Event } = {
  /*   tavernStart: {
    id: "tavernStart",
    descriptionCurrentPlayer: "You are in a tavern. What do you do?",
    descriptionOthers:
      "Inside the tavern, laughter and conversation fill the air. Adventurers swap stories over tankards of ale while a bard's merry tune drifts in the background. Amidst it all, ${player} considers their next move.",
    actions: {
      drink: {
        label: "Have a drink (Constitution)",
        test: { attribute: "constitution", bonus: 0 },
        successEventId: "drinkSuccess",
        failureEventId: "drinkFailure_0",
        changeTurn: false,
      },
      gatherInfo: {
        label: "Gather information (Charisma)",
        test: { attribute: "charisma", bonus: 0 },
        successEventId: "infoSuccess",
        failureEventId: "infoFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "tavernStart",
        changeTurn: true,
      },
    },
  },
  drinkSuccess: {
    id: "drinkSuccess",
    descriptionCurrentPlayer: "You drink successfully and feel revitalized.",
    descriptionOthers: "${player} drinks successfully and feels revitalized.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "tavernStart",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "constIncrease"],
      },
    },
  },
  drinkFailure_0: {
    id: "drinkFailure_0",
    descriptionCurrentPlayer:
      "You decide to take a drink, but your feeble constitution couldn't handle it...",
    descriptionOthers:
      "${player} decides to take a drink, but chokes while drinking...",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "drinkFailure_1",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "timerStart", "timedDrinkFailure"],
      },
    },
  },
  drinkFailure_1: {
    id: "drinkFailure_1",
    descriptionCurrentPlayer: "${affectedPlayer} choke, what do you do?",
    descriptionOthers:
      "${affectedPlayer} is choking, ${player} watch the pitiful scene.",
    actions: {
      help: {
        label: "Call for help",
        test: { attribute: "charisma", bonus: 0 },
        successEventId: "helpSuccess",
        failureEventId: "helpFailure",
        changeTurn: false,
        effects: ["timerReduce"],
      },
      backSlap: {
        label: "Help by tapping on the back",
        test: { attribute: "strength", bonus: 0 },
        successEventId: "backSlapSuccess",
        failureEventId: "backSlapFailure",
        changeTurn: true,
        effects: ["timerReduce"],
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "drinkFailure_1",
        changeTurn: true,
        effects: ["timerReduce", "checkDrinkCriticalFailure"],
      },
    },
  },
  helpSuccess: {
    id: "helpSuccess",
    descriptionCurrentPlayer:
      "You attract someone's attention who comes to help ${affectedPlayer}.",
    descriptionOthers: "Someone comes to help ${affectedPlayer}.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "tavernStart",
        changeTurn: true,
        effects: ["timerNull"],
      },
    },
  },
  helpFailure: {
    id: "helpFailure",
    descriptionCurrentPlayer:
      "Your lack of charisma leaves everyone indifferent...",
    descriptionOthers:
      "${player}'s lack of charisma leaves everyone indifferent...",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "drinkFailure_1",
        changeTurn: true,
        effects: ["checkDrinkCriticalFailure"],
      },
    },
  },
  drinkCriticalFailure: {
    id: "drinkCriticalFailure",
    descriptionCurrentPlayer:
      "${affectedPlayer} lose one hit point due to choking.",
    descriptionOthers: "${affectedPlayer} loses one hit point due to choking.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "tavernStart",
        changeTurn: false,
        effects: ["constReduce", "timerNull"],
      },
    },
  }, */
  firstRoom: {
    id: "firstRoom",
    descriptionCurrentPlayer:
      "You enter the first room of the dungeon. Two doors lie ahead. You decide what to do next.",
    descriptionOthers: "${player} enters the first room, faced with two doors.",
    actions: {
      door1: {
        label: "Take the left door",
        nextEventId: "trapRoomHidden",
        changeTurn: true,
      },

      door3: {
        label: "Take the right door",
        nextEventId: "combatRoom",
        changeTurn: true,
      },
      inspectDoors: {
        label: "Inspect the doors (knowledge)",
        test: { attribute: "knowledge", bonus: 0 },
        successEventId: "inspectDoorSymbolSuccess",
        failureEventId: "inspectDoorSymbolFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "firstRoom",
        changeTurn: true,
      },
    },
  },
  secondRoom: {
    id: "secondRoom",
    descriptionCurrentPlayer:
      "You enter the second room of the dungeon. Two doors lie ahead.\nYou decide what to do next.",
    descriptionOthers:
      "${player} enters the second room, faced with two doors.",
    actions: {
      door1: {
        label: "Take the left door",
        nextEventId: "trapRoom",
        changeTurn: true,
      },
      door2: {
        label: "Take the middle door",
        nextEventId: "puzzleRoom",
        changeTurn: true,
      },
      inspectDoors: {
        label: "Inspect the doors (knowledge)",
        test: { attribute: "knowledge", bonus: 0 },
        successEventId: "inspectDoorSymbolSuccess",
        failureEventId: "inspectDoorSymbolFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "firstRoom",
        changeTurn: true,
      },
    },
  },
  inspectDoorSymbolSuccess: {
    id: "inspectDoorSymbolSuccess",
    descriptionCurrentPlayer:
      "You notice symbols on the doors indicating the challenges behind them.",
    descriptionOthers:
      "${player} inspects the doors and notices symbols indicating the challenges behind them.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoomSymbolsRevealed",
        changeTurn: true,
      },
    },
  },
  inspectDoorSymbolFailure: {
    id: "inspectDoorSymbolFailure",
    descriptionCurrentPlayer:
      "You fail to notice anything special about the doors.",
    descriptionOthers:
      "${player} fails to notice anything special about the doors.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
      },
    },
  },
  firstRoomSymbolsRevealed: {
    id: "firstRoomSymbolsRevealed",
    descriptionCurrentPlayer:
      "You see symbols on the doors: a skull for danger, a book for knowledge, and a treasure chest for traps.",
    descriptionOthers:
      "${player} sees symbols on the doors: a skull for danger, a book for knowledge, and a treasure chest for traps.",
    actions: {
      door1: {
        label: "Take the left door (skull)",
        nextEventId: "combatRoom",
        changeTurn: true,
      },
      door2: {
        label: "Take the middle door (book)",
        nextEventId: "puzzleRoom",
        changeTurn: true,
      },
      door3: {
        label: "Take the right door (treasure chest)",
        nextEventId: "trapRoomHidden",
        changeTurn: true,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "firstRoomSymbolsRevealed",
        changeTurn: true,
      },
    },
  },
  trapRoomHidden: {
    id: "trapRoomHidden",
    descriptionCurrentPlayer:
      "You enter an obscure room, in front sits a treasure.",
    descriptionOthers:
      "${player} enters the room. You follow him and see an obscure room. In front sits a treasure.",
    actions: {
      toTreasureDex: {
        label: "Jump quickly to the treasure",
        test: { attribute: "dexterity", bonus: 0 },
        successEventId: "gainTreasure",
        failureEventId: "walkIntoATrap",
        changeTurn: false,
      },
      toTreasurePer: {
        label: "Walk carefully to the treasure",
        test: { attribute: "perception", bonus: 0 },
        successEventId: "gainTreasure",
        failureEventId: "walkIntoATrap",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "trapRoomHidden",
        changeTurn: true,
      },
    },
  },
  trapRoomRevealed: {
    id: "trapRoomRevealed",
    descriptionCurrentPlayer:
      "The room is in reality filled with traps. You can still see the treasure ahead.",
    descriptionOthers:
      "${player} carefully evolves among the traps. He seems to think about the good decision to take.",
    actions: {
      disarmTraps: {
        label: "Disarm traps (Dexterity)",
        test: { attribute: "dexterity", bonus: 0 },
        successEventId: "disarmAllSuccess",
        failureEventId: "disarmAllFailure",
        changeTurn: false,
      },
      endure: {
        label: "Endure traps (Constitution)",
        test: { attribute: "constitution", bonus: 14 },
        successEventId: "endureSuccess",
        failureEventId: "endureFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "trapRoomRevealed",
        changeTurn: true,
      },
    },
  },

  walkIntoATrap: {
    id: "walkIntoATrap",
    descriptionCurrentPlayer: "Whoops. You walk into a trap. What do you do ?",
    descriptionOthers: "${player} activated a trap!",
    actions: {
      disarmTraps: {
        label: "Disarm traps (Dexterity)",
        test: { attribute: "dexterity", bonus: 0 },
        successEventId: "disarmSuccess",
        failureEventId: "disarmFailure",
        changeTurn: false,
      },
      endure: {
        label: "Endure traps (Constitution)",
        test: { attribute: "constitution", bonus: 14 },
        successEventId: "endureSuccess",
        failureEventId: "endureFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "walkIntoATrap_1",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "timerStart", "timedTrapFailure"],
      },
    },
  },
  walkIntoATrap_1: {
    id: "drinkFailure_1",
    descriptionCurrentPlayer: "${affectedPlayer} has a foot, what do you do?",
    descriptionOthers:
      "${affectedPlayer} is quite worry about this pisky situation, ${player} watch the scene.",
    actions: {
      disarmTraps: {
        label: "Try to disarm the trap (Dexterity)",
        test: { attribute: "dexterity", bonus: 0 },
        successEventId: "disarmSuccess",
        failureEventId: "disarmFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "walkIntoATrap_1",
        changeTurn: true,
        effects: ["timerReduce", "checkTimedCriticalFailure"],
      },
    },
  },
  disarmAllSuccess: {
    id: "disarmAllSuccess",
    descriptionCurrentPlayer:
      "You successfully disarm all the traps and find a treasure.",
    descriptionOthers:
      "${player} skillfully disarms the traps and finds a treasure.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "secondRoom",
        changeTurn: true,
        effects: ["gainTreasure", "timerNull"],
      },
    },
  },
  disarmSuccess: {
    id: "disarmSuccess",
    descriptionCurrentPlayer:
      "You successfully disarm ${affectedPlayer}'s trap.",
    descriptionOthers: "${player} skillfully help ${affectedPlayer}.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "trapRoomRevealed",
        changeTurn: true,
        effects: ["timerNull"],
      },
    },
  },
  disarmFailure: {
    id: "disarmFailure",
    descriptionCurrentPlayer:
      "You fail to disarm the traps and get injured. You painfully flee from the room.",
    descriptionOthers:
      "${player} fails to disarm the traps and gets injured. You flee from the room.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "loseHealth", "timerNull"],
      },
    },
  },
  trapCriticalFailure: {
    id: "trapCriticalFailure",
    descriptionCurrentPlayer:
      "${affectedPlayer} lose two hit points due to the trap.",
    descriptionOthers: "${affectedPlayer} loses two hit point due to the trap.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: false,
        effects: [
          "loseHealth",
          "timerNull",
          "affectCurrentPlayer",
          "loseHealth",
        ],
      },
    },
  },
  gainTreasure: {
    id: "gainTreasure",
    descriptionCurrentPlayer: "You find a treasure!",
    descriptionOthers: "${player} finds a treasure!",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["gainTreasure"],
      },
    },
  },
  endureSuccess: {
    id: "endureSuccess",
    descriptionCurrentPlayer: "You endure the traps and find a treasure.",
    descriptionOthers:
      "${player} bravely endures the traps and finds a treasure.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["gainTreasure"],
      },
    },
  },
  endureFailure: {
    id: "endureFailure",
    descriptionCurrentPlayer:
      "You fail to endure the traps and get seriously injured.",
    descriptionOthers:
      "${player} fails to endure the traps and gets seriously injured.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: [
          "affectCurrentPlayer",
          "loseHealth",
          "affectCurrentPlayer",
          "loseHealth",
        ],
      },
    },
  },
  puzzleRoom: {
    id: "puzzleRoom",
    descriptionCurrentPlayer:
      "You enter a room with an ancient puzzle on the wall.",
    descriptionOthers:
      "${player} enters a room with an ancient puzzle on the wall, you follow him closely.",
    actions: {
      solvePuzzle: {
        label: "Solve puzzle (knowledge)",
        test: { attribute: "knowledge", bonus: 0 },
        successEventId: "puzzleSuccess",
        failureEventId: "puzzleFailure",
        changeTurn: false,
      },
      forceMechanism: {
        label: "Force mechanism (Strength)",
        test: { attribute: "strength", bonus: 14 },
        successEventId: "forceSuccess",
        failureEventId: "forceFailure",
        changeTurn: false,
      },
      doNothing: {
        label: "Do nothing",
        nextEventId: "puzzleRoom",
        changeTurn: true,
      },
    },
  },
  puzzleSuccess: {
    id: "puzzleSuccess",
    descriptionCurrentPlayer:
      "You solve the puzzle and a hidden door opens, revealing a treasure.",
    descriptionOthers:
      "${player} solves the puzzle and a hidden door opens, revealing a treasure.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["gainTreasure"],
      },
    },
  },
  puzzleFailure: {
    id: "puzzleFailure",
    descriptionCurrentPlayer:
      "You fail to solve the puzzle and nothing happens.",
    descriptionOthers:
      "${player} fails to solve the puzzle and nothing happens.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
      },
    },
  },
  forceSuccess: {
    id: "forceSuccess",
    descriptionCurrentPlayer:
      "You force the mechanism and a hidden door opens, revealing a treasure.",
    descriptionOthers:
      "${player} forces the mechanism and a hidden door opens, revealing a treasure.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["gainTreasure"],
      },
    },
  },
  forceFailure: {
    id: "forceFailure",
    descriptionCurrentPlayer:
      "You fail to force the mechanism and hurt yourself in the process.",
    descriptionOthers:
      "${player} fails to force the mechanism and hurts themselves in the process.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "loseHealth"],
      },
    },
  },
  combatRoom: {
    id: "combatRoom",
    descriptionCurrentPlayer:
      "You enter a room and are confronted by a fierce enemy.",
    descriptionOthers:
      "${player} enters a room followed by you. You meet a fierce enemy.",
    actions: {
      fight: {
        label: "Fight the enemy (Strength)",
        test: { attribute: "strength", bonus: 0 },
        successEventId: "fightSuccess",
        failureEventId: "fightFailure",
        changeTurn: false,
      },
      talk: {
        label: "Fight the enemy (Strength)",
        test: { attribute: "charisma", bonus: 0 },
        successEventId: "fightSuccess",
        failureEventId: "fightFailure",
        changeTurn: false,
      },
      flee: {
        label: "Flee the room (Dexterity)",
        test: { attribute: "dexterity", bonus: 0 },
        successEventId: "fleeSuccess",
        failureEventId: "fleeFailure",
        changeTurn: false,
      },
    },
  },
  fightSuccess: {
    id: "fightSuccess",
    descriptionCurrentPlayer: "You defeat the enemy and find a treasure.",
    descriptionOthers: "${player} defeats the enemy and finds a treasure.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
        effects: ["gainTreasure"],
      },
    },
  },
  fightFailure: {
    id: "fightFailure",
    descriptionCurrentPlayer: "You fail to defeat the enemy and get injured.",
    descriptionOthers: "${player} fails to defeat the enemy and gets injured.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "combatRoom",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "loseHealth"],
      },
    },
  },
  fleeSuccess: {
    id: "fleeSuccess",
    descriptionCurrentPlayer: "You successfully flee the room width your .",
    descriptionOthers:
      "${player} successfully distracts your enemy and everybody flee the room.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "firstRoom",
        changeTurn: true,
      },
    },
  },
  fleeFailure: {
    id: "fleeFailure",
    descriptionCurrentPlayer: "You fail to flee and the enemy attacks you.",
    descriptionOthers: "${player} fails to flee and the enemy attacks.",
    actions: {
      continue: {
        label: "Continue",
        nextEventId: "combatRoom",
        changeTurn: true,
        effects: ["affectCurrentPlayer", "loseHealth"],
      },
    },
  },
};
