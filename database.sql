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
	"date_submitted" DATE DEFAULT NOW(),
	"team_org_event" VARCHAR(200) NOT NULL,
	"title_w_team_org_event" VARCHAR(200),
	"coach_contact_first_name" VARCHAR(50) NOT NULL,
	"coach_contact_last_name" VARCHAR(50) NOT NULL,
	"coach_contact_email" VARCHAR(40) NOT NULL,
	"coach_contact_phone" VARCHAR(18) NOT NULL,
	"website" VARCHAR(150),
	"event_type" VARCHAR(50) NOT NULL,
	"rented_previously" BOOLEAN NOT NULL,
	"preferred_time" TIME NOT NULL DEFAULT NOW(),
	"preferred_location_primary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_location_secondary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_space" INTEGER REFERENCES "Spaces" NOT NULL,
	"priority" VARCHAR(20) NOT NULL,
	"preferred_days" VARCHAR(20) NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"additional_dates" VARCHAR(300),
	"expected_attendance" VARCHAR(150),
	"85%_WF_students" BOOLEAN NOT NULL,
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

CREATE TABLE "location_spaces" (
	"location_id" integer,
	"space_id" integer
);

INSERT INTO "Locations" ("id", "name_of_Location")
VALUES
(1, 'Company A'),
(2, 'Company B'),
(3, 'Company C'),
(4, 'Company D'),
(5, 'Company E'),
(6, 'Company F'),
(7, 'Company G'),
(8, 'Company H'),
(9, 'Company I'),
(10, 'Company J');


INSERT INTO "Spaces" ("id", "type", "location_id")
VALUES
(1, 'Meeting Room', 2),
(2, 'Gym', 3),
(3, 'Classroom', 4),
(4, 'Auditorium', 5);

INSERT INTO "user" ("username", "password", "email")
VALUES
('user1', 'password123', 'user1@gmail.com'),
('user2', 'password456', 'user2@gmail.com'),
('user3', 'password789', 'user3@gmail.com'),
('user4', 'password101112', 'user4@gmail.com'),
('user5', 'password131415', 'user5@gmail.com'),
('user6', 'password161718', 'user6@gmail.com'),
('user7', 'password192021', 'user7@gmail.com'),
('user8', 'password222324', 'user8@gmail.com'),
('user9', 'password252627', 'user9@gmail.com');

INSERT INTO "Requests" ("id", "team_org_event", "title_w_team_org_event", "coach_contact_first_name", "coach_contact_last_name", "coach_contact_email", "coach_contact_phone", "website", "event_type", "rented_previously", "preferred_time", "preferred_location_primary", "preferred_location_secondary", "preferred_space", "priority", "preferred_days", "start_date", "end_date", "additional_dates", "expected_attendance", "85%_WF_students", "grade_level", "team_pdf", "read_rental_review", "renter_first_name", "renter_last_name", "renter_street_address", "renter_city", "renter_state", "renter_zip", "renter_phone", "renter_email", "agree_to_respectful_use_of_space", "agree_to_invoice_payment_process")
VALUES
(1, 'Tech Enthusiasts', 'Coding Workshop', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'http://techevent.com', 'Educational', TRUE, '10:00:00', 1, 2, 4, 'High', 'Weekends', '2024-11-15', '2024-11-16', 'None', '100', 'Yes', 'College', '/pdfs/event1.pdf', TRUE, 'Jane', 'Smith', '123 Elm St', 'Nis', 'TX', '75001', '123-456-7890', 'jane.smith@example.com', TRUE, TRUE),
(2, 'Youth Basketball Club', 'Regional Basketball Finals', 'Michael', 'Jordan', 'michael.jordan@example.com', '234-567-8901', 'http://basketball.com', 'Sports', FALSE, '15:00:00', 3, 4, 2, 'Medium', 'Weekdays', '2024-11-20', '2024-11-22', 'Extra time slots requested on Nov 23', '300', 'No', 'High School', '/pdfs/event2.pdf', TRUE, 'Robert', 'James', '456 Maple Ave', 'Dallas', 'TX', '75201', '234-567-8901', 'robert.james@example.com', TRUE, TRUE),
(3, 'Local Arts Group', 'Painting Exhibition', 'Emily', 'Brown', 'emily.brown@example.com', '345-678-9012', 'http://arts.org', 'Recreational', TRUE, '09:00:00', 5, 6, 3, 'Low', 'Daily', '2024-11-25', '2024-11-30', 'Holiday closure adjustments needed', '50', 'Yes', 'Middle', '/pdfs/event3.pdf', FALSE, 'Anne', 'Lee', '789 Birch St', 'Austin', 'TX', '73301', '345-678-9012', 'anne.lee@example.com', TRUE, TRUE);

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
(10, 10, '17:30:00', '19:30:00', FALSE, FALSE);