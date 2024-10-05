CREATE TABLE IF NOT EXISTS verification_token (
    verification_token_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL,
    expiration_date DATETIME NOT NULL
);
