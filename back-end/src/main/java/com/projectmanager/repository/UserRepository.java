package com.projectmanager.repository;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsernameAndDeleteIsFalse(String username);

    Page<User> findByCreateUserAndDeleteIsFalse(Integer idCreateUser, Pageable pageable);

    Page<User> findAllByDeleteIsFalse(Pageable pageable);

    Optional<User> findByIdAndDeleteIsFalse(Integer id);

    List<User> findAllByDeleteIsFalse( );

    @Query(value = "SELECT u.* FROM user u WHERE u.id NOT IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 ) ", nativeQuery = true)
    Optional<List<User>> findAllUsersNotInProject(Integer id);

    @Query(value = "SELECT u.* FROM user u WHERE u.id IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 ) ", nativeQuery = true)
    Optional<List<User>> findAllUsersInProject(Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET assigned_user = 1 WHERE assigned_user = ?1",nativeQuery = true)
    Integer moveToAdminTodoByUserId(Integer uId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task  SET task_manager_id = 1 WHERE task_manager_id = ?1",nativeQuery = true)
    Integer moveToAdminTaskByUserId(Integer uId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE project_employee  SET is_deleted = true WHERE user_id = ?1",nativeQuery = true)
    Integer deleteProjectEmployeeByUserId(Integer uId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET assigned_user = 1 WHERE assigned_user = ?1 AND project_id=?2",nativeQuery = true)
    Integer moveToAdminTodoByUidAndPid(Integer uId, Integer pId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task  SET task_manager_id = 1 WHERE task_manager_id = ?1 AND project_id=?2",nativeQuery = true)
    Integer moveToAdminTaskByUidAndPid(Integer uId, Integer pId);





}