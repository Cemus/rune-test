import { Player } from "../logic";
import formatDisplayName from "../utils/formatDisplayName.ts";
import { RedHeartIcon, GrayHeartIcon } from "../utils/Icons.tsx";

interface Header {
  players: Player[];
  yourPlayerId: string | undefined;
  checkedPlayer: string | null | undefined;
  handleCheckPlayer: (player: string) => void;
}

export default function Header({
  players,
  yourPlayerId,
  checkedPlayer,
  handleCheckPlayer,
}: Header) {
  const drawHearts = (player: Player) => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      i > player.hp - 1
        ? hearts.push(<GrayHeartIcon key={i} />)
        : hearts.push(<RedHeartIcon key={i} />);
    }
    return hearts;
  };

  return (
    <header>
      <div className="players-container">
        {players.map((player) => (
          <div
            className={
              checkedPlayer === player.id ? " player player-selected" : "player"
            }
            onClick={() => handleCheckPlayer(player.id)}
            key={player.id}
          >
            <img
              className={`avatars`}
              src={Rune.getPlayerInfo(player.id)?.avatarUrl}
              alt={`${Rune.getPlayerInfo(player.id)?.displayName}'s avatar`}
            />
            <p>
              {player.id !== yourPlayerId
                ? formatDisplayName(Rune.getPlayerInfo(player.id)?.displayName)
                : "You"}
            </p>
            <div className="hearts-container">{drawHearts(player)}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
