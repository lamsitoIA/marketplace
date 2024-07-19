CREATE DATABASE lam;
\c lam;

CREATE TABLE users
(
  id_user SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL, 
  rut VARCHAR(30) NOT NULL UNIQUE, 
  email VARCHAR(100) NOT NULL UNIQUE, 
  password VARCHAR(100) NOT NULL,
  address VARCHAR(350) NOT NULL,
  url_icons VARCHAR(500) NOT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT NOW(),
  update_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Ignacio', '12.345.678-9', 'sofi@gmail.com', '123', 'Calle 123', 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png');


CREATE FUNCTION update_updated_at_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = now();
    RETURN NEW;
END;
$$
 LANGUAGE 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE
ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_users();


CREATE TABLE categories(
  id_categories SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL
);
INSERT INTO categories (name)
 VALUES ('PHONE'), ('LAPTOP'), ('SMART WATCH'), ('HEADPHONES'), ('MOUSE') ;


CREATE TABLE brands (
  id_brand SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL
);
 INSERT INTO brands (name)
VALUES ('SAMSUNG'), ('LG'), ('APPLE'), ('DELL'), ('SONY'), ('LENOVO'), ('HP'), ('BOSE'),
       ('APPLE WATCH'), ('SONY WATCH'), ('FITBIT WATCH'), ('SAMSUNG WATCH'), ('XIAOAMI'), ('HUAWEI');


CREATE TABLE products (
id_product SERIAL PRIMARY KEY , 
name VARCHAR(50) NOT NULL, 
description VARCHAR(200), 
price DECIMAL(10, 3) NOT NULL,
quantity INT NOT NULL,
state VARCHAR(20) NOT NULL,
isFavorite BOOLEAN NOT NULL,
url_image VARCHAR(500) NOT NULL, 
id_user INT NOT NULL,
id_categories INT NOT NULL,
id_brand INT NOT NULL,
create_at TIMESTAMP NOT NULL DEFAULT NOW(), 
update_at TIMESTAMP NOT NULL DEFAULT NOW(),
CONSTRAINT fk_products_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
CONSTRAINT fk_products_categories FOREIGN KEY (id_categories) REFERENCES categories(id_categories) ON DELETE CASCADE,
CONSTRAINT fk_products_brand FOREIGN KEY (id_brand) REFERENCES brands(id_brand) ON DELETE CASCADE
);

INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Apple MacBook Pro 2017', 'Esta practicamente nuevo, excelente mac', 699.990, 1, 'nuevo' ,false, 'https://technohubdigitalsolutions.co.ke/wp-content/uploads/2022/09/MLLAP99052.png', 1, 2, 3);


CREATE FUNCTION update_updated_at_products()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = now();
    RETURN NEW;
END;
$$
 LANGUAGE 'plpgsql';

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_products();


CREATE TABLE role (
  id_role SERIAL PRIMARY KEY,
  role VARCHAR(50) NOT NULL
);
INSERT INTO role (role) VALUES ('user'), ('admin');


CREATE TABLE user_role (
  id_user_role SERIAL PRIMARY KEY,
  users_id INT NOT NULL,
  role_id INT NOT NULL,
  CONSTRAINT user_role_user FOREIGN KEY (users_id) REFERENCES users(id_user) ON DELETE CASCADE,
  CONSTRAINT user_role_role FOREIGN KEY (role_id) REFERENCES role(id_role) ON DELETE CASCADE
);

-- aqui vemos si lo asignamos como usuario o admin
INSERT INTO user_role (users_id, role_id) 
VALUES (1, (SELECT id_role FROM role WHERE role = 'user'));


INSERT INTO user_role (users_id, role_id) 
VALUES (1, (SELECT id_role FROM role WHERE role = 'admin'));


