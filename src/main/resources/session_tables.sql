-- Table: public.spring_session

-- DROP TABLE public.spring_session;

CREATE TABLE public.spring_session
(
  primary_id character(36) NOT NULL,
  session_id character(36) NOT NULL,
  creation_time bigint NOT NULL,
  last_access_time bigint NOT NULL,
  max_inactive_interval integer NOT NULL,
  expiry_time bigint NOT NULL,
  principal_name character varying(300),
  CONSTRAINT spring_session_pk PRIMARY KEY (primary_id)
);
-- Index: public.spring_session_ix1

-- DROP INDEX public.spring_session_ix1;

CREATE UNIQUE INDEX spring_session_ix1
  ON public.spring_session
  USING btree
  (session_id COLLATE pg_catalog."default");

-- Index: public.spring_session_ix2

-- DROP INDEX public.spring_session_ix2;

CREATE INDEX spring_session_ix2
  ON public.spring_session
  USING btree
  (expiry_time);

-- Index: public.spring_session_ix3

-- DROP INDEX public.spring_session_ix3;

CREATE INDEX spring_session_ix3
  ON public.spring_session
  USING btree
  (principal_name COLLATE pg_catalog."default");


-- Table: public.spring_session_attributes

-- DROP TABLE public.spring_session_attributes;

CREATE TABLE public.spring_session_attributes
(
  session_primary_id character(36) NOT NULL,
  attribute_name character varying(200) NOT NULL,
  attribute_bytes bytea NOT NULL,
  CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name),
  CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id)
      REFERENCES public.spring_session (primary_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);