package com.ordnance.karakal.websocket;

import com.ordnance.karakal.rest.user.User;
import com.ordnance.karakal.rest.user.UserService;
import org.jspecify.annotations.Nullable;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class UserHandshakeHandler extends DefaultHandshakeHandler {
    private UserService userService;

    public UserHandshakeHandler(UserService userService){
        this.userService = userService;
    }
    @Override
    protected @Nullable Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {

        if (request instanceof ServletServerHttpRequest servletRequest) {
            String username = servletRequest.getServletRequest().getParameter("username");

            if (username != null) {
                Optional<User> userOpt = userService.findUserByUserName(username);
                User user = userOpt.orElseGet(() -> userService.createUser(username));

                return () -> user.getPlayerId().toString();
            }
        }
        return () -> null;
    }
}
