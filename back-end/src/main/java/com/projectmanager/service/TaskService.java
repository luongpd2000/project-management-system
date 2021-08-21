package com.projectmanager.service;

import com.projectmanager.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskService extends GeneralService<Task>{

    Optional<Task> findByName(String name);

    Optional<Task> findByUser(Integer id);

    Page<Task> findByProject(Integer id, Pageable pageable);


}
