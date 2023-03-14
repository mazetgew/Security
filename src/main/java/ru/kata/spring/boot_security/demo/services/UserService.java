package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserService {
    User findByUsername(String username);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    List<User> userList();

    User findById(Long id);

    void add(User user);

    void update(User user);

    void delete(User user);
}