package com.school;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- School Attendance System ---");

        // Step 1: Create and populate ArrayList<Student>
        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student("Alice Smith", "Grade 10"));
        students.add(new Student("Bob Johnson", "Grade 11"));

        // Step 2: Create and populate ArrayList<Course>
        ArrayList<Course> courses = new ArrayList<>();
        courses.add(new Course("Intro to Programming"));
        courses.add(new Course("Linear Algebra"));

        // Step 3: Display Students
        System.out.println("\nRegistered Students:");
        for (Student student : students) {
            student.displayDetails();
        }

        // Step 4: Teacher and Staff
        Teacher teacher = new Teacher("Dr. Jane Doe", "Mathematics");
        Staff staff = new Staff("Michael Scott", "Administrator");

        System.out.println("\nRegistered Teacher:");
        teacher.displayDetails();

        System.out.println("\nStaff Member:");
        staff.displayDetails();

        // Step 5: Display Courses
        System.out.println("\nAvailable Courses:");
        for (Course course : courses) {
            course.displayDetails();
        }

        // Step 6: Attendance Records
        System.out.println("\nSession 2: Core Domain Modelling Complete.");
        ArrayList<AttendanceRecord> attendanceLog = new ArrayList<>();
        attendanceLog.add(new AttendanceRecord(students.get(0).getId(), courses.get(0).getCourseId(), "Present"));
        attendanceLog.add(new AttendanceRecord(students.get(1).getId(), courses.get(1).getCourseId(), "Absent"));

        for (AttendanceRecord record : attendanceLog) {
            record.displayDetails();
        }

        // Step 7: Save data to files using FileStorageService
        FileStorageService storage = new FileStorageService();
        storage.saveData(students, "students.txt");
        storage.saveData(courses, "courses.txt");
        storage.saveData(attendanceLog, "attendance_log.txt");
    }
}