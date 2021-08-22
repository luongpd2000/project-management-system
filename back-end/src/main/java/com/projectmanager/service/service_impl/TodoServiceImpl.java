package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Todo;
import com.projectmanager.repository.TodoRepository;
import com.projectmanager.service.TodoService;
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
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepository todoRepository;

    @Override
    public Page<Todo> getAll(Pageable pageable) {
        return todoRepository.findAllByDeletedIsFalse(pageable);
    }

    @Override
    public Optional<Todo> findById(Integer id) {
        return todoRepository.findByIdAndDeletedIsFalse(id);
    }

    @Override
    public Todo create(Todo todo) {
        Optional<Todo> t = todoRepository.findByNameAndDeletedIsFalse(todo.getName());
        if(todo.getTaskId()== t.get().getTaskId() && todo.getTodoType()==t.get().getTodoType()){
            return null;
        }
        if(!t.isPresent()) {
            todo.setDeleted(false);
            todo.setCreateDate(Date.valueOf(LocalDate.now()));
            return todoRepository.save(todo);
        }
        return null;
    }

    @Override
    public boolean update(Todo todo) {
        Optional<Todo> t = todoRepository.findByIdAndDeletedIsFalse(todo.getId());

        if (!t.isPresent()){
            return false;
        } else {
            todo.setUpdateDate(Date.valueOf(LocalDate.now()));
            todoRepository.save(todo);
        }

        return true;

    }

    @Override
    public boolean delete(Integer id) {
        Optional<Todo> t = todoRepository.findByIdAndDeletedIsFalse(id);

        if(!t.isPresent()) {
            return false;
        }else {
            t.get().setDeleted(true);
            todoRepository.save(t.get());
        }
        return false;
    }

    @Override
    public Optional<Todo> findByName(String name){
        return todoRepository.findByNameAndDeletedIsFalse(name);
    }

    @Override
    public Page<Todo> findByAssignedUser(Integer id, Pageable pageable) {
        return todoRepository.findByAssignedUserAndDeletedIsFalse(id,pageable);
    }

    @Override
    public List<Todo> findByAssignedUser(Integer id) {
        return todoRepository.findByAssignedUserAndDeletedIsFalse(id);
    }

    @Override
    public Page<Todo> findByTaskIdAndDeletedIsFalse(Integer id, Pageable pageable) {
        return todoRepository.findByTaskIdAndDeletedIsFalse(id, pageable);
    }

    @Override
    public List<Todo> findByTaskIdAndDeletedIsFalse(Integer id) {
        return todoRepository.findByTaskIdAndDeletedIsFalse(id);
    }


}
