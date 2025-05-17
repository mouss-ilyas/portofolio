# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory
WORKDIR /backend

# Copy all project files into the container
COPY . .

# Create necessary directories within /backend
RUN mkdir -p data/static

# Install requirements
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /

# Expose port
EXPOSE 8000

# Run uvicorn server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]