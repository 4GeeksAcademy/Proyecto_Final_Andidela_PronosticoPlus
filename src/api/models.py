from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    city = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(100), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "city": self.city,
            "username": self.username,
            "name": self.name,
            "last_name": self.last_name,
            "phone_number": self.phone_number
            
            # do not serialize the password, its a security breach
        }
class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)

    def __repr__(self):
        return f'<City {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            
        }

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Country {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            
        }

class Favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=False)

    def __repr__(self):
        return f'<City {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            
        }