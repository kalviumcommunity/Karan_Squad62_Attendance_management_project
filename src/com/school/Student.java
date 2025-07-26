package com.school;

public class Student extends Person {
    private String gradeLevel;
    public Student(String Name, String gradeLevel) {
        super(Name);
        this.gradeLevel = gradeLevel;
    }
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Grade Level: " + gradeLevel);
        System.out.println("Role: Student");
    }
}