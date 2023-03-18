package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> admin() {
        return userService.userList();
    }

    @GetMapping("/{id}")
    public User id(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User add(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @PatchMapping
    public User patch(@RequestBody User user) {
        userService.update(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return String.format("User with ID = %d was deleted", id);
    }
}