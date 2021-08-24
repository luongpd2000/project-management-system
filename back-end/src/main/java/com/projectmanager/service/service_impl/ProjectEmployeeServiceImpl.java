package com.projectmanager.service.service_impl;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.repository.ProjectEmployeeRepository;
import com.projectmanager.repository.UserRepository;
import com.projectmanager.service.ProjectEmployeeService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public Page<ProjectEmployee> findByProjectId(Integer id, Pageable pageable) {
        return projectEmployeeRepository.findByProjectIdAndDeleteIsFalse(id,pageable);
    }

    @Override
    public Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId) {
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
            {   pe.setDelete(false);

                projectEmployeeRepository.save(pe);
            };
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
