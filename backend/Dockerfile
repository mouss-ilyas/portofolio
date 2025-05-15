# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy all project files
COPY . /app

# Install requirements (assuming requirements.txt is in root)
RUN pip install --no-cache-dir -r requirements.txt

# Declare a volume at /app/backend
VOLUME /app/backend/data
# Set environment variables
ENV ADMIN_MAIL a@b.c
ENV ADMIN_PASSWORD 1234@1234

# Expose port
EXPOSE 8000

# Run uvicorn server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]