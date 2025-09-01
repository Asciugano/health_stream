from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def hash_password(passw: str) -> str:
    return pwd_context.hash(passw)

def verify_password(plain_pass: str, hashed_passw: str) -> bool:
    return pwd_context.verify(plain_pass, hashed_passw)
