INSERT INTO authority(id, name) VALUES (-1, "ROLE_ADMIN");
INSERT INTO authority(id, name) VALUES (-2, "ROLE_USER");

INSERT INTO location(id, latitude, longitude) VALUES (-1, 15, 15);
INSERT INTO location(id, latitude, longitude) VALUES (-2, 25, 21);
INSERT INTO location(id, latitude, longitude) VALUES (-3, 25.005, 21.001);
INSERT INTO location(id, latitude, longitude) VALUES (-4, 25.006, 21.003);

INSERT INTO location(id, latitude, longitude) VALUES (-5, 27, 21);


INSERT INTO user(dtype, id, email, firstname, lastname, password) VALUES ("ADMIN", -1, "test@gmail.com", "Pera", "Peric", "$2a$04$isBWBdDXOko7tTh4gYXt.uaXeeCDh.2eHVw9RmOHnCaMThf0b5YSO");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-1, -1);

INSERT INTO user(dtype, id, email, firstname, lastname, password, location_id, motivation, user_status) VALUES ("REGISTERED_USER", -2, "testuser@gmail.com", "Pera", "Peric", "$2a$04$isBWBdDXOko7tTh4gYXt.uaXeeCDh.2eHVw9RmOHnCaMThf0b5YSO", -1, "ENJOYING_NATURE", "EMPLOYED");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-2, -2);

INSERT INTO destination(id, name, type, location_id) VALUES (-1, "Test Destination 1", "ADVENTURE", -2);
INSERT INTO destination(id, name, type, location_id) VALUES (-2, "Test Destination 2", "RELAXATION", -5);

INSERT INTO hotel(id, name, stars, location_id) VALUES (-1, "Test Hotel 1", 5, -3);
INSERT INTO hotel(id, name, stars, location_id) VALUES (-2, "Test Hotel 2", 3, -4);

