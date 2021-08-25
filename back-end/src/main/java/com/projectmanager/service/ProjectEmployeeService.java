package com.projectmanager.service;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface ProjectEmployeeService extends GeneralService<ProjectEmployee>{

    List<ProjectEmployee> findByProjectId(Integer id);

    List<ProjectEmployee> findByProjectIdAndDeleteIsFalse(Integer id);

    List<ProjectEmployee> findByProjectIdAndDeleteIsTrue(Integer id);


    Optional<ProjectEmployee> findByProjectIdAndUserIdAndDeleteIsFalse(Integer projectId, Integer userId);

    Page<ProjectEmployee> findByUserIdAndDeleteIsFalse(Integer userId,Pageable pageable);

    Boolean addPartner(ArrayList<ProjectEmployee> list);

    Optional<ProjectEmployee> findByProjectIdAndUser(Integer projectId, User user);

    Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId);



}
