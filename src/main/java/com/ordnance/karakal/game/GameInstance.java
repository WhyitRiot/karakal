package com.ordnance.karakal.game;

import java.util.*;

public class GameInstance {
    private final int cardDealAmount = 7;
    private Map<Long, Card> cardMap;
    private Deque<Long> deck;
    private Map<UUID, Player> playerMap;
    private List<UUID> players;
    private int currentPlayerIndex;
    private String gameId;
    private DiscardAction lastPlay;
    private UUID currentPlayer;
    private List<Long> discard;

    public GameInstance(String gameId){
        this.gameId = gameId;
        this.cardMap = createDeck();
        this.deck = shuffleDeck(this.cardMap);
        ArrayList<Long> firstDiscard = new ArrayList<>();
        firstDiscard.add(this.deck.pop());
        this.lastPlay = new DiscardAction(null, firstDiscard);
    }

    public void addPlayer(UUID uuid, String name){
        Player newPlayer = new Player(uuid, name);
        dealHand(newPlayer);
        this.playerMap.put(uuid, newPlayer);
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
        nextTurn();
    }

    public void nextTurn(){
        currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
        UUID nextPlayer = players.get(currentPlayerIndex);
    }

    public Map<Long, Card> createDeck(){
        Map<Long, Card> map = new HashMap<>();
        long id = 0L;
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
}
