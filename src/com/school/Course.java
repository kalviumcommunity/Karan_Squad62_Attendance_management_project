package com.school;

public class Course {
    private static int courseIdcounter = 1;
    int  courseId; // e.g., "CS101"
    String courseName;

    public Course(String courseName) {
        this.courseId =  courseIdcounter++;
        this.courseName = courseName;
    }

    public void setDetails(int id, String cName) {
        this.courseId = id;
        this.courseName = cName;
    }

    public void displayDetails() {
        System.out.println("Course ID: " + this.courseId + ", Name: " + this.courseName);
    }
}