package com.projectmanager.controller;

import com.projectmanager.entity.Project;
import com.projectmanager.entity.User;
import com.projectmanager.service.ProjectService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/project_management/")
// api chung mà cả admin lần user đều dùng được
public class Controller {

    @Autowired
    UserService userService;

    @Autowired
    ProjectService projectService;

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return ResponseEntity.ok(userService.update(user));
    }
//
    @GetMapping("/findProjectById")
    public ResponseEntity<?>findProjectById(@RequestParam(name="id") Integer id,
                                            @RequestParam(name = "page") Integer page,
                                            @RequestParam(name = "size")Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.FindAllNotDelete(id, pageable));
    }

    @GetMapping("/findProjectByUserId")
    public ResponseEntity<?>findProjectByUserId(@RequestParam(name="id") Integer id)  {
//        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.findProjectByUserId(id));
    }


}
