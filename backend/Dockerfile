FROM python:3.12-slim

WORKDIR /app/backend

RUN pip install poetry

COPY pyproject.toml poetry.lock* /app/backend/

RUN poetry config virtualenvs.create false && poetry install --no-dev

COPY . /app/backend

EXPOSE 8000

CMD ["python", "manage.py"]