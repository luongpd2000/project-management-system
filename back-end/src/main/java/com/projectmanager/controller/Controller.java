package com.projectmanager.controller;

import com.projectmanager.entity.User;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project_management/")
// api chung mà cả admin lần user đều dùng được
public class Controller {

    @Autowired
    UserService userService;

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User user){

        return ResponseEntity.ok(userService.update(user));
    }
}
