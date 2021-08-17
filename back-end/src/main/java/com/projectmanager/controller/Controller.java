package com.projectmanager.controller;

import com.projectmanager.entity.User;
import com.projectmanager.service.ProjectEmployeeService;
import com.projectmanager.service.ProjectService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project_management/")
@CrossOrigin(origins = "http://localhost:4200")
// api chung mà cả admin lần user đều dùng được
public class Controller {

    @Autowired
    UserService userService;

    @Autowired
    ProjectService projectService;

    @Autowired
    ProjectEmployeeService projectEmployeeService;

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return ResponseEntity.ok(userService.update(user));
    }


    // api project
    @GetMapping("/findProjectById/{id}")
    public ResponseEntity<?>findProjectById(@PathVariable Integer id,
                                            @RequestParam(name = "page") Integer page,
                                            @RequestParam(name = "size")Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.FindAllNotDelete(id, pageable));
    }

    @GetMapping("/findProjectByUserId/{id}")
    public ResponseEntity<?>findProjectByUserId(@PathVariable Integer id)  {
//        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.findProjectByUserId(id));
    }

    //api projectEmployee
    @GetMapping("/findProjectListByUserId/{id}")
    public ResponseEntity<?> findProjectListByUserId(@PathVariable Integer id,
                                                          @RequestParam(name = "page") Integer page,
                                                          @RequestParam(name = "size")Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectEmployeeService.findByUserIdAndDeleteIsFalse(id,pageable));
    }

    @GetMapping("/getProjectById/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Integer id){
        return ResponseEntity.ok(projectService.findById(id));
    }
}
