# S62_Karandeep_Capstone_RentReads

## PROBLEM STATEMENT
Many individuals possess digital books (e.g., PDFs) that they wish to share, but there is no convenient, seamless platform for doing so. Readers are often looking for temporary access to books without the need to purchase or permanently own them. Current platforms for book sharing or rentals are either focused on physical books or fail to address the unique needs of digital formats. As a result, there is no effective solution for renting, sharing, or returning digital books in a manner that ensures availability for others after a specified period. Additionally, there is no simple way to track book usage or enforce the return of inactive rentals, preventing books from being made available to other users. This gap in the market creates significant barriers for both book owners and readers who want a flexible, user-friendly system for digital book access. 

**We aim to address this gap by creating a solution that allows for seamless sharing, rental, and return of digital books, ensuring efficient usage and availability for all users.**

## FEATURES

**1) USER MANAGEMENT**
- User registration and login.
- Profile creation for renting or uploading books.

**2) BOOK MANAGEMENT**
- Upload books in the form of pdfs.
- Categorize books by genre and type.
- Search and filter books.

**3) RENTAL SYSTEM**
- Rent books for a fixed period of time i.e. if a person rents a book and is inactive or hasn't opened the book for two days , the book will automatically go away from the rented list and will be available for other buyers.

**4) COMMUNICATION**
- Email.
- In app notifications. 

## ADVANCED FEATURES (FUTURE SCOPE)

- Real-time chat between users for book discussions.
- Analytics for tracking popular books and user activity.
- Mobile app for better accessibility.
- Review and rating system for books.
- AI-based recommendations for books.

## DEVELOPMENT PHASE

### WEEK 1-2: PLANNING AND FRONTEND WEB DEVELOPMENT

**1) PLANNING**
- Define the user flow for uploading, renting, and returning books.
- Design wireframes for pages like Home, Dashboard, Upload Book, and ReadList.
- Create a workflow for managing book availability and user interactions.

**2) FRONTEND WEB DEVELOPMENT**
- Develop static pages with navigation (Home, ReadList, Uploads).
- Use CSS/Tailwind/Bootstrap to style the pages for a clean, responsive design.


### Week 3-4: BACKEND DEVELOPMENT

**1) SERVER SETUP :**
- Design schemas for users, books, rentals, and notifications.
- Implement user authentication using JWT.

**2) API DEVELOPMENT**
- Create RESTful APIs for:
	- CRUD operations on books and rentals.
	- User profile management.
	- Notifications and book availability checks.
- Add middleware for security and error handling.


### WEEK 5: Book Management and Availability Logic

- Implement logic for:
    - Moving books to the ReadList when rented.
	- Returning books to the Uploads page if not accessed for 48 hours.
	- Managing book access for PDF vs. link-based uploads.
- Create APIs to:
	- Handle book availability status.
	- Track user interactions with rented books.


### Week 6: Community and Notifications

- Add features for:
	- A dashboard showing all uploaded and rented books.
	- Notifications for book return deadlines and availability.
 	- Implement an activity feed where users can see newly uploaded books.
        

### Week 7: Finalization and Optimization

- Polish and Optimize:
	- Refine the UI for a smooth user experience.
	- Optimize backend performance and database queries.
- Deployment:
	- Containerize the application with Docker for portability.
	- Deploy on a platform like AWS, Heroku, or Vercel.


