package com.school;

public class Student extends Person implements Storable {
    private String gradeLevel;
    public Student(String Name, String gradeLevel) {
        super(Name);
        this.gradeLevel = gradeLevel;
    }

    @Override
    public String toDataString() {
        return "Student," + getId() + "," + getName() + "," + gradeLevel;
    }
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Grade Level: " + gradeLevel);
        System.out.println("Role: Student");
    }
}