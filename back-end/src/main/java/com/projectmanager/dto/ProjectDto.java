package com.projectmanager.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class ProjectDto {

    private String name;

    private Date startDate;

    private Date endDate;

    private Date updateDate;

    private String status;

}
