from fastapi import FastAPI, Depends, HTTPException, status, Request, Form, Response, Cookie
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from models import User
from database import get_db, Base, engine, SessionLocal
from auth import get_password_hash, verify_password, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordBearer
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="templates/static"), name="static")

# Создание таблиц в базе данных
Base.metadata.create_all(bind=engine)

# Настройка OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Маршрут для регистрации
@app.get("/register", response_class=HTMLResponse)
def get_register_page(request: Request):
    return templates.TemplateResponse("loginandreg.html", {"request": request})

@app.post("/register", response_class=HTMLResponse)
def register(
    request: Request,
    name: str = Form(...),
    username: str = Form(...),
    phone_number: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    db: Session = Depends(get_db)
):
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Проверяем, существует ли пользователь с таким же username или phone_number
    existing_user = db.query(User).filter(
        (User.username == username) | (User.phone_number == phone_number)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username or phone number already exists"
        )

    hashed_password = get_password_hash(password)
    db_user = User(
        name=name,
        username=username,
        phone_number=phone_number,
        password=hashed_password,
        profile_picture=None
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return RedirectResponse(url="/login", status_code=302)

# Маршрут для входа
@app.get("/login", response_class=HTMLResponse)
def get_login_page(request: Request):
    return templates.TemplateResponse("loginandreg.html", {"request": request})

@app.post("/loginp", response_class=HTMLResponse)
def handle_login(
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not verify_password(password, user.password):  # Проверяем пароль
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )

    access_token = create_access_token(data={"sub": user.username})
    redirect_response = RedirectResponse(url="/profile", status_code=302)
    redirect_response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
    return redirect_response

# Маршрут для редактирования профиля
@app.get("/profile", response_class=HTMLResponse)
def profile(request: Request, access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    current_user = get_current_user(access_token.split(" ")[1])

    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.username == current_user).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return templates.TemplateResponse("profile.html", {"request": request, "user": user})
    finally:
        db.close()

@app.post("/profile/update", response_class=HTMLResponse)
def update_profile(
    request: Request,
    name: str = Form(None),
    username: str = Form(None),
    phone_number: str = Form(None),
    password: str = Form(None),
    access_token: str = Cookie(None)
):
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    current_user = get_current_user(access_token.split(" ")[1])

    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.username == current_user).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if name:
            user.name = name
        if username:
            user.username = username
        if phone_number:
            user.phone_number = phone_number
        if password:
            user.password = get_password_hash(password)  # Хэшируем новый пароль

        db.commit()
        return RedirectResponse(url="/profile", status_code=302)
    finally:
        db.close()

# Маршрут для выхода
@app.get("/logout", response_class=HTMLResponse)
def logout(response: Response):
    redirect_response = RedirectResponse(url="/login", status_code=302)
    redirect_response.delete_cookie(key="access_token")
    return redirect_response