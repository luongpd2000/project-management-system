package com.projectmanager.controller;


import com.projectmanager.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/project_management/")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/todoList")
    public ResponseEntity<?> todoList(@RequestParam(name = "page") Integer page,
                                      @RequestParam(name = "size") Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(todoService.getAll(pageable));
    }

    @GetMapping("/findTodoById/{id}")
    public ResponseEntity<?> findTodoById(@PathVariable Integer id){
        return ResponseEntity.ok(todoService.findById(id));
    }
}
