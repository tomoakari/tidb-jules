-- User table
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    group_id INTEGER NOT NULL
);

-- Group table
CREATE TABLE `group` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Initial data for Group table
INSERT INTO `group` (name) VALUES
('マーケティング部'),
('営業部'),
('開発部');
