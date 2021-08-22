package com.projectmanager.controller;

import com.projectmanager.dto.PasswordRecover;
import com.projectmanager.dto.Status;
import com.projectmanager.entity.Project;
import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.User;
import com.projectmanager.service.ProjectEmployeeService;
import com.projectmanager.service.ProjectService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Scanner;

@RestController
@RequestMapping("/api/v1/project_management/admin")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
// api mà chỉ admin dùng được
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    ProjectEmployeeService projectEmployeeService;

    @Autowired
    ProjectService projectService;

    // api user management
    @GetMapping("/userList")//
    public ResponseEntity<?> userList(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                      @RequestParam(name = "size", defaultValue = "100") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.getAll(pageable));
    }

//    @GetMapping("/findAll")
//    public ResponseEntity<?> findAll(){
//        return ResponseEntity.ok(userService.findAllByDeleteIsFalse());
//    }

    @PostMapping("/addUser")//
    public ResponseEntity<?> userList(@RequestBody ArrayList<ProjectEmployee> listRole) {
        return ResponseEntity.ok(projectEmployeeService.addPartner(listRole));
    }

    @PostMapping("/createUser")//
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }


    @DeleteMapping("/deleteUser/{id}")//
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {

        return ResponseEntity.ok(userService.delete(id));
    }

    // api ProjectEmployee management

    @PostMapping("/createProjectEmployee")//
    public ResponseEntity<?> createProjectEmployee(@Valid @RequestBody ProjectEmployee projectEmployee) {
        return ResponseEntity.ok(projectEmployeeService.create(projectEmployee));
    }

    @DeleteMapping("/deleteProjectEmployee/{id}")//
    public ResponseEntity<?> deleteProjectEmployee(@PathVariable Integer id) {
        return ResponseEntity.ok(projectEmployeeService.delete(id));
    }

    @PutMapping("/updateProjectEmployee")//
    public ResponseEntity<?> updateUser(@RequestBody ProjectEmployee projectEmployee) {
        return ResponseEntity.ok(projectEmployeeService.update(projectEmployee));
    }

    //project api

    @PostMapping("/insertProject")//
    public ResponseEntity<?> insertProject(@Valid @RequestBody Project project) {
        return ResponseEntity.ok(projectService.create(project));
    }

    @PutMapping("updateProject")//
    public ResponseEntity<?> updateProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.update(project));
    }

    @DeleteMapping("deleteProject/{id}")//
    public ResponseEntity<?> deleteProject(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.delete(id));
    }

    @PostMapping("/passwordRecover")//
    public ResponseEntity<?> passwordRecover(@RequestBody PasswordRecover pr) {
        return ResponseEntity.ok(new Status(userService.passwordRecover(pr)));
    }

}
