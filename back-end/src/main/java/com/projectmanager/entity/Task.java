package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "task")
@Data
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "task_type", nullable = false)
    private String taskType;

    @Column(name = "priority", nullable = false)
    private String priority;

    @Column(name = "status", nullable = false)
    private String status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id",referencedColumnName = "id")
    @Nullable
    private Project project_task;

    @Column(name = "create_date", nullable = false)
    private Timestamp createDate;

    @Column(name = "update_date")
    private Timestamp updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "create_user",referencedColumnName = "id")
    @Nullable
    private User createUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_manager_id",referencedColumnName = "id")
    private User taskManager;

    @Column(name = "is_deleted", nullable = false)
    private Boolean deleted;

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    private List<Todo> todoList;

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    private List<TaskHistory> taskHistoryList;
}
