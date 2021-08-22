package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Task;
import com.projectmanager.repository.TaskRepository;
import com.projectmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class TaskServiceImpl implements TaskService {


    @Autowired
    TaskRepository taskRepository;

    @Override
    public Optional<Task> findById(Integer id) {
        return taskRepository.findByIdAndDeletedIsFalse(id);
    }

    @Override
    public Page<Task> getAll(Pageable pageable) {
        return taskRepository.findAllByDeletedIsFalse(pageable);
    }

    @Override
    public Task create(Task task) {

        Optional<Task> t = taskRepository.findByNameAndDeletedIsFalse(task.getName());

        if(!t.isPresent()) {

////            task.setAdmin(false);
            task.setDeleted(false);
            task.setCreateDate(Date.valueOf(LocalDate.now()));
            return taskRepository.save(task);
        }
        return null;
    }

    @Override
    public boolean update(Task task) {

        Optional<Task> t = taskRepository.findByIdAndDeletedIsFalse(task.getId());
        System.out.println(t);

        if (!t.isPresent()){
            return false;
        } else {
            taskRepository.save(task);
            return true;
        }
    }

    @Override
    public boolean delete(Integer id) {
        Optional<Task> t = taskRepository.findByIdAndDeletedIsFalse(id);
        System.out.println(t);

        if(!t.isPresent()) {
            return false;
        }else {
            t.get().setDeleted(true);
            taskRepository.save(t.get());
            return true;
        }
    }

    @Override
    public Optional<Task> findByName(String name) {
        return taskRepository.findByNameAndDeletedIsFalse(name);
    }

    @Override
    public Optional<Task> findByUser(Integer id){
        return taskRepository.findByCreateUserAndDeletedIsFalse(id);
    }

    @Override
    public Page<Task> findByProject(Integer id, Pageable pageable){
        return taskRepository.getByProjectIdAndDeletedIsFalse(id, pageable);
    }

}
