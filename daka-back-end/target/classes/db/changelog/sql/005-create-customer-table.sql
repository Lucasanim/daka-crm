CREATE TABLE IF NOT EXISTS customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id BIGINT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
);
