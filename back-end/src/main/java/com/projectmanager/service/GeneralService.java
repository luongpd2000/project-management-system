package com.projectmanager.service;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface GeneralService<T>  {

    Page<T> getAll(Pageable pageable);

    Optional<User> findById(Long id);

    T create(T t);

    boolean update(T t);

    boolean delete(Long id);

}
