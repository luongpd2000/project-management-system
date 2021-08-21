package com.projectmanager.controller;

import com.projectmanager.dto.Status;
import com.projectmanager.dto.UserDto;
import com.projectmanager.entity.User;
import com.projectmanager.service.ProjectEmployeeService;
import com.projectmanager.service.ProjectService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PutMapping("/updateUser")

    public ResponseEntity<?> updateUser(@RequestBody UserDto user){
        User user2 = userService.findById(user.getId()).get();
        System.out.println(user);

        //User user1 = new User();
        user2.setFullName(user.getFullName());
        user2.setEmail(user.getEmail());
        user2.setPhone(user.getPhone());
        user2.setAddress(user.getAddress());

        if(!user.getPassword().equals("")) {
            if(!bCryptPasswordEncoder.encode(user.getPassword()).equals(user2.getEncryptedPassword())){
                return ResponseEntity.ok("Current Password not true");
            }
            user2.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getNewPassword()));
        }
        //user1.setEncryptedPassword(user2.getEncryptedPassword());
        return ResponseEntity.ok(userService.update(user2));
    }



    @GetMapping("/findUserById/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));

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
                                                          @RequestParam(name = "page",defaultValue = "0") Integer page,
                                                          @RequestParam(name = "size",defaultValue = "100")Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectEmployeeService.findByUserIdAndDeleteIsFalse(id,pageable));
    }

    @GetMapping("/getProjectById/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Integer id){
        return ResponseEntity.ok(projectService.findById(id));
    }


    @GetMapping("/checkLogin")
//    @ResponseBody
    public ResponseEntity<?> checkLogin(){
        return ResponseEntity.ok(new Status("LoggedIn"));
    }

    @GetMapping("/userInProject/{id}")
    public ResponseEntity<?> findUserInProject(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findAllUsersInProject(id));
    }

    @GetMapping("/findListEmployeeByProjectId/{id}")
    public ResponseEntity<?> findListEmployeeByProjectId(@PathVariable Integer id,
                                                         @RequestParam(name = "page",defaultValue = "0") Integer page,
                                                         @RequestParam(name = "size",defaultValue = "100")Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectEmployeeService.findByProjectId(id,pageable));
    }

    @GetMapping("/getListProjectOfUser/{id}")
    public ResponseEntity<?> getListProjectOfUser(@PathVariable Integer id){
        return ResponseEntity.ok(projectService.getListProjectOfUser(id));
    }

}
