package com.projectmanager.controller;

import com.projectmanager.dto.Status;
import com.projectmanager.dto.UserDto;
import com.projectmanager.entity.*;
import com.projectmanager.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    TodoService todoService;

    @Autowired
    TodoHistoryService todoHistoryService;

    @Autowired
    private TaskService taskService;

    @Autowired
    TaskHistoryService taskHistoryService;

    // User management api
    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserDto user) {
        User user2 = userService.findById(user.getId()).get();
        System.out.println(user);

        //User user1 = new User();
        user2.setFullName(user.getFullName());
        user2.setEmail(user.getEmail());
        user2.setPhone(user.getPhone());
        user2.setAddress(user.getAddress());

        if (!user.getPassword().equals("")) {
            if (!bCryptPasswordEncoder.encode(user.getPassword()).equals(user2.getEncryptedPassword())) {
                return ResponseEntity.ok("Current Password not true");
            }
            user2.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getNewPassword()));
        }
        //user1.setEncryptedPassword(user2.getEncryptedPassword());
        return ResponseEntity.ok(userService.update(user2));
    }

    @GetMapping("/findUserById/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findById(id));
    }


    //  project MANAGEMENT API
    @GetMapping("/getAllProject")
    public ResponseEntity<?> getAllProject() {
//        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return ResponseEntity.ok(projectService.findAll());
    }

//    @GetMapping("/findProjectById/{id}")
//    public ResponseEntity<?> findProjectById(@PathVariable Integer id,
//                                             @RequestParam(name = "page") Integer page,
//                                             @RequestParam(name = "size") Integer size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return ResponseEntity.ok(projectService.FindAllNotDelete(id, pageable));
//    }

    @GetMapping("/findProjectByUserId/{id}")
    public ResponseEntity<?> findProjectByUserId(@PathVariable Integer id) {
//        Pageable pageable = PageRequest.of(page, size);
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return ResponseEntity.ok(projectService.findProjectByUserId(id));
    }

    //projectEmployee API
    @GetMapping("/findProjectListByUserId/{id}")
    public ResponseEntity<?> findProjectListByUserId(@PathVariable Integer id,
                                                     @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                     @RequestParam(name = "size", defaultValue = "100") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectEmployeeService.findByUserIdAndDeleteIsFalse(id, pageable));
    }


    @GetMapping("/getProjectById/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.findById(id));
    }


    @GetMapping("/checkLogin")
