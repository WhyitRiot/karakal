package com.ordnance.karakal.rest.user;

import com.github.f4b6a3.uuid.UuidCreator;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private UserRepository userRepository;
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public Optional<User> findUserByUserName(String username){
        return this.userRepository.findUserByUsername(username);
    }
    public Optional<User> findUserByUUID(UUID uuid){
        return this.userRepository.findUserByPlayerId(uuid);
    }
    public User saveUser(User user){
        return userRepository.save(user);
    }
    public User createUser(String username){
        Optional<User> foundUser = this.userRepository.findUserByUsername(username);
        if (foundUser.isEmpty()){
            UUID id = UuidCreator.getTimeOrderedEpoch();
            User createdUser = new User(id, username);
            return this.userRepository.save(createdUser);
        } else{
            return null;
        }
    }
    public User updateUser(User user){
        Optional<User> foundUser = this.userRepository.findUserByPlayerId(user.getPlayerId());
        if (foundUser.isPresent()){
            User updatedUser = foundUser.get();
            updatedUser.setUsername(user.getUsername());
            return this.userRepository.save(updatedUser);
        }
        return null;
    }
}
