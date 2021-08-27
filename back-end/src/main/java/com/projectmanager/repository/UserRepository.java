package com.projectmanager.repository;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    Optional<User> findByIdAndDeleteIsFalse(Integer id);

    Page<User> findAllByDeleteIsFalse(Pageable pageable);

    Page<User> findAllByDeleteIsTrue(Pageable pageable);

    @Query(value = "SELECT u.* FROM user u WHERE UPPER(u.user_name) LIKE CONCAT('%',UPPER(?1),'%') AND UPPER(u.full_name) LIKE CONCAT('%',UPPER(?2),'%')  " +
                    "AND UPPER(u.email) LIKE CONCAT('%',UPPER(?3),'%') " +
            "AND UPPER(u.address) LIKE CONCAT('%',UPPER(?4),'%') AND u.phone LIKE %?5%" , nativeQuery = true)
    List<User> searchUser(String username, String fullName, String email, String address, String phone);

    @Query(value = "SELECT u.* FROM user u WHERE u.id NOT IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 AND pe.is_deleted = false) " +
            "AND u.is_deleted = false", nativeQuery = true)
    Optional<List<User>> findAllUsersNotInProject(Integer id);

    @Query(value = "SELECT u.* FROM user u WHERE u.id NOT IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 AND pe.is_deleted = false) " +
            "AND u.is_deleted = false AND UPPER(u.user_name) LIKE CONCAT('%',UPPER(?2),'%') " +
            "AND UPPER(u.full_name) LIKE CONCAT('%',UPPER(?3),'%') AND UPPER(u.email) LIKE CONCAT('%',UPPER(?4),'%')  AND u.phone LIKE %?5%", nativeQuery = true)
    Optional<List<User>> searchUsersNotInProject(Integer idP,String username, String fullName, String email, String phone);


    @Query(value = "SELECT u.* FROM user u WHERE u.id IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1  ) AND u.is_deleted = false", nativeQuery = true)
    Optional<List<User>> findAllUsersInProject(Integer id);


    @Query(value = "SELECT u.* FROM user u WHERE u.id IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1  ) " +
            "AND u.is_deleted = false AND UPPER(u.user_name) LIKE CONCAT('%',UPPER(?2),'%') " +
            "AND UPPER(u.full_name) LIKE CONCAT('%',UPPER(?3),'%') AND UPPER(u.email) LIKE CONCAT('%',UPPER(?4),'%')  AND u.phone like %?5%", nativeQuery = true)
    Optional<List<User>> searchUsersInProject(Integer idP,String username, String fullName, String email, String phone);


    @Query(value = "SELECT u.* FROM user u WHERE u.id IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 AND pe.is_deleted = false) ", nativeQuery = true)
    Optional<List<User>> findAllUsersActiveInProject(Integer id);

    @Query(value = "SELECT u.* FROM user u WHERE u.id IN (SELECT pe.user_id FROM project_employee pe WHERE pe.project_id = ?1 AND pe.is_deleted = true ) ", nativeQuery = true)
    Optional<List<User>> findAllUsersDeleteInProject(Integer id);

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