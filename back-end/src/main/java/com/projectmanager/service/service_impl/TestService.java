package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Task;
import com.projectmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class TestService {

    @Autowired
    TaskRepository taskRepository;

    public List<Task> getAllTask(){
        return  taskRepository.findAll();
    }

}
