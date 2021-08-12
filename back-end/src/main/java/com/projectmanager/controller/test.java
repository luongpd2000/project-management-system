package com.projectmanager.controller;

import com.projectmanager.entity.User;
import com.projectmanager.service.UserService;
import com.projectmanager.service.service_impl.ProjectServiceImpl;
import com.projectmanager.service.service_impl.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project")
public class test {

    @Autowired
    ProjectServiceImpl projectService;

    @Autowired
    TestService testService;

    @Autowired
    UserService userService;

    @GetMapping("/user/projectList")
    public ResponseEntity<?> projectList(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/admin/taskList")
    public ResponseEntity<?> taskList(){
        return ResponseEntity.ok(testService.getAllTask());
    }

    //@RequestBody User u
    @PostMapping("/admin/createUser")
    public ResponseEntity<?> createUser(@RequestBody User u) {
        System.out.println("ùitvhui");
		//return ResponseEntity.ok("ok");
        return ResponseEntity.ok(userService.createUser(u));
    }

    @GetMapping("/admin/userList")
    public ResponseEntity<?> userList(){
        return ResponseEntity.ok(userService.findAll());
    }
}
