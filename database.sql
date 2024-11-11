-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "Locations" (
	"id" SERIAL PRIMARY KEY,
	"name_of_Location" VARCHAR(60)
);

CREATE TABLE "Spaces" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR(30),
	"location_id" INTEGER REFERENCES "Locations"
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
	"username" VARCHAR(40) UNIQUE,
	"password" VARCHAR(300) NOT NULL,
	"email" VARCHAR(100) NOT NULL,
	"isAdmin" BOOLEAN DEFAULT FALSE,
	"deleted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "Requests" (
	"id" SERIAL PRIMARY KEY,
	"team_org_event" VARCHAR(200) NOT NULL,
	"title_w_team_org_event" VARCHAR(200),
	"coach_contact_first_name" VARCHAR(50) NOT NULL,
	"coach_contact_last_name" VARCHAR(50) NOT NULL,
	"coach_contact_email" VARCHAR(40) NOT NULL,
	"coach_contact_phone" VARCHAR(18) NOT NULL,
	"website" VARCHAR(150),
	"event_type" VARCHAR(50) NOT NULL,
	"rented_previously" BOOLEAN NOT NULL,
	"preferred_time_start" TIME NOT NULL,
	"preferred_time_end" TIME NOT NULL,
	"preferred_location_primary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_location_secondary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_space" INTEGER REFERENCES "Spaces" NOT NULL,
	"priority" VARCHAR(20) NOT NULL,
	"preferred_days" VARCHAR(20) NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"additional_dates" VARCHAR(300),
	"expected_attendance" VARCHAR(150),
	"85%_WF_students" VARCHAR NOT NULL,
	"grade_level" VARCHAR(30),
	"team_pdf" VARCHAR,
	"read_rental_review" BOOLEAN NOT NULL,
	"renter_first_name" VARCHAR(25) NOT NULL,
	"renter_last_name" VARCHAR(25) NOT NULL,
	"renter_street_address" VARCHAR(60) NOT NULL,
	"renter_city" VARCHAR(50) NOT NULL,
	"renter_state" VARCHAR(30) NOT NULL,
	"renter_zip" VARCHAR(10) NOT NULL,
	"renter_phone" VARCHAR(18) NOT NULL,
	"renter_email" VARCHAR(40) NOT NULL,
	"agree_to_respectful_use_of_space" BOOLEAN NOT NULL,
	"agree_to_invoice_payment_process" BOOLEAN NOT NULL
);

CREATE TABLE "Time_Blocks" (
	"id" SERIAL PRIMARY KEY,
	"location_id" INTEGER REFERENCES "Locations" NOT NULL,
	"start_time" TIME NOT NULL,
	"end_time" TIME NOT NULL,
	"is_blocked" BOOLEAN NOT NULL,
	"is_recurring" BOOLEAN DEFAULT FALSE
);