-- Usuario 2  url_icons 348x348
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Felipe', '11.145.578-9', 'felipe@gmail.com', '123', 'Calle los trapense', 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png');
-- Usuario 3  url_icons 512x512
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Antonia', '19.145.578-9', 'anto@gmail.com', '123', 'Calle los espejos N°421', 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png');
-- Usuario 4  url_icons 820x819
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Fernanda', '15.225.578-5', 'fernanda@gmail.com', '123', 'Comuna Ñuñoa, Calle las flores N°123', 'https://img.favpng.com/18/17/4/computer-icons-user-profile-female-avatar-png-favpng-J49fwYQdgqY7JajmQdyGdWuP2.jpg');
-- Usuario 5  url_icons 860x900
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Jorge', '12.145.578-5', 'jorge@gmail.com', '123', 'Comuna Ñuñoa, Calle alfredo N°123', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuCf31SSHaH1Z8oPndTOFf1FctAz3_1GSQCe_7AA4wsDvpxNp2xh3pck7M5HGHj97zG8g&usqp=CAU');
-- Usuario 6  url_icons 920x920
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Sofia', '13.225.578-5', 'sofia@gmail.com', '123', 'Comuna Ñuñoa, Calle los jazmines N°123', 'https://w7.pngwing.com/pngs/832/40/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png');
-- Usuario 7  url_icons 920x920
INSERT INTO users (name, rut, email, password, address, url_icons) 
VALUES ('Maria', '24689735-9', 'Maria@gmail.com', '000000', 'Comuna Ñuñoa, Calle las flores N°123', 'https://img.favpng.com/18/17/4/computer-icons-user-profile-female-avatar-png-favpng-J49fwYQdgqY7JajmQdyGdWuP2.jpg');
-- Producto 2 
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Samsung s21', 'Esta nuevo en caja, con garantia', 899.990, 4, 'Nuevo' ,false, 'https://imgdb.net/storage/uploads/01fd10e827522f78781fb7b78b46f7a94c4580d58a7d41399ca0a7d41a91f29b.png', 2, 1, 1);
-- Producto 3 
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Apple Watch', 'Producto nuevo y sellado', 199.990, 3, 'Nuevo' ,false, 'https://imgdb.net/storage/uploads/aff3b183f0aa6c4b059065bf931b72ed488f0d322512fd02d0049b151309c643.png', 3, 3, 3);
-- Producto 4  
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Audifonos', 'En muy buen estado, excelente audifono', 699.990, 1, 'Usado' ,false, 'https://imgdb.net/storage/uploads/8091a4769d36054176c95708cb8c917b9db146d6c48f71d76eb3a8d7fbd902b0.png', 4, 4, 8);
-- Producto 5 Aqui quede tengo que agregar este product
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Notebook HP NUEVO', 'Producto nuevo y con garantia', 999.990, 1, 'Nuevo' ,false, 'https://imgdb.net/storage/uploads/6999a5656ad671445b5d2e9fa5ddae778bba2aaf468f2bd49a5845823f4ffcaa.png', 5, 2, 7);
-- Producto 6 
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Iphone 14 pro', 'Esta practicamente nuevo, excelente celular', 699.990, 1, 'Usado' ,false, 'https://imgdb.net/storage/uploads/7793490574f55cc817ed4579aeb23e631f03da4286035b2996b0db900c87cb1c.png', 6, 1, 3);
-- Producto 7 
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Audifonos Impecable', 'Esta en muy buen estado', 129.990, 1, 'Usado' ,false, 'https://imgdb.net/storage/uploads/b463a2e7f156687a1dc40a21ed375bc7d39ec64c0c939c63f39e1749805acfc0.png', 7, 4, 5);
-- Producto 8 
INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Audifonos Impecable', 'Esta en muy buen estado', 129.990, 1, 'Usado' ,false, 'https://imgdb.net/storage/uploads/79d97d581c683551970891edee50a33f6da0bb504af682de9f1f91abfb5ed88b.png', 7, 4, 5);

INSERT INTO products (name, description, price, quantity, state , isFavorite, url_image, id_user, id_categories, id_brand) 
VALUES ('Samsung s21', 'Esta nuevo en caja, con garantia', 899.990, 4, 'Nuevo' ,false, 'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/8c17ce9614e7128265c04cd72b6d2744/large.png', 11, 1, 1);
-- Producto 3 

/* INSERT INTO categories (name)
 VALUES ('PHONE'), ('LAPTOP'), ('SMART WATCH'), ('HEADPHONES');
 INSERT INTO brands (name)
VALUES ('SAMSUNG'), ('LG'), ('APPLE'), ('DELL'), ('SONY'), ('LENOVO'), ('HP'), ('BOSE'),
       ('APPLE WATCH'), ('SONY WATCH'), ('FITBIT WATCH'), ('SAMSUNG WATCH'), ('XIAOAMI'), ('HUAWEI'); */
       CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY ( id_product) REFERENCES products(id_product)
);


SELECT ci.id, ci.quantity, ci.id_user AS id_comprador, p.name, p.price, p.quantity AS stock, p.url_image FROM  cart_items AS ci INNER JOIN products AS p ON ci.id_product = p.id_product WHERE ci.id_user = 17


       
-- Funcionalidad IsFavorite: Para implementar esta funcionalidad es necesario una tabla para que el usuario pueda marcas sus favoritos

CREATE TABLE user_favorite (
  id_user_list_favorite SERIAL PRIMARY KEY, 
  id_user INT NOT NULL, 
  id_product INT NOT NULL, 
  create_at TIMESTAMP NOT NULL DEFAULT NOW(), 
  update_at TIMESTAMP NOT NULL DEFAULT NOW(), 
  CONSTRAINT fk_user_favorite_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE, 
  CONSTRAINT fk_user_favorite_product FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE,
  CONSTRAINT uc_user_product UNIQUE (id_user, id_product)
);

CREATE FUNCTION update_updated_at_user_favorite()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_user_favorite_updated_at
BEFORE UPDATE
ON user_favorite
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_user_favorite();
