package com.projectmanager.service.service_impl;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.User;
import com.projectmanager.repository.ProjectEmployeeRepository;
import com.projectmanager.repository.UserRepository;
import com.projectmanager.service.ProjectEmployeeService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectEmployeeServiceImpl implements ProjectEmployeeService {

    @Autowired
    ProjectEmployeeRepository projectEmployeeRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Page<ProjectEmployee> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<ProjectEmployee> findById(Integer id) {
        return projectEmployeeRepository.findById(id);
    }



    @Override
    public ProjectEmployee create(ProjectEmployee projectEmployee) {
        projectEmployee.setDelete(false);
        return projectEmployeeRepository.save(projectEmployee);
    }

    @Override
    public boolean update(ProjectEmployee projectEmployee) {
        Optional<ProjectEmployee> employee = projectEmployeeRepository.findByProjectIdAndUserIdAndDeleteIsFalse
                (projectEmployee.getProjectId(), projectEmployee.getUser().getId());
        if(!employee.isPresent()){
            return false;
        }else {
            employee.get().setRole(projectEmployee.getRole());
            employee.get().setDes(projectEmployee.getDes());
            projectEmployeeRepository.save(employee.get());
        }
        return true;
    }

    @Override
    public boolean delete(Integer id) {
        Optional<ProjectEmployee> employee = projectEmployeeRepository.findById(id);
        if (!employee.isPresent() || employee.get().getDelete()) {
            return false;
        }else {
             Integer uId = employee.get().getUser().getId();
             Integer pId = employee.get().getProjectId();
             if(uId!=null&&pId!=null){
                 userRepository.moveToAdminTaskByUidAndPid(uId, pId);
                 userRepository.moveToAdminTodoByUidAndPid(uId, pId);
                 employee.get().setDelete(true);
                 return true;
             }
             return false;
        }

    }

    @Override
    public List<ProjectEmployee> findByProjectId(Integer id) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return projectEmployeeRepository.findByProjectId(id,sort);
    }

    @Override
    public List<ProjectEmployee> findByProjectIdAndDeleteIsFalse(Integer id) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return projectEmployeeRepository.findByProjectIdAndDeleteIsFalse(id,sort);
    }

    @Override
    public List<ProjectEmployee> findByProjectIdAndDeleteIsTrue(Integer id) {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        return projectEmployeeRepository.findByProjectIdAndDeleteIsTrue(id,sort);
    }

    @Override
    public Optional<ProjectEmployee> findByProjectIdAndUserIdAndDeleteIsFalse(Integer projectId, Integer userId) {
        return projectEmployeeRepository.findByProjectIdAndUserIdAndDeleteIsFalse(projectId, userId);
    }

    @Override
    public Page<ProjectEmployee> findByUserIdAndDeleteIsFalse(Integer userId, Pageable pageable) {
        return projectEmployeeRepository.findByUserIdAndDeleteIsFalse(userId,pageable);
    }

    @Override
    public Boolean addPartner(ArrayList<ProjectEmployee> list) {
        try{
            for ( ProjectEmployee pe : list)
            {
                Optional<ProjectEmployee> p = this.findByProjectIdAndUserId(pe.getProjectId(),pe.getUser().getId());
                if(p.isPresent()) {
                    p.get().setDelete(false);
                    p.get().setDes(pe.getDes());
                    p.get().setRole(pe.getRole());
                    p.get().setUser(pe.getUser());
                    System.out.println(p.get());
                    projectEmployeeRepository.save(p.get());
                }else {
                    System.out.println(pe);
                    pe.setDelete(false);
                    projectEmployeeRepository.save(pe);
                }
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<ProjectEmployee> findByProjectIdAndUser(Integer projectId, User user) {
        return projectEmployeeRepository.findByProjectIdAndUser(projectId,user);
    }

    @Override
    public Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId) {
        return projectEmployeeRepository.findByProjectIdAndUserId(projectId,userId);
    }
}