INSERT INTO "Locations" ("id", "available_times", "name_of_Location")
VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Company A'),
(2, 'Suspendisse potenti. Morbi sollicitudin.', 'Company B'),
(3, 'Vivamus suscipit tortor eget felis porttitor volutpat.', 'Company C'),
(4, 'Nullam id dolor id nibh ultricies vehicula ut id elit.', 'Company D'),
(5, 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'Company E'),
(6, 'Donec sollicitudin molestie malesuada.', 'Company F'),
(7, 'Pellentesque in ipsum id orci porta dapibus.', 'Company G'),
(8, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.', 'Company H'),
(9, 'Quisque velit nisi, pretium ut lacinia in, elementum id enim.', 'Company I'),
(10, 'Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.', 'Company J');


INSERT INTO "Spaces" ("id", "type", "location_id")
VALUES
(1, 'Meeting Room', 2),
(2, 'Gym', 3),
(3, 'Classroom', 4),
(4, 'Auditorium', 5),
(5, 'Classroom', 1),
(6, 'Gym', 2),
(7, 'Auditorium', 9),
(8, 'Meeting Room', 6),
(9, 'Classroom', 3),
(10, 'Gym', 7),
(11, 'Auditorium', 8),
(12, 'Meeting Room', 5),
(13, 'Classroom', 4),
(14, 'Gym', 2),
(15, 'Auditorium', 10);

INSERT INTO "user" ("id", "username", "password", "isAdmin")
VALUES
(1, 'user1', 'password123', TRUE),
(2, 'user2', 'password456', FALSE),
(3, 'user3', 'password789', TRUE),
(4, 'user4', 'password101112', FALSE),
(5, 'user5', 'password131415', TRUE),
(6, 'user6', 'password161718', FALSE),
(7, 'user7', 'password192021', TRUE),
(8, 'user8', 'password222324', FALSE),
(9, 'user9', 'password252627', TRUE),
(10, 'user10', 'password282930', FALSE),
(11, 'user11', 'password313233', TRUE),
(12, 'user12', 'password343536', FALSE),
(13, 'user13', 'password373839', TRUE),
(14, 'user14', 'password404142', FALSE),
(15, 'user15', 'password434445', TRUE),
(16, 'user16', 'password464748', FALSE),
(17, 'user17', 'password495051', TRUE),
(18, 'user18', 'password525354', FALSE),
(19, 'user19', 'password555657', TRUE),
(20, 'user20', 'password585960', FALSE);

INSERT INTO "Requests" ("id", "team_org_event", "title_w_team_org_event", "Coach_Contact_first_name", "Coach_Contact_last_name", "coach_contact_email", "coach_contact_phone", "website", "event_type", "rented_previously", "PreferredTime_start", "PreferredTime_end", "Preferred_Location:primary", "Preferred_Location:secondary", "preferred_space", "priority", "preferred_days", "start_date date", "end_date date", "additional_dates", "expected_attendance", "85%_WF_students", "grade_level", "team_pdf", "read_Rental_Review", "renter_first_name", "renter_last_name", "renter_street_address", "renter_city", "renter_state", "renter_zip", "renter_phone", "renter_email", "agreeToRespectfulUseOfSpace", "agreeToInvoicePaymentProcess")
VALUES
(1, 'Tech Enthusiasts', 'Coding Workshop', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'http://techevent.com', 'Educational', TRUE, '10:00:00', '12:30:00', 1, 2, 'Auditorium', 'High', 'Weekends', '2024-11-15', '2024-11-16', 'None', '100', 'Yes', 'College', '/pdfs/event1.pdf', TRUE, 'Jane', 'Smith', '123 Elm St', 'Nis', 'TX', '75001', '123-456-7890', 'jane.smith@example.com', TRUE, 1),
(2, 'Youth Basketball Club', 'Regional Basketball Finals', 'Michael', 'Jordan', 'michael.jordan@example.com', '234-567-8901', 'http://basketball.com', 'Sports', FALSE, '15:00:00', '18:00:00', 3, 4, 'Gym', 'Medium', 'Weekdays', '2024-11-20', '2024-11-22', 'Extra time slots requested on Nov 23', '300', 'No', 'High School', '/pdfs/event2.pdf', TRUE, 'Robert', 'James', '456 Maple Ave', 'Dallas', 'TX', '75201', '234-567-8901', 'robert.james@example.com', TRUE, 1),
(3, 'Local Arts Group', 'Painting Exhibition', 'Emily', 'Brown', 'emily.brown@example.com', '345-678-9012', 'http://arts.org', 'Recreational', TRUE, '09:00:00', '14:00:00', 5, 6, 'Classroom', 'Low', 'Daily', '2024-11-25', '2024-11-30', 'Holiday closure adjustments needed', '50', 'Yes', 'Middle', '/pdfs/event3.pdf', FALSE, 'Anne', 'Lee', '789 Birch St', 'Austin', 'TX', '73301', '345-678-9012', 'anne.lee@example.com', TRUE, 0)

INSERT INTO "Time_Blocks" (
    "id", 
    "location_id", 
    "start_time", 
    "end_time", 
    "is_blocked", 
    "is_recurring"
)
VALUES
(1, 1, '08:00:00', '10:00:00', TRUE, FALSE),
(2, 2, '10:30:00', '12:30:00', FALSE, TRUE),
(3, 3, '13:00:00', '15:00:00', TRUE, FALSE),
(4, 4, '15:30:00', '17:30:00', FALSE, TRUE),
(5, 5, '18:00:00', '20:00:00', TRUE, FALSE),
(6, 6, '07:30:00', '09:30:00', FALSE, FALSE),
(7, 7, '10:00:00', '12:00:00', TRUE, TRUE),
(8, 8, '12:30:00', '14:30:00', FALSE, TRUE),
(9, 9, '15:00:00', '17:00:00', TRUE, FALSE),
(10, 10, '17:30:00', '19:30:00', FALSE, FALSE)