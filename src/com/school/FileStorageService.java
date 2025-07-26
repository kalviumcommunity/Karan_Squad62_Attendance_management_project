package com.school;
import java.io.*;
import java.util.List;
public class FileStorageService {
    public void saveData(List<? extends Storable> items, String filename) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            for (Storable item : items) {
                writer.println(item.toDataString());
            }
            System.out.println("Data saved to: " + filename);
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }
}