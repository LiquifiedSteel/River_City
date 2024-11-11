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
	"isAdmin" BOOLEAN DEFAULT FALSE 
);

CREATE TABLE "Requests" (
	"id" SERIAL PRIMARY KEY,
	"team_org_event" VARCHAR(200) NOT NULL,
	"title_w_team_org_event" VARCHAR(200),
	"Coach_Contact_first_name" VARCHAR(50) NOT NULL,
	"Coach_Contact_last_name" VARCHAR(50) NOT NULL,
	"coach_contact_email" VARCHAR(40) NOT NULL,
	"coach_contact_phone" VARCHAR(18) NOT NULL,
	"website" VARCHAR(150),
	"event_type" VARCHAR(50) NOT NULL,
	"rented_previously" BOOLEAN NOT NULL,
	"PreferredTime_start" TIME NOT NULL,
	"PreferredTime_end" TIME NOT NULL,
	"Preferred_Location:primary" INTEGER REFERENCES "Locations" NOT NULL,
	"Preferred_Location:secondary" INTEGER REFERENCES "Locations" NOT NULL,
	"preferred_space" VARCHAR(20) NOT NULL,
	"priority" VARCHAR(20) NOT NULL,
	"preferred_days" VARCHAR(20) NOT NULL,
	"start_date date" DATE NOT NULL,
	"end_date date" DATE NOT NULL,
	"additional_dates" VARCHAR(300),
	"expected_attendance" VARCHAR(150),
	"85%_WF_students" VARCHAR NOT NULL,
	"grade_level" VARCHAR(30),
	"team_pdf" VARCHAR,
	"read_Rental_Review" BOOLEAN NOT NULL,
	"renter_first_name" VARCHAR(25) NOT NULL,
	"renter_last_name" VARCHAR(25) NOT NULL,
	"renter_street_address" VARCHAR(60) NOT NULL,
	"renter_city" VARCHAR(50) NOT NULL,
	"renter_state" VARCHAR(30) NOT NULL,
	"renter_zip" VARCHAR(10) NOT NULL,
	"renter_phone" VARCHAR(18) NOT NULL,
	"renter_email" VARCHAR(40) NOT NULL,
	"agreeToRespectfulUseOfSpace" BOOLEAN NOT NULL,
	"agreeToInvoicePaymentProcess" BOOLEAN NOT NULL
);

CREATE TABLE "Time_Blocks" (
	"id" SERIAL PRIMARY KEY,
	"location_id" INTEGER REFERENCES "Locations" NOT NULL,
	"start_time" TIME NOT NULL,
	"end_time" TIME NOT NULL,
	"is_blocked" BOOLEAN NOT NULL,
	"is_recurring" BOOLEAN DEFAULT FALSE
);
