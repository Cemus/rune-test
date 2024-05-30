import { useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import PlayerInformations from "./components/PlayerInformations";
import Header from "./components/Header";
import { events, Event } from "./utils/events";
import Footer from "./components/Footer";
import { GameState, Player } from "./utils/interfaces";

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [checkedPlayer, setCheckedPlayer] = useState<PlayerId | null>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);
      },
    });
  }, []);

  if (!game) {
    return null;
  }

  const handleCheckPlayer = (player: string) => {
    setCheckedPlayer((prevCheckedPlayer) => {
      return prevCheckedPlayer === player ? null : player;
    });
  };

  const unSelectPlayer = () => {
    setCheckedPlayer(null);
  };

  const {
    players,
    currentPlayerId,
    currentEventId,
    gameOver,
    affectedPlayersId,
  } = game;
  const yourTurn = yourPlayerId === currentPlayerId;
  const currentEvent = events[currentEventId];
  const getPlayerFromId = (id: PlayerId) => {
    return players.find((player) => player.id === id);
  };

  const handleActionClick = (actionKey: string) => {
    if (yourTurn) {
      Rune.actions.performAction(actionKey);
    }
  };

  const handleResetClick = () => {
    if (yourTurn) {
      Rune.actions.resetGame();
    }
  };

  function getEventDescription(event: Event, game: GameState): string {
    const currentPlayer = game.players.find((p) => p.id === currentPlayerId);
    const affectedPlayers = affectedPlayersId?.map((id) =>
      players.find((p) => p.id === id)
    );
    const displayName = (player: Player | undefined): string => {
      return player ? Rune.getPlayerInfo(player.id).displayName : "un joueur";
    };

    let description =
      currentPlayerId === yourPlayerId
        ? event.descriptionCurrentPlayer
        : event.descriptionOthers;

    if (currentPlayer) {
      description = description.replace(
        "${player}",
        displayName(currentPlayer)
      );
    }
    if (affectedPlayers && affectedPlayers.length > 0) {
      if (affectedPlayers.some((player) => player?.id === yourPlayerId)) {
        description = description.replace("${affectedPlayer}", "You");
        description = description.replace("is", "are");
      } else {
        const affectedPlayerNames = affectedPlayers.map(displayName).join(", ");
        description = description.replace(
          "${affectedPlayer}",
          affectedPlayerNames
        );
      }
    } else {
      description = description.replace("${affectedPlayer}", "aucun joueur");
    }

    return description;
  }

  return (
    <div className="container">
      <Header
        players={players}
        yourPlayerId={yourPlayerId}
        checkedPlayer={checkedPlayer}
        handleCheckPlayer={handleCheckPlayer}
      />
      {checkedPlayer && (
        <PlayerInformations
          name={Rune.getPlayerInfo(checkedPlayer)?.displayName}
          strength={getPlayerFromId(checkedPlayer)?.strength}
          constitution={getPlayerFromId(checkedPlayer)?.constitution}
          charisma={getPlayerFromId(checkedPlayer)?.charisma}
          perception={getPlayerFromId(checkedPlayer)?.perception}
          knowledge={getPlayerFromId(checkedPlayer)?.knowledge}
          dexterity={getPlayerFromId(checkedPlayer)?.dexterity}
          gold={getPlayerFromId(checkedPlayer)?.gold}
          weapon={getPlayerFromId(checkedPlayer)?.weapon}
          items={getPlayerFromId(checkedPlayer)?.items}
          unSelectPlayer={unSelectPlayer}
        />
      )}
      {gameOver && (
        <main>
          <h2>Game Over</h2>
          <button onClick={handleResetClick}>Retry ?</button>
        </main>
      )}
      {currentEvent && !gameOver && !checkedPlayer && (
        <main className="event-container">
          <p className="event-description">
            {getEventDescription(currentEvent, game)}
          </p>
          {yourTurn && (
            <div className="actions-container">
              {Object.keys(currentEvent.actions).map((actionKey) => (
                <button
                  className="action"
                  key={actionKey}
                  disabled={!yourTurn}
                  onClick={() => handleActionClick(actionKey)}
                >
                  {currentEvent.actions[actionKey].label}
                </button>
              ))}
            </div>
          )}
        </main>
      )}
      <Footer yourTurn={yourTurn} currentPlayerId={currentPlayerId} />
    </div>
  );
}

export default App;
