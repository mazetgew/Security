package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String admin(Principal principal, Model model) {
        model.addAttribute("users", userService.userList());
        model.addAttribute("admin", userService.findByUsername(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.roleList());
        return "admin-page";
    }

    /* @GetMapping("/allUsers")
    public String allUsers(Model model) {
        model.addAttribute("users", userService.userList());
        return "allUsers";
    }

    @GetMapping("/user/{id}")
    public String userId(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findById(id));
        model.addAttribute("roles", roleService.roleList());
        return "edit";
    } */

    @PatchMapping("/{id}")
    public String patch(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    /* @GetMapping("/addUser")
    public String addUser(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("roles", roleService.roleList());
        return "addUser";
    } */

    @PostMapping
    public String add(@ModelAttribute("newUser") User user) {
        userService.add(user);
        return "redirect:/admin";
    }

    /* @GetMapping("/user/{id}/delete")
    public String delete(@ModelAttribute("user") User user) {
        userService.delete(user);
        return "redirect:/admin/allUsers";
    } */

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }
}
