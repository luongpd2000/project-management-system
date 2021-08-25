package com.projectmanager.service;

import com.projectmanager.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService extends GeneralService<Project> {
    Page<Project> FindAllNotDelete(Integer userId, Pageable pageable);
    List<Project> findProjectByUserId(Integer userId);
    List<Project> getListProjectOfUser(Integer uId);
    List<Project> findAll();
//    Project findProjectById(Integer pId);
    List<Project> searchProject(String name, String status, String startDate, String endDate);
    List<Project> searchProjectWithUserId(Integer uId, String name, String status, String startDate, String endDate);
}
