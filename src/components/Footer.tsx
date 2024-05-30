interface Footer {
  yourTurn: boolean;
  currentPlayerId: string;
}

export default function Footer({ yourTurn, currentPlayerId }: Footer) {
  return (
    <footer>
      {yourTurn ? (
        <p>It's your turn!</p>
      ) : (
        <p>Waiting for {Rune.getPlayerInfo(currentPlayerId)?.displayName}...</p>
      )}
    </footer>
  );
}
