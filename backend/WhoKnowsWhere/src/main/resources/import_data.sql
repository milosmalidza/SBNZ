INSERT INTO authority(id, name) VALUES (-1, "ROLE_ADMIN");
INSERT INTO authority(id, name) VALUES (-2, "ROLE_USER");

INSERT INTO location(id, latitude, longitude) VALUES (-1, 45.252882, 19.808335);
INSERT INTO location(id, latitude, longitude) VALUES (-2, 25, 21);
INSERT INTO location(id, latitude, longitude) VALUES (-3, 25.005, 21.001);
INSERT INTO location(id, latitude, longitude) VALUES (-4, 25.006, 21.003);

INSERT INTO location(id, latitude, longitude) VALUES (-5, 27, 21);

--Paswword: test
INSERT INTO user(dtype, id, email, firstname, lastname, password) VALUES ("ADMIN", -1, "test@gmail.com", "Pera", "Peric", "$2y$10$MatHAt7mHXRn.huidvCz2./GvjAke1/7U8dohvLvlIJpmzKSC3kPq");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-1, -1);
--Paswword: test
INSERT INTO user(dtype, id, email, firstname, lastname, password, location_id, motivation, user_status, birth_date) VALUES ("REGISTERED_USER", -2, "testuser@gmail.com", "Pera", "Peric", "$2y$10$MatHAt7mHXRn.huidvCz2./GvjAke1/7U8dohvLvlIJpmzKSC3kPq", -1, "ENJOYING_NATURE", "EMPLOYED", "1997-01-13");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-2, -2);

INSERT INTO destination(id, name, type, location_id) VALUES (-1, "Test Destination 1", "ADVENTURE", -2);
INSERT INTO destination(id, name, type, location_id) VALUES (-2, "Test Destination 2", "RELAXATION", -5);

INSERT INTO hotel(id, name, stars, location_id) VALUES (-1, "Test Hotel 1", 5, -3);
INSERT INTO hotel(id, name, stars, location_id) VALUES (-2, "Test Hotel 2", 3, -4);

