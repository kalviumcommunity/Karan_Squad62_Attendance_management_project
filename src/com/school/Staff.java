package com.school;

public class Staff extends Person {
    String Role;
    Staff(String Name, String Role) {
        super(Name);
        this.Role = Role;
    }
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Role: " + Role);
    }
}