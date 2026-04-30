package com.ordnance.karakal.game;

import java.util.*;

public class GameInstance {
    private final Map<UUID, Player> playerMap;
    private final TreeMap<UUID, Integer> leaderboard;
    private final List<UUID> players;
    private final Map<UUID, Integer> scores;
    private final int cardDealAmount = 7;
    private final int gameOverPointThreshold = 100;
    private final int deckToPlayerRatio = 4;

    private int startingDeckCount = 1;
    private int expectedPlayerCount = 4;
    private Map<Long, Card> cardMap;
    private Deque<Long> deck;
    private boolean gameOver;
    private int currentPlayerIndex;
    private String gameId;
    private DiscardAction lastPlay;
    private UUID currentPlayer;
    private UUID karakalPlayer;
    private boolean finalRound;
    private boolean started;
    private List<Long> discard;
    private Long lastCardDrawnFromDeck;

    public GameInstance(String gameId){
        this.gameId = gameId;
        this.cardMap = createDeck(startingDeckCount);
        this.playerMap = new HashMap<>();
        this.gameOver = false;
        this.started = false;
        this.scores = new HashMap<>();
        this.leaderboard = new TreeMap<>();
        this.players = new ArrayList<>();
        this.deck = shuffleDeck(this.cardMap);
        this.lastCardDrawnFromDeck = null;
        this.discard = new ArrayList<>();
        this.finalRound = false;
        ArrayList<Long> firstDiscard = new ArrayList<>();
        firstDiscard.add(this.deck.pop());
        this.lastPlay = new DiscardAction(null, firstDiscard);
    }

    public GameState getState(){
        GameState snapshot = new GameState();
        snapshot.currentPlayer = this.currentPlayer;
        snapshot.gameId = this.gameId;
        snapshot.deckSize = this.deck.size();
        snapshot.discardSize = this.discard.size();
        snapshot.players = this.players;
        snapshot.leaderboard = this.leaderboard;
        snapshot.lastPlay = new DiscardActionSnap(this.lastPlay.playerId);
        for (long id : this.lastPlay.cardIds){
            snapshot.lastPlay.cards.add(cardMap.get(id));
        }
        snapshot.inProgress = this.started;
        return snapshot;
    }

    public PlayerState getPlayerState(UUID playerId){
        PlayerState snapshot = new PlayerState();
        Player player = getPlayerByUUID(playerId);
        snapshot.userId = player.getUuid();
        snapshot.name = player.getName();
        snapshot.score = player.getScore();
        List<Card> playerHand = new ArrayList<>();
        for (long id : player.getHand()){
            playerHand.add(this.cardMap.get(id));
        }
        snapshot.hand = playerHand;
        return snapshot;
    }

    public void addPlayer(UUID uuid, String name){
        if (players.size() + 1 > expectedPlayerCount){
            expectedPlayerCount += deckToPlayerRatio;
            this.lastPlay.cardIds.clear();
            this.cardMap = createDeck(++startingDeckCount);
            this.deck = shuffleDeck(this.cardMap);
            this.lastPlay.cardIds.add(this.deck.pop());
            dealDeck();
        }
        Player newPlayer = new Player(uuid, name);
        this.players.add(uuid);
        dealHand(newPlayer);
        this.playerMap.put(uuid, newPlayer);
        this.scores.put(uuid, 0);
    }

    public void dealDeck(){
        for (UUID uuid: this.playerMap.keySet()){
            dealHand(this.playerMap.get(uuid));
        }
    }

    public void dealHand(Player player){
        List<Long> hand = new ArrayList<>();
        for (int i = 0; i < cardDealAmount; i++){
            hand.add(this.deck.pop());
        }
        player.setHand(hand);
    }

    public void startGame(){
        this.currentPlayer = players.getFirst();
        this.started = true;
    }

    public void drawFromDiscard(long cardId){
        Player player = playerMap.get(this.currentPlayer);
        this.lastPlay.cardIds.remove(cardId);
        player.getHand().add(cardId);
        this.discard.addAll(this.lastPlay.cardIds);
        nextTurn();
    }

    public void drawFromDeck(){
        Player player = playerMap.get(this.currentPlayer);
        this.lastCardDrawnFromDeck = this.deck.pop();
        player.getHand().add(this.lastCardDrawnFromDeck);
        nextTurn();
    }

    public Card getLastCardFromDeck(){
        return this.cardMap.get(this.lastCardDrawnFromDeck);
    }

    public void resetDeck(){
        if (!deck.isEmpty()){
            return;
        }
        Collections.shuffle(this.discard);
        this.deck.addAll(this.discard);
        this.discard.clear();
    }

    public void discard(UUID uuid, List<Long> cardIds){
        Player player = playerMap.get(uuid);
        if (!isStraight(cardIds) && !isRanked(cardIds)){
            return;
        }
        for (Long id : cardIds){
            player.getHand().remove(id);
        }
        this.discard.addAll(this.lastPlay.cardIds);
        this.lastPlay = new DiscardAction(uuid, cardIds);
    }

    public void calculateScore(UUID uuid){
        Player player = playerMap.get(uuid);
        int score = 0;
        List<Long> handSnapshot = player.getHand();
        for (long id: player.getHand()){
            score += cardMap.get(id).getRank().getValue();
        }
        player.setScore(score);
    }

    public void callKarakal(){
        this.karakalPlayer = currentPlayer;
        nextTurn();
    }

    public void nextTurn(){
        calculateScore(currentPlayer);
        if (karakalPlayer == null){
            currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
            this.currentPlayer = players.get(currentPlayerIndex);
        } else if (karakalPlayer.equals(currentPlayer) && finalRound){
            calculateRoundScore();
            endRound();
            if (!gameOver){
                newRound();
            }
        } else if (karakalPlayer != null){
            finalRound = true;
            currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
            this.currentPlayer = players.get(currentPlayerIndex);
        }
    }

    public void newRound(){
        this.deck = shuffleDeck(this.cardMap);
        this.discard.clear();
        ArrayList<Long> firstDiscard = new ArrayList<>();
        firstDiscard.add(deck.pop());
        this.lastPlay = new DiscardAction(null, firstDiscard);
        for (UUID uuid : playerMap.keySet()){
            dealHand(playerMap.get(uuid));
        }
    }

    public void endRound(){
        this.karakalPlayer = null;
        for (UUID uuid : playerMap.keySet()){
            playerMap.get(uuid).setScore(0);
        }
    }

    public void calculateRoundScore(){
        Map<UUID, Integer> tempScores = new HashMap<>();
        int lowest = Integer.MAX_VALUE;
        UUID lowestPlayer = karakalPlayer;
        for (UUID uuid : scores.keySet()){
            int score = playerMap.get(uuid).getScore();
            if (score < lowest){
                lowest = score;
                lowestPlayer = uuid;
            }
            tempScores.put(uuid, score);
        }
        this.currentPlayer = lowestPlayer;
        if (scores.get(karakalPlayer) > lowest){
            scores.put(karakalPlayer, scores.get(karakalPlayer) + 30);
        }
        for (UUID uuid : scores.keySet()){
            if (uuid.equals(karakalPlayer)){
                continue;
            }
            int score = playerMap.get(uuid).getScore();
            if (score > lowest){
                scores.put(uuid, scores.get(uuid) + score);
            }
            if (scores.get(uuid) >= gameOverPointThreshold){
                this.gameOver = true;
            }
        }
        leaderboard.putAll(scores);
    }

    public Map<Long, Card> createDeck(int decks){
        Map<Long, Card> map = new HashMap<>();
        long id = 0L;
        for (int i = 0; i < decks; i++){
            map.put(id,new Card(id,null, Rank.Joker));
            id++;
            map.put(id,new Card(id, null, Rank.Joker));
            id++;
            for (Suit suit : Suit.values()){
                for (Rank rank : Rank.values()){
                    if (rank == Rank.Joker){
                        continue;
                    }
                    map.put(id, new Card(id, suit, rank));
                    id++;
                }
            }
        }
        return map;
    }

    public Deque<Long> shuffleDeck(Map<Long, Card> map){
        List<Long> ids = new ArrayList<>(cardMap.keySet());
        Collections.shuffle(ids);
        return new ArrayDeque<>(ids);
    }

    public final Comparator<Long> SORT_BY_MAP =
            (a, b) -> {
                if (cardMap.get(a).getRank() == Rank.Joker || cardMap.get(b).getRank() == Rank.Joker) {
                    return 0;
                }
                return Integer.compare(cardMap.get(a).getRank().getValue(), cardMap.get(b).getRank().getValue());
            };

    public int countJokers(List<Long> discard){
        int jokerCount = 0;
        for (int i = 0; i < discard.size(); i++){
            if (cardMap.get(discard.get(i)).getRank() == Rank.Joker){
                jokerCount++;
            }
        }
        return jokerCount;
    }

    public boolean isStraight(List<Long> discard){
        int jokerCount = countJokers(discard);
        int index = 0;
        int prevRank = cardMap.get(discard.get(index)).getRank().getValue();
        while (prevRank == Rank.Joker.getValue()){
            prevRank = cardMap.get(discard.get(++index)).getRank().getValue();
        }
        Suit prevSuit = cardMap.get(discard.get(index++)).getSuit();
        Card card;
        Rank currentRank;
        Suit currentSuit;
        for (int i = 0; i < discard.size(); i++){
            card = cardMap.get(discard.get(i));
            currentRank = card.getRank();
            if (currentRank == Rank.Joker){
                continue;
            }
            currentSuit = card.getSuit();
            if (prevSuit != currentSuit){
                return false;
            }
            if (prevRank != currentRank.getValue() -1){
                if (jokerCount > 0){
                    jokerCount--;
                    prevRank++;
                }
                else{
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isRanked(List<Long> discard){
        Card first = cardMap.get(discard.getFirst());
        for (int i = 1; i < discard.size(); i++) {
            Card current = cardMap.get(discard.get(i));

            if (Card.BY_RANK.compare(first, current) != 0) {
                return false;
            }
        }
        return true;
    }

    public List<Long> getLastDiscard(){
        return this.lastPlay.cardIds;
    }

    public Deque<Long> getDeck() {
        return deck;
    }

    public void setDeck(Deque<Long> deck) {
        this.deck = deck;
    }

    public List<Long> getDiscard() {
        return discard;
    }

    public void setDiscard(List<Long> discard) {
        this.discard = discard;
    }

    public void addPlayer(Player player){
        this.playerMap.put(player.getUuid(), player);
        this.players.add(player.getUuid());
    }

    public boolean isPlayersTurn(UUID uuid){
        return this.currentPlayer == uuid;
    }

    public void setCurrentPlayer(UUID uuid){
        this.currentPlayer = uuid;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public UUID getCurrentPlayer(){
        return this.currentPlayer;
    }

    public List<UUID> getPlayers(){
        return this.players;
    }

    public Player getPlayerByUUID(UUID uuid){
        return playerMap.get(uuid);
    }

    public void printPlayerHandByUUID(UUID uuid){
        Player player = this.playerMap.get(uuid);
        for (long id: player.getHand()){
            System.out.println(this.cardMap.get(id));
        }
    }

    public boolean isGameOver(){
        return this.gameOver;
    }

    public void printDeck(){
        System.out.println("Cards in deck: " + this.deck.size());
        for(long id: this.deck){
            System.out.println(cardMap.get(id));
        }
    }
}
