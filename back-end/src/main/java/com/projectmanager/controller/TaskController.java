package com.projectmanager.controller;


import com.projectmanager.entity.Task;
import com.projectmanager.service.TaskService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/project_management/")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {


    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @GetMapping("/taskList")
    public ResponseEntity<?> taskList(@RequestParam(name = "page") Integer page,
                                      @RequestParam(name = "size") Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(taskService.getAll(pageable));
    }

    @GetMapping("/findTaskById/{id}")
    public ResponseEntity<?> findTaskById(@PathVariable Integer id){
        return ResponseEntity.ok(taskService.findById(id));
    }

    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@Valid @RequestBody Task task){
        return ResponseEntity.ok(taskService.create(task));
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id){

        return ResponseEntity.ok(taskService.delete(id));
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task task){
        return ResponseEntity.ok(taskService.update(task));
    }

    @GetMapping("/userTaskList")
    public ResponseEntity<?> userTaskList(@RequestParam(name = "userId") Integer id){
        return ResponseEntity.ok(taskService.findByUser(id));
    }

    @GetMapping("/projectTaskList")
    public ResponseEntity<?> projectTaskList(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                             @RequestParam(name = "size", defaultValue = "100") Integer size,
            @RequestParam(name = "projectId") Integer id){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(taskService.findByProjectPageable(id, pageable));
    }

    @GetMapping("/projectTaskListAll")
    public ResponseEntity<?> projectTaskListAll(@RequestParam(name = "projectId") Integer id){
        return ResponseEntity.ok(taskService.findByProject(id));
    }

}