//    @ResponseBody
    public ResponseEntity<?> checkLogin() {
        return ResponseEntity.ok(new Status("LoggedIn"));
    }

    //user-employee management in a project API

    @GetMapping("/userInProject/{id}")
    public ResponseEntity<?> findUserInProject(@PathVariable Integer id) {
//        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return ResponseEntity.ok(userService.findAllUsersInProject(id));
    }


    @GetMapping("/userActiveInProject/{id}")
    public ResponseEntity<?> findUserActiveInProject(@PathVariable Integer id) {
//        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return ResponseEntity.ok(userService.findAllUsersInProject(id));
    }


    @GetMapping("/userDeletedInProject/{id}")
    public ResponseEntity<?> findUserDeletedInProject(@PathVariable Integer id) {
//        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return ResponseEntity.ok(userService.findAllUsersInProject(id));
    }



    @GetMapping("/findListEmployeeByProjectId/{id}")
    public ResponseEntity<?> findListEmployeeByProjectId(@PathVariable Integer id) {
        return ResponseEntity.ok(projectEmployeeService.findByProjectId(id));
    }

    @GetMapping("/findListEmployeeActiveByProjectId/{id}")
    public ResponseEntity<?> findListEmployeeActiveByProjectId(@PathVariable Integer id) {
        return ResponseEntity.ok(projectEmployeeService.findByProjectIdAndDeleteIsFalse(id));
    }

    @GetMapping("/findListEmployeeDeletedByProjectId/{id}")
    public ResponseEntity<?> findListEmployeeDeletedByProjectId(@PathVariable Integer id) {
        return ResponseEntity.ok(projectEmployeeService.findByProjectIdAndDeleteIsTrue(id));
    }


    @GetMapping("/getListProjectOfUser/{id}")
    public ResponseEntity<?> getListProjectOfUser(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getListProjectOfUser(id));
    }

    @GetMapping("/userNotInProject/{id}")
    public ResponseEntity<?> findUserNotInProject(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findAllUsersNotInProject(id));
    }

    //todo management API
    @GetMapping("/findByAssignedUser/{id}")
    public ResponseEntity<?> findByAssignedUser(@PathVariable Integer id,
                                                @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                @RequestParam(name = "size", defaultValue = "100") Integer size) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(todoService.findByAssignedUser(id, pageable));
    }

    @GetMapping("/findByAssignedUserNoPageable/{id}")
    public ResponseEntity<?> findByAssignedUserNoPageable(@PathVariable Integer id) {
        return ResponseEntity.ok(todoService.findByAssignedUser(id));
    }

    @PostMapping("/createTodo")
    public ResponseEntity<?> createTodo(@Valid @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.create(todo));
    }

    @DeleteMapping("/deleteTodo/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Integer id) {
        return ResponseEntity.ok(todoService.delete(id));
    }

    @PutMapping("/updateTodo")
    public ResponseEntity<?> updateTodo(@RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.update(todo));
    }

    @PostMapping("/createTodoHistory")
    public ResponseEntity<?> createTodoHistory(@Valid @RequestBody TodoHistory todoHistory) {
        return ResponseEntity.ok(todoHistoryService.create(todoHistory));
    }

    @GetMapping("/findTodoByTaskIdPageable/{id}")
    public ResponseEntity<?> findTodoByTaskIdPageable(@PathVariable Integer id,
                                                      @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                      @RequestParam(name = "size", defaultValue = "100") Integer size) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(todoService.findByTaskIdAndDeletedIsFalse(id, pageable));
    }

    @GetMapping("/findTodoByTaskIdNoPageable/{id}")
    public ResponseEntity<?> findTodoByTaskIdPageable(@PathVariable Integer id) {
        return ResponseEntity.ok(todoService.findByTaskIdAndDeletedIsFalse(id));
    }

    //Task management API
    @GetMapping("/taskList")
    public ResponseEntity<?> taskList(@RequestParam(name = "page") Integer page,
                                      @RequestParam(name = "size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(taskService.getAll(pageable));
    }

    @GetMapping("/findTaskById/{id}")
    public ResponseEntity<?> findTaskById(@PathVariable Integer id) {
        return ResponseEntity.ok(taskService.findById(id));
    }

    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@Valid @RequestBody Task task) {
        return ResponseEntity.ok(taskService.create(task));
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id) {

        return ResponseEntity.ok(taskService.delete(id));
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.update(task));
    }

    @GetMapping("/userTaskList")
    public ResponseEntity<?> userTaskList(@RequestParam(name = "userId") Integer id) {
        return ResponseEntity.ok(taskService.findByUser(id));
    }

    @GetMapping("/userTaskListPageable")
    public ResponseEntity<?> userTaskListPageable(@RequestParam(name = "userId") Integer id,
                                                  @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                  @RequestParam(name = "size", defaultValue = "100") Integer size) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(taskService.findByUserPageable(id, pageable));
    }

    @GetMapping("/projectTaskList")
    public ResponseEntity<?> projectTaskList(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                             @RequestParam(name = "size", defaultValue = "100") Integer size,
                                             @RequestParam(name = "projectId") Integer id) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        Pageable pageable = PageRequest.of(page, size,sort);
        return ResponseEntity.ok(taskService.findByProjectPageable(id, pageable));
    }

    @GetMapping("/projectTaskListAll")
    public ResponseEntity<?> projectTaskListAll(@RequestParam(name = "projectId") Integer id) {
        return ResponseEntity.ok(taskService.findByProject(id));
    }



    @PostMapping("/createTaskHistory")
    public ResponseEntity<?> createTaskHistory(@Valid @RequestBody TaskHistory taskHistory) {
        return ResponseEntity.ok(taskHistoryService.create(taskHistory));
    }





    //

//    @GetMapping("/findProjectEmployeeById/{id}")
//    public ResponseEntity<?> findProjectEmployeeById(@PathVariable Integer id){
//        System.out.println(projectEmployeeService.findById(id));
//        return ResponseEntity.ok(projectEmployeeService.findById(id));
//    }


}
