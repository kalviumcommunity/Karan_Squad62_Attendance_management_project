package com.school;

public class Student {
    private static int nextStudentIdCounter = 1; 
    int studentId;
    String name;

    public Student(String name)
    {
        this.studentId = nextStudentIdCounter++; 
        this.name = name;
    }

    public String getName() {
        return name;
    }
   
    public int getStudentId() {
        return studentId;
    }
    
    public void displayDetails() {
        System.out.println("Student ID: " + this.studentId + ", Name: " + this.name);
    }
}