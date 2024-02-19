-- Create table
CREATE TABLE carteira (
    id INT PRIMARY KEY,
    limite INT,
    saldo INT
);

-- Insert values
INSERT INTO
    carteira (id, limite, saldo)
VALUES
    (1, 100000, 0),
    (2, 80000, 0),
    (3, 1000000, 0),
    (4, 10000000, 0),
    (5, 500000, 0);

-- Create table for transactions
CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    carteira_id INT,
    valor DECIMAL(10, 2),
    tipo CHAR(1),
    descricao TEXT,
    realizada_em TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (carteira_id) REFERENCES carteira(id)
);