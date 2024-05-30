import { Item } from "../utils/items";
import {
  Charisma,
  Constitution,
  Dexterity,
  Knowledge,
  Perception,
  Strength,
} from "../utils/Icons.tsx";
import { useState } from "react";

interface PlayerInformations {
  name: string | undefined;
  strength: number | undefined;
  constitution: number | undefined;
  charisma: number | undefined;
  perception: number | undefined;
  knowledge: number | undefined;
  dexterity: number | undefined;
  gold: Item | undefined;
  weapon: Item | null | undefined;
  items: Item[] | undefined;
  unSelectPlayer: () => void;
}

export default function PlayerInformations({
  strength,
  constitution,
  charisma,
  perception,
  knowledge,
  dexterity,
  gold,
  weapon,
  items,
  unSelectPlayer,
}: PlayerInformations) {
  const [menuSelected, setMenuSelected] = useState<string[]>([
    "Items",
    "Skills",
  ]);
  const [statSelected, setStatSelected] = useState<string | null>(null);
  const getStatDescription = (stat: string) => {
    let text: string = "";

    switch (stat) {
      case "strength":
        if (strength) {
          if (strength <= 39) {
            text =
              "Your muscles seem underdeveloped, your strength is clearly below average";
          } else if (strength <= 60) {
            text =
              "You have average strength, capable of lifting typical loads without excessive difficulty.";
          } else if (strength <= 80) {
            text =
              "You possess above-average strength, your muscles are well-trained and you can handle demanding physical tasks.";
          } else {
            text =
              "Your strength is impressive, your powerful muscles grant you superhuman ability to lift considerable weights.";
          }
        }

        break;
      case "constitution":
        if (constitution) {
          if (constitution <= 39) {
            text =
              "Your endurance is lacking, leaving you vulnerable to fatigue and illness.";
          } else if (constitution <= 60) {
            text =
              "You possess average stamina and endurance, able to endure moderate physical strain without tiring excessively.";
          } else if (constitution <= 80) {
            text =
              "Your constitution is above average, granting you resilience against fatigue and illness.";
          } else {
            text =
              "Your stamina and endurance are exceptional, allowing you to withstand prolonged physical exertion and recover quickly from injuries.";
          }
        }
        break;
      case "dexterity":
        if (dexterity) {
          if (dexterity <= 39) {
            text =
              "Your movements are clumsy and uncoordinated, hindering your ability to react swiftly.";
          } else if (dexterity <= 60) {
            text =
              "You possess average agility and coordination, capable of performing most tasks with moderate skill.";
          } else if (dexterity <= 80) {
            text =
              "Your dexterity is above average, allowing you to move with agility and react quickly to changing situations.";
          } else {
            text =
              "Your agility and coordination are exceptional, granting you remarkable speed and precision in your movements.";
          }
        }
        break;
      case "perception":
        if (perception) {
          if (perception <= 39) {
            text =
              "Your perception is dulled, making it difficult for you to notice details or detect subtle changes in your surroundings.";
          } else if (perception <= 60) {
            text =
              "You possess average perception, able to notice basic details and react to obvious cues in your environment.";
          } else if (perception <= 80) {
            text =
              "Your perception is sharp, allowing you to detect subtle nuances and anticipate events before they occur.";
          } else {
            text =
              "Your perception is exceptional, granting you keen senses and the ability to perceive even the slightest changes in your environment";
          }
        }
        break;
      case "knowledge":
        if (knowledge) {
          if (knowledge <= 39) {
            text =
              "Your knowledge is limited, leaving you with gaps in your understanding and awareness of the world.";
          } else if (knowledge <= 60) {
            text =
              "You possess average intellect and wisdom, with a basic understanding of common concepts and principles.";
          } else if (knowledge <= 80) {
            text =
              "Your knowledge is above average, indicating a broad understanding of various subjects and the ability to apply your insights effectively.";
          } else {
            text =
              "Your intellect and wisdom are exceptional, allowing you to grasp complex concepts quickly and apply your knowledge with wisdom and insight.";
          }
        }
        break;
      case "charisma":
        if (charisma) {
          if (charisma <= 39) {
            text =
              "Your charisma is lacking, making it difficult for you to connect with others or influence them effectively.";
          } else if (charisma <= 60) {
            text =
              "You possess average charisma, able to interact with others in a neutral manner but lacking in true charisma.";
          } else if (charisma <= 80) {
            text =
              "Your charisma is above average, allowing you to inspire trust and admiration in others through your words and actions";
          } else {
            text =
              "Your charisma is exceptional, making you a natural leader and influencer, capable of captivating others with your presence and charm.";
          }
        }
        break;
      default:
        text = "Click on a stat to get information.";
        break;
    }
    return text;
  };
  const handleMenuSelect = (menu: string) => {
    let nextMenu: string[] = [""];
    switch (menu) {
      case "Items":
        nextMenu = ["Items", "Skills"];
        break;
      case "Skills":
        nextMenu = ["Skills", "Items"];
        break;
    }
    setMenuSelected(nextMenu);
  };

  return (
    <div className="checked-player-infos">
      <nav className="infos-buttons-container">
        <button onClick={() => handleMenuSelect(menuSelected[1])}>
          Go to {menuSelected[0]}
        </button>
      </nav>
      {menuSelected[1] === "Skills" && (
        <div className="stats-menu-container">
          <h1>Skills</h1>
          <section className="stats-container">
            <div
              className={`infos-stat-container ${
                statSelected === "strength" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(statSelected === "strength" ? null : "strength")
              }
            >
              <Strength />
              <p className="stat-number">{strength}</p>
            </div>
            <div
              className={`infos-stat-container ${
                statSelected === "constitution" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(
                  statSelected === "constitution" ? null : "constitution"
                )
              }
            >
              <Constitution />
              <p className="stat-number">{constitution}</p>
            </div>
            <div
              className={`infos-stat-container ${
                statSelected === "dexterity" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(
                  statSelected === "dexterity" ? null : "dexterity"
                )
              }
            >
              <Dexterity />
              <p className="stat-number">{dexterity}</p>
            </div>
            <div
              className={`infos-stat-container ${
                statSelected === "perception" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(
                  statSelected === "perception" ? null : "perception"
                )
              }
            >
              <Perception />
              <p className="stat-number">{perception}</p>
            </div>
            <div
              className={`infos-stat-container ${
                statSelected === "knowledge" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(
                  statSelected === "knowledge" ? null : "knowledge"
                )
              }
            >
              <Knowledge />
              <p className="stat-number">{knowledge}</p>
            </div>
            <div
              className={`infos-stat-container ${
                statSelected === "charisma" ? "stat-selected" : ""
              }`}
              onClick={() =>
                setStatSelected(statSelected === "charisma" ? null : "charisma")
              }
            >
              <Charisma />
              <p className="stat-number">{charisma}</p>
            </div>
          </section>

          <p className="stat-description">
            {getStatDescription(statSelected ?? "")}
          </p>
        </div>
      )}
      {menuSelected[1] === "Items" && (
        <section className="items-container">
          <div className="items-top">
            <div className="item">
              <h2>Gold</h2>
              <img className="icon" src={gold?.icon} alt="Gold" />
              <p>{gold?.amount}</p>
            </div>
            {weapon ? (
              <div className="item">
                <h2>Weapon</h2>
                <img className="icon" src={weapon?.icon} alt={weapon?.name} />
                <p>{weapon?.name}</p>
              </div>
            ) : (
              <div className="item">
                <h2>Weapon</h2>
                <p>No weapon</p>
              </div>
            )}
          </div>
          <div className="item">
            <h2>Items</h2>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <div key={index}>
                  <img className="icon" src={item.icon} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))
            ) : (
              <p>No items available</p>
            )}
          </div>
        </section>
      )}
      <button onClick={unSelectPlayer}>Back</button>
    </div>
  );
}
