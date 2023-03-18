package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/admin/users")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> admin() {
        return userService.userList();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id) {
        User user = userService.findById(id);
        return user;
    }

    @PostMapping()
    public User add(@RequestBody User user) {
        System.out.println("Пользователь добавлен");
        userService.add(user);
        return user;
    }

    @PatchMapping()
    public User patch(@RequestBody User user) {
        System.out.println("Пользователь обновлён");
        userService.update(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        System.out.println("Пользователь удалён");
        userService.deleteById(id);
        return String.format("User with ID = %d was deleted", id);
    }
}
