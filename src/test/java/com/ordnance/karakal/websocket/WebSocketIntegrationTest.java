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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

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
        CompletableFuture<String> playerIdFuture = new CompletableFuture<>();

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
                playerIdFuture.complete((String) payload);
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
        String playerId = playerIdFuture.get(5, TimeUnit.SECONDS);

        assertNotNull(gameState);
        assertNotNull(playerId);
        System.out.println("PLAYER ID: " + playerId);
        System.out.println(gameState);
    }
}
