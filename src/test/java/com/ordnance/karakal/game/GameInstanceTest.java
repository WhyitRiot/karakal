package com.ordnance.karakal.game;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.in;

public class GameInstanceTest {

    GameInstance newGame;
    GameInstance newGameWithPlayers;
    UUID wyattId = UUID.randomUUID();
    UUID lillyId = UUID.randomUUID();
    Player newPlayer;
    Player playerTwo;
    int deckSizeAfterInitialShuffle = 53;
    int initialPlayerHandSize = 7;
    @BeforeEach
    void init(){
        newGame = new GameInstance("test");
        newGameWithPlayers = new GameInstance("newGameWithPlayers");
        newGameWithPlayers.addPlayer(wyattId, "wyatt");
        newGameWithPlayers.addPlayer(lillyId, "lilly");
    }

    @Test
    void shouldCreateGameAndShuffleDeck() {
        assertThat(newGame.getDeck().size()).isEqualTo(deckSizeAfterInitialShuffle);
        assertThat(newGame.getLastDiscard().size()).isEqualTo(1);
        assertThat(newGame.getDiscard().size()).isEqualTo(0);
    }
    @Test
    void shouldAddPlayersAndDealHand(){
        newGame.addPlayer(wyattId, "wyatt");
        newGame.addPlayer(lillyId, "lilly");
        assertThat(newGame.getPlayers().size()).isEqualTo(2);
        assertThat(newGame.getPlayerByUUID(wyattId).getHand().size()).isEqualTo(initialPlayerHandSize);
        newGame.printPlayerHandByUUID(wyattId);
        System.out.println();
        assertThat(newGame.getPlayerByUUID(lillyId).getHand().size()).isEqualTo(initialPlayerHandSize);
        newGame.printPlayerHandByUUID(lillyId);
        assertThat(newGame.getDeck().size()).isEqualTo(deckSizeAfterInitialShuffle - (initialPlayerHandSize * 2));
    }
    @Test
    void shouldBeginGameAndSetTurn(){
        assertThat(newGameWithPlayers.getCurrentPlayer()).isNull();
        newGameWithPlayers.startGame();
        assertThat(newGameWithPlayers.getCurrentPlayer()).isNotNull();
        assertThat(newGameWithPlayers.getCurrentPlayer()).isEqualTo(wyattId);
        newGameWithPlayers.nextTurn();
        assertThat(newGameWithPlayers.getCurrentPlayer()).isEqualTo(lillyId);
        newGameWithPlayers.nextTurn();
        assertThat(newGameWithPlayers.getCurrentPlayer()).isEqualTo(wyattId);
    }
    @Test
    void shouldBeAbleToDrawAndDiscard(){
        newGameWithPlayers.startGame();

        //Discard
        assertThat(newGameWithPlayers.getPlayerByUUID(wyattId).getHand().size()).isEqualTo(initialPlayerHandSize);
        ArrayList<Long> cards = new ArrayList<>();
        cards.add(newGameWithPlayers.getPlayerByUUID(wyattId).getHand().getFirst());
        newGameWithPlayers.discard(wyattId, cards);
        assertThat(newGameWithPlayers.getPlayerByUUID(wyattId).getHand().size()).isEqualTo(initialPlayerHandSize -1);

        //Draw from deck
        newGameWithPlayers.drawFromDeck();
        assertThat(newGameWithPlayers.getPlayerByUUID(wyattId).getHand().size()).isEqualTo(initialPlayerHandSize);

        ArrayList<Long> lillyCards = new ArrayList<>();
        lillyCards.add(newGameWithPlayers.getPlayerByUUID(lillyId).getHand().getFirst());
        newGameWithPlayers.discard(lillyId, lillyCards);

        //Draw from Discard
        newGameWithPlayers.drawFromDiscard(cards.getFirst());
        assertThat(newGameWithPlayers.getPlayerByUUID(lillyId).getHand().size()).isEqualTo(initialPlayerHandSize);
    }
}
