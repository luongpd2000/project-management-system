package com.projectmanager.service;

import com.projectmanager.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskService extends GeneralService<Task>{

    Optional<Task> findByName(String name);

    List<Task> findByUser(Integer id);

    Page<Task> findByUserPageable(Integer id,Pageable pageable);

    Page<Task> findByProjectPageable(Integer id, Pageable pageable);

    List<Task> findByProject(Integer id);



}
