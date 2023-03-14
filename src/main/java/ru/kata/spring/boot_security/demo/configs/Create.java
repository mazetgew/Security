package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Create {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Create(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void createUsersAndRoles() {
        Role roleUser = new Role("ROLE_USER");
        Role roleAdmin = new Role("ROLE_ADMIN");
        roleService.addRole(roleUser);
        roleService.addRole(roleAdmin);

        User user = new User("user", "111", "User", "User");
        User admin = new User("admin", "111", "Admin", "Admin");

        Set<Role> userRoleSet = new HashSet<>();
        userRoleSet.add(roleUser);
        user.setRoles(userRoleSet);

        Set<Role> adminRoleSet = new HashSet<>();
        adminRoleSet.add(roleUser);
        adminRoleSet.add(roleAdmin);
        admin.setRoles(adminRoleSet);

        userService.add(user);
        userService.add(admin);
    }

}
