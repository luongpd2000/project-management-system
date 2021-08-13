package com.projectmanager.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GeneralService<T>  {

    Page<T> getAll(Pageable pageable);

    T findById(Long id);

    T create(T t);

    boolean update(T t);

    boolean delete(T t);

}
