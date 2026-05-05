package com.ordnance.karakal.rest.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> userLogin(@RequestBody User user){
        Optional<User> foundUser = this.userService.findUserByUserName(user.getUsername());
        return foundUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/new-player")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User createdUser = this.userService.createUser(user.getUsername());
        if (createdUser != null) return ResponseEntity.ok(createdUser);
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
