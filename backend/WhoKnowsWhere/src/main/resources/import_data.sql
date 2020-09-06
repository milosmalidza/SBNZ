INSERT INTO authority(id, name) VALUES (-1, "ROLE_ADMIN");
INSERT INTO authority(id, name) VALUES (-2, "ROLE_USER");

INSERT INTO location(id, latitude, longitude) VALUES (-1, 45.253882, 19.809335);
INSERT INTO location(id, latitude, longitude) VALUES (-2, 44.802954, 20.451649);
INSERT INTO location(id, latitude, longitude) VALUES (-3, 44.802154, 20.452649);
INSERT INTO location(id, latitude, longitude) VALUES (-4, 44.812154, 20.452649);

INSERT INTO location(id, latitude, longitude) VALUES (-6, 44.803954, 20.451649);
INSERT INTO location(id, latitude, longitude) VALUES (-7, 44.804954, 20.451649);
INSERT INTO location(id, latitude, longitude) VALUES (-8, 44.802954, 20.454649);
INSERT INTO location(id, latitude, longitude) VALUES (-9, 44.802954, 20.455649);

INSERT INTO location(id, latitude, longitude) VALUES (-5, 27, 21);

--Paswword: test
INSERT INTO user(dtype, id, email, firstname, lastname, password) VALUES ("ADMIN", -1, "test@gmail.com", "Pera", "Peric", "$2y$10$MatHAt7mHXRn.huidvCz2./GvjAke1/7U8dohvLvlIJpmzKSC3kPq");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-1, -1);
--Paswword: test
INSERT INTO user(dtype, id, email, firstname, lastname, password, location_id, motivation, user_status, birth_date) VALUES ("REGISTERED_USER", -2, "testuser@gmail.com", "Pera", "Peric", "$2y$10$MatHAt7mHXRn.huidvCz2./GvjAke1/7U8dohvLvlIJpmzKSC3kPq", -1, "ENJOYING_NATURE", "EMPLOYED", "1997-01-13");
INSERT INTO user_authorities(user_id, authorities_id) VALUES (-2, -2);

INSERT INTO destination(id, name, location_id, is_removed, description) VALUES (-1, "Test Destination 1", -2, 0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");
INSERT INTO destination(id, name, location_id, is_removed, description) VALUES (-2, "Test Destination 2", -5, 0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");

INSERT INTO destination_type(destination_id, type) VALUES (-1, "RELAXATION");
INSERT INTO destination_type(destination_id, type) VALUES (-1, "URBAN");

INSERT INTO destination_type(destination_id, type) VALUES (-2, "ADVENTURE");

INSERT INTO point_of_interest(id, name, is_removed, poi_type, location_id, description) VALUES (-1, "Test POI 1", 0, "RESTAURANT", -4, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");
INSERT INTO point_of_interest(id, name, is_removed, poi_type, location_id, description) VALUES (-2, "Test POI 2", 0, "CLUB", -6, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");
INSERT INTO point_of_interest(id, name, is_removed, poi_type, location_id, description) VALUES (-3, "Test POI 3", 0, "YACHTING", -7, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");
INSERT INTO point_of_interest(id, name, is_removed, poi_type, location_id, description) VALUES (-4, "Test POI 4", 0, "FOREST", -8, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");
INSERT INTO point_of_interest(id, name, is_removed, poi_type, location_id, description) VALUES (-5, "Test POI 5", 0, "HOTEL", -9, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin dui at placerat consequat. Nullam in nulla non leo mattis elementum. Aenean iaculis mi sit amet bibendum iaculis. Ut ac sem nibh. Mauris eu est ut diam hendrerit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non nulla tincidunt, cursus erat vitae, dignissim ante. Morbi sit amet tellus erat. Cras et tempor quam.");


INSERT INTO hotel(id, name, stars, location_id) VALUES (-1, "Test Hotel 1", 5, -3);
INSERT INTO hotel(id, name, stars, location_id) VALUES (-2, "Test Hotel 2", 3, -4);

