CREATE TABLE company (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES company_category(id)
);
