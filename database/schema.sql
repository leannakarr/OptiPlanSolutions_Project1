CREATE TABLE CUSTOMER(
    customer_id    VARCHAR(20)  NOT NULL,  /* System created customer ID                                 */
    first_name     VARCHAR(30)  NOT NULL,  /* customers first name                                       */
    last_name      VARCHAR(30)  NOT NULL,  /* customers last name                                        */
    email          VARCHAR(100) NOT NULL,  /* unique email                                               */
    password       VARCHAR(30)  NOT NULL,  /* non-secure draft pasword field                             */
    phone_no       INTEGER(11)  NOT NULL,  /* unique phone number                                        */
    abn            VARCHAR(20),            /* optional ABN                                               */
        CONSTRAINT CUSTOMER_PK PRIMARY KEY (customer_id),
        CONSTRAINT CUSTOMER_CK1 UNIQUE (email),
        CONSTRAINT CUSTOMER_CK2 UNIQUE (phone_no));

CREATE TABLE AIRPORT(
    airport_id    VARCHAR(30) NOT NULL,   /* airports id for system refrence                              */
    airport_code  VARCHAR(3)  NOT NULL,   /* standard unique the letter airport identifyer                */
    airport_name  VARCHAR(30) NOT NULL,   /* full name of the airport                                     */
    city          VARCHAR(30) NOT NULL,   /* city airport is located in                                   */
    country       VARCHAR(30) NOT NULL,   /*country airport is in                                         */
        CONSTRAINT AIRPORT_PK PRIMARY KEY (airport_id),
        CONSTRAINT AIRPORT_CK1 UNIQUE (airport_code));

CREATE TABLE ROUTE(
    route_id        VARCHAR(30) NOT NULL,   /* system generated route ID contains relevent airports         */
    depart_airport  VARCHAR(30) NOT NULL,   /* refrences some airport in the systtem                        */
    arival_airport  VARCHAR(30) NOT NULL,   /* refrences some airport in the systtem                        */
    expected_time   VARCHAR(5)  NOT NULL,   /* the expected flight in air duration                          */
        CONSTRAINT ROUTE_PK PRIMARY KEY (route_id),
        CONSTRAINT ROUTE_CK1 UNIQUE(depart_airport, arival_airport),
        CONSTRAINT ROUTE_FK1 FOREIGN KEY (depart_airport) REFERENCES AIRPORT(airport_id),
        CONSTRAINT ROUTE_FK2 FOREIGN KEY (arival_airport) REFERENCES AIRPORT(airport_id));

CREATE TABLE MODELSPECS(
    model_id        VARCHAR(4)  NOT NULL,   /* aircraft type id is a 2 to 4 character alphanumeric code     */    
    total_seats     INTEGER     NOT NULL,   /* total number of passager seats on the type of plane          */
    take_off_weight INTEGER     NOT NULL,   /* in 100kg                                                     */
        CONSTRAINT MODELSPECS_PK PRIMARY KEY (model_id));

CREATE TABLE AIRCRAFT(
    aircraft_id     VARCHAR(30) NOT NULL,    /* the aircraft registation code unique to a single aircraft   */
    aircraft_model  VARCHAR(4)  NOT NULL,   /* aircraft type code refrences model                           */
        CONSTRAINT AIRCRAFT_PK PRIMARY KEY (aircraft_id),
        CONSTRAINT AIRCRAFT_FK1 FOREIGN KEY (aircraft_model) REFERENCES MODELSPECS(model_id));

CREATE TABLE FLIGHT(
    flight_id       VARCHAR(30) NOT NULL,   /*for a specific bookable flight                                */
    route_id        VARCHAR(30) NOT NULL,   /* the route refrences the route information (will be indexed)  */
    aircraft_id     VARCHAR(30) NOT NULL,   /* is then used to for join quearys for aircaft specs           */
    departure_date  VARCHAR(10) NOT NULL,   /* date of departure                                            */
    departure_time  VARCHAR(5)  NOT NULL,   /* expected time of departure                                   */
    price           INTEGER     NOT NULL,   /* single price can create new pricing table if need            */
        CONSTRAINT FLIGHT_PK PRIMARY KEY (flight_id),
        CONSTRAINT FLIGHT_CK1 UNIQUE(aircraft_id, departure_date, departure_time),
        CONSTRAINT FLIGHT_FK1 FOREIGN KEY (route_id) REFERENCES ROUTE(route_id),
        CONSTRAINT FLIGHT_FK2 FOREIGN KEY (aircraft_id) REFERENCES AIRCRAFT(aircraft_id));

CREATE INDEX FLIGHT_DATE_IDX ON FLIGHT(departure_date);
CREATE INDEX FLIGHT_ROUTE_IDX ON FLIGHT(route_id);
CREATE INDEX ROUTE_DEPART_IDX ON ROUTE(depart_airport);
CREATE INDEX ROUTE_ARIVAL_IDX ON ROUTE(arival_airport);
