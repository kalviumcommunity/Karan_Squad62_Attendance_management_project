package com.school;

public class Course implements Storable {
    private int courseId;    
    private String courseName;
    private static int nextCourseIdCounter = 101;

    public Course(String courseName) {
        this.courseId = nextCourseIdCounter++;
        this.courseName = courseName;
    }
    @Override
    public String toDataString() {
        return "Course," + courseId + "," + courseName;
    }
    public int getCourseId() {
        return courseId;
    }
    public String getCourseName() {
        return courseName;
    }
    public void displayDetails() {
        System.out.println("Course ID: C" + this.courseId + ", Name: " + this.courseName);
    }
}