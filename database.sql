-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "Locations" (
	"id" SERIAL PRIMARY KEY,
	"name_of_Location" VARCHAR(60)
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
	"username" VARCHAR(50) UNIQUE,
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
	"preferred_time" VARCHAR(15) NOT NULL,
	"preferred_location_primary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_location_secondary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_space" VARCHAR(120) NOT NULL,
	"priority" VARCHAR(30) NOT NULL,
	"preferred_days" VARCHAR(30) NOT NULL,
	"start_date" VARCHAR(30) NOT NULL,
	"end_date" VARCHAR(30) NOT NULL,
	"additional_dates" VARCHAR(500),
	"expected_attendance" VARCHAR(150),
	"WF_students" BOOLEAN NOT NULL,
	"grade_level" VARCHAR(30),
	"team_pdf" VARCHAR,
	"renter_first_name" VARCHAR(40) NOT NULL,
	"renter_last_name" VARCHAR(40) NOT NULL,
	"renter_street_address" VARCHAR(60) NOT NULL,
	"renter_city" VARCHAR(50) NOT NULL,
	"renter_state" VARCHAR(30) NOT NULL,
	"renter_zip" VARCHAR(10) NOT NULL,
	"renter_phone" VARCHAR(18) NOT NULL,
	"renter_email" VARCHAR(40) NOT NULL,
	"excel" VARCHAR(20) DEFAULT 'unused'
);


INSERT INTO "Locations" ("id", "name_of_Location")
VALUES
(1, 'Aurora Elementary'),
(2, 'Brooks Harbor Elementary'),
(3, 'Cheney Middle School'),
(4, 'Deer Creek Elementary'),
(5, 'Eastwood Elementary'),
(6, 'Freedom Elementary'),
(7, 'Harwood Elementary'),
(8, 'Heritage Middle School'),
(9, 'Horace Elementary'),
(10, 'Independance Elementary (unavailable until late spring)'),
(11, 'L.E. Berger Elementary'),
(12, 'Legacy Elementary'),
(13, 'Liberty Middle School'),
(14, 'Meadowlark Elementary (unavailable until fall 2025'),
(15, 'Osgood Elementary'),
(16, 'South Elementary'),
(17, 'Westside Elementary'),
(18, 'Willow Park Elementary');


--INSERT INTO "Requests" ("id", "team_org_event", "title_w_team_org_event", "coach_contact_first_name", "coach_contact_last_name", "coach_contact_email", "coach_contact_phone", "website", "event_type", "rented_previously", "preferred_time", "preferred_location_primary", "preferred_location_secondary", "preferred_space", "priority", "preferred_days", "start_date", "end_date", "additional_dates", "expected_attendance", "WF_students", "grade_level", "team_pdf", "renter_first_name", "renter_last_name", "renter_street_address", "renter_city", "renter_state", "renter_zip", "renter_phone", "renter_email", "event_description")
--VALUES
--(1, 'Tech Enthusiasts', 'Coding Workshop', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'http://techevent.com', 'Educational', TRUE, '10:00:00', 1, 2, 4, 'High', 'Weekends', '2024-11-15', '2024-11-16', 'None', '100', 'Yes', 'College', '/pdfs/event1.pdf', 'Jane', 'Smith', '123 Elm St', 'Nis', 'TX', '75001', '123-456-7890', 'jane.smith@example.com', 'brief description'),
--(2, 'Youth Basketball Club', 'Regional Basketball Finals', 'Michael', 'Jordan', 'michael.jordan@example.com', '234-567-8901', 'http://basketball.com', 'Sports', FALSE, '15:00:00', 3, 4, 2, 'Medium', 'Weekdays', '2024-11-20', '2024-11-22', 'Extra time slots requested on Nov 23', '300', 'No', 'High School', '/pdfs/event2.pdf', 'Robert', 'James', '456 Maple Ave', 'Dallas', 'TX', '75201', '234-567-8901', 'robert.james@example.com', 'brief description'),
--(3, 'Local Arts Group', 'Painting Exhibition', 'Emily', 'Brown', 'emily.brown@example.com', '345-678-9012', 'http://arts.org', 'Recreational', TRUE, '09:00:00', 5, 6, 3, 'Low', 'Daily', '2024-11-25', '2024-11-30', 'Holiday closure adjustments needed', '50', 'Yes', 'Middle', '/pdfs/event3.pdf', 'Anne', 'Lee', '789 Birch St', 'Austin', 'TX', '73301', '345-678-9012', 'anne.lee@example.com', 'brief description');

INSERT INTO "user" ("username", "password", "email", "isAdmin")
VALUES
('guest', '$2a$10$T2Df9L1jPlkevLeRyEjTD.6aWN94BipMVYr8WbQp9x7th56h94Bd6', 'guest', 'false'),
('admin', '$2a$10$T2Df9L1jPlkevLeRyEjTD.6aWN94BipMVYr8WbQp9x7th56h94Bd6', 'admin', 'true');

