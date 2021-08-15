package com.projectmanager.repository;

import com.projectmanager.entity.Project;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {
    // tìm list project của user
//    @Query("")
//    Page<Project> findProjectsByUser(Integer id, Pageable pageable)

    Page<Project> findAllByIdAndAndDeletedIsFalse(Integer idCreateUser, Pageable pageable);

    Page<Project> getAllByDeletedIsFalse(Pageable pageable);

    @Query( value = "SELECT p.* FROM project AS p, project_employee AS pe " +
            "WHERE p.id = pe.project_id AND pe.user_id = ?1 AND pe.is_delete = 0 ",nativeQuery = true)
    List<Project> findProjectByUserId(Integer userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE project_employee  SET is_delete = 1 WHERE project_id = ?1",nativeQuery = true)
    Integer deleteProjectInPE(Integer pId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task  SET is_deleted = 1 WHERE project_id = ?1",nativeQuery = true)
    Integer deleteProjectInTask(Integer pId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET is_deleted = 1 WHERE task_id = ?1",nativeQuery = true)
    Integer deleteTaskInTodo(Integer tId);

}