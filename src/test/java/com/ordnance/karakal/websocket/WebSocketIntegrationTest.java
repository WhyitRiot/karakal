package com.ordnance.karakal.websocket;

import com.ordnance.karakal.game.GameState;
import org.jspecify.annotations.Nullable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.JacksonJsonMessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
public class WebSocketIntegrationTest {

    @LocalServerPort
    private int port;

    private WebSocketStompClient stompClient;
    private StompSession session;

    @BeforeEach
    void setup(){
        stompClient = new WebSocketStompClient(new StandardWebSocketClient());
        stompClient.setMessageConverter(new JacksonJsonMessageConverter());
    }

    @Test
    void shouldCreateGameAndReturnGameId() throws Exception {

        CompletableFuture<String> gameIdFuture = new CompletableFuture<>();

        session = stompClient.connectAsync(
                "ws://localhost:" + port + "/karakal",
                new StompSessionHandlerAdapter() {}
        ).get(1, TimeUnit.SECONDS);


        session.subscribe("/user/queue/karakal-created", new StompFrameHandler(){
            public Type getPayloadType(StompHeaders headers){
                return String.class;
            }
            public void handleFrame(StompHeaders headers, Object payload){
                gameIdFuture.complete((String) payload);
            }
        });

        System.out.println("CLIENT SESSION ID: " + session.getSessionId());

        Map<String, Object> message = new HashMap<>();
        message.put("type", "CREATE");
        System.out.println(new JacksonJsonMessageConverter());

        session.send("/app/play", message);

        String gameId = gameIdFuture.get(10, TimeUnit.SECONDS);

        assertNotNull(gameId);
        System.out.println("GAME ID: " +gameId);
    }


    @Test
    void shouldJoinGame() throws Exception {
        CompletableFuture<String> gameIdFuture = new CompletableFuture<>();
        CompletableFuture<GameState> gameStateFuture = new CompletableFuture<>();
        CompletableFuture<String> playerOneIdFuture = new CompletableFuture<>();
        CompletableFuture<String> playerTwoIdFuture = new CompletableFuture<>();

        session = stompClient.connectAsync(
                "ws://localhost:" + port + "/karakal",
                new StompSessionHandlerAdapter() {}
        ).get(1, TimeUnit.SECONDS);

        session.subscribe("/user/queue/karakal-created", new StompFrameHandler(){
            public Type getPayloadType(StompHeaders headers){
                return String.class;
            }
            public void handleFrame(StompHeaders headers, Object payload){
                gameIdFuture.complete((String) payload);
            }
        });

        session.subscribe("/user/queue/new-player", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, @Nullable Object payload) {
                playerOneIdFuture.complete((String) payload);
            }
        });

        Map<String, Object> message = new HashMap<>();
        message.put("type", "CREATE");

        session.send("/app/play", message);

        String gameId = gameIdFuture.get(5, TimeUnit.SECONDS);
        System.out.println("GAME ID: " + gameId);

        session.subscribe("/game/" + gameId, new StompFrameHandler(){
            public Type getPayloadType(StompHeaders headers){
                return GameState.class;
            }
            public void handleFrame(StompHeaders headers, Object payload){
                gameStateFuture.complete((GameState) payload);
            }
        });

        Map<String, Object> joinMessage = new HashMap<>();
        joinMessage.put("type", "JOIN");
        joinMessage.put("gameId", gameId);
        joinMessage.put("playerName", "Wyatt");

        session.send("/app/play", joinMessage);

        GameState gameState = gameStateFuture.get(5, TimeUnit.SECONDS);
        String playerId = playerOneIdFuture.get(5, TimeUnit.SECONDS);

        assertNotNull(gameState);
        assertNotNull(playerId);
        System.out.println("PLAYER ID: " + playerId);
        System.out.println(gameState);
    }

    @Test
    void shouldBeginGame() throws Exception{
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.initialize();

        stompClient.setTaskScheduler(taskScheduler);
        CompletableFuture<String> gameIdFuture = new CompletableFuture<>();
        AtomicReference<CompletableFuture<GameState>> gameStateRef =
                new AtomicReference<>(new CompletableFuture<>());
        CompletableFuture<String> playerOneIdFuture = new CompletableFuture<>();
        CompletableFuture<String> playerTwoIdFuture = new CompletableFuture<>();

        session = stompClient.connectAsync(
                "ws://localhost:" + port + "/karakal",
                new StompSessionHandlerAdapter() {}
        ).get(1, TimeUnit.SECONDS);

        session.setAutoReceipt(true);

        session.subscribe("/user/queue/karakal-created", new StompFrameHandler(){
            public Type getPayloadType(StompHeaders headers){
                return String.class;
            }
            public void handleFrame(StompHeaders headers, Object payload){
                gameIdFuture.complete((String) payload);
            }
        });

        AtomicInteger counter = new AtomicInteger();
        session.subscribe("/user/queue/new-player", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, @Nullable Object payload) {
                if (counter.getAndIncrement() == 0){
                    playerOneIdFuture.complete((String) payload);
                }else{
                    playerTwoIdFuture.complete((String) payload);
                }
            }
        });

        Map<String, Object> message = new HashMap<>();
        message.put("type", "CREATE");

        session.send("/app/play", message);

        String gameId = gameIdFuture.get(5, TimeUnit.SECONDS);
        System.out.println("GAME ID: " + gameId);


        session.subscribe("/game/" + gameId, new StompFrameHandler(){
            public Type getPayloadType(StompHeaders headers){
                return GameState.class;
            }
            public void handleFrame(StompHeaders headers, Object payload){
                gameStateRef.get().complete((GameState) payload);
            }
        });

        Map<String, Object> joinMessage = new HashMap<>();
        joinMessage.put("type", "JOIN");
        joinMessage.put("gameId", gameId);
        joinMessage.put("playerName", "Wyatt");

        session.send("/app/play", joinMessage);
        GameState state = gameStateRef.get().get(5, TimeUnit.SECONDS);
        System.out.println(state);
        gameStateRef.set(new CompletableFuture<>());
        String playerOneId = playerOneIdFuture.get(5, TimeUnit.SECONDS);
        joinMessage.put("playerName", "Lilly");
        session.send("/app/play", joinMessage);
        String playerTwoId = playerTwoIdFuture.get(5, TimeUnit.SECONDS);

        assertNotNull(playerOneId);
        assertNotNull(playerTwoId);

        Map<String, Object> startMessage = new HashMap<>();
        startMessage.put("type", "START");
        startMessage.put("gameId", gameId);
        StompSession.Receiptable receiptable = session.send("/app/play", startMessage);
        System.out.println(receiptable);
        gameStateRef.set(new CompletableFuture<>());
        GameState stateTwo = gameStateRef.get().get(10, TimeUnit.SECONDS);
        System.out.println(stateTwo);
        assertThat(stateTwo.inProgress).isEqualTo(true);
    }
}
