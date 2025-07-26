package com.school;

public class Person {
    private static int nextIdCounter = 1;
    protected int id;
    protected String Name;
    Person(String Name){
        this.id = nextIdCounter++;
        this.Name = Name;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return Name;
    }
    void displayDetails() {
        System.out.println("ID: " + id + ", Name: " + Name);
    }
}