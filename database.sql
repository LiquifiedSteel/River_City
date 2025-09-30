-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE IF NOT EXISTS public."Budget"
(
    year VARCHAR(10) NOT NULL,
    amount numeric(9,2),
    CONSTRAINT "Budget_pkey" PRIMARY KEY (year)
);

CREATE TABLE IF NOT EXISTS public."Checks"
(
    id integer NOT NULL DEFAULT nextval('"Checks_id_seq"'::regclass),
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    amount numeric(8,2) NOT NULL,
    "recieptLink" character varying(300) COLLATE pg_catalog."default" NOT NULL,
    date date DEFAULT now(),
    paid boolean DEFAULT false,
    CONSTRAINT "Checks_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Envelopes"
(
    id integer NOT NULL DEFAULT nextval('"Envelopes_id_seq"'::regclass),
    envelope character varying(50) COLLATE pg_catalog."default",
    total numeric(8,2) DEFAULT 0.00,
    "prevTotal" numeric(8,2) DEFAULT 0.00,
    CONSTRAINT "Envelopes_pkey" PRIMARY KEY (id),
    CONSTRAINT "Envelopes_envelope_key" UNIQUE (envelope)
);

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default",
    password character varying(300) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "isAdmin" boolean DEFAULT false,
    deleted boolean DEFAULT false,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_username_key UNIQUE (username)
);

INSERT INTO "Budget" ("year", "amount")
VALUES
  ('Previous', 0),
  ('Current', 0);