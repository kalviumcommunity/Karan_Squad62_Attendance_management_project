package com.school;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- School Attendance System ---");

      
        System.out.println("\nRegistered Students:");
        Student student1 = new Student("Alice Wonderland");
        Student student2 = new Student("Bob Builder");

       
        Course course1 = new Course("Intro to Programming");
        Course course2 = new Course("Linear Algebra");


        student1.displayDetails();
        student2.displayDetails();

        System.out.println("\nRegistered Courses:");
        // for (Student student : students) {
        //     if (student != null) student.displayDetails();
        // }

       
        course1.displayDetails();
        course2.displayDetails();       
      
        System.out.println();       
         
        System.out.println("New student is added.");
        Student student3 = new Student("New Student");
        Course course3 = new Course("New Course");
        

        student3.displayDetails();
        course3.displayDetails();

        System.out.println("Session 3: Constructors and Methods");
        System.out.println();

        List<AttendanceRecord> attendanceRecords = new ArrayList<>();
        AttendanceRecord record1 = new AttendanceRecord(student1.getStudentId(), course1.getCourseId(), "Present");
        attendanceRecords.add(record1);

        AttendanceRecord record2 = new AttendanceRecord(student2.getStudentId(), course2.getCourseId(), "Late");
        attendanceRecords.add(record2);

        AttendanceRecord record3 = new AttendanceRecord(student3.getStudentId(), course3.getCourseId(), "Absent");
        attendanceRecords.add(record3);

        for(AttendanceRecord record : attendanceRecords) {
            record.displayDetails();
        }

        System.out.println("Session 4: Data encapsulation and attendance");

    }
}