# Part 1: Drag and Drop with React

Below outlines the steps taken to create the drag and droppable portion of the site.

## Overview

This project uses Flask to scrape an array of classes for a submitted major. This array of classes is then translated into a JavaScript object that is used by React to render the Drag and Drop components.

### Step 1: Flask renders web page with root

1. Use @app.route('/', methods=['GET']) for index.html to allow the user input to be passed to the following page
2. On submit, use @app.route('/modelsemester', methods=['POST']) so that the following page can run a script using the input
3. The resulting variable from the script is the javascript object needed by React, and is rendered with the template
4. The template has a <div id="root"></div> for the React components

### Step 2: Build React App

1. Follow tutorial to write the drag and drop capability here: https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
2. Ensure the React app is importing the javascript object correctly from the Flask script
3. Build the React app into the Static folder of the Flask app, in a folder named "Assets"
4. Link the built stylesheet and javascript file in the html template using the long, alphanumeric filename


# Part 2: Flask Application Deployment on AWS Elastic Beanstalk

Below outlines the steps taken to deploy a Flask web application on AWS Elastic Beanstalk, with static assets hosted on Amazon S3.

## Overview

The application is structured as a Flask backend with frontend assets. The static frontend assets are hosted on Amazon S3 for efficient delivery, while the Flask application is deployed on AWS Elastic Beanstalk, which provides a scalable and managed environment.

## Prerequisites

- AWS Account
- Flask application
- S3 Bucket for static assets
- Local environment setup for Flask development

## Deployment Process

### Step 1: Prepare Flask Application for Elastic Beanstalk

1. **Structure Your Application**:
   Ensure your Flask application follows a standard structure with separate directories for static files, templates, and the main application logic.

2. **Create `requirements.txt`**:
   List all Python dependencies required for your Flask app.

3. **Configure Gunicorn**:
   Use Gunicorn as the WSGI server. Configure it in the `Procfile` to point to your Flask app object.

4. **Update `Procfile`**:
   Create a `Procfile` in the root of your application with the command to start Gunicorn (e.g., `web: gunicorn --bind :8000 flaskapp:app`).

### Step 2: Set Up S3 for Static Assets

1. **Create an S3 Bucket**:
   Set up an S3 bucket and configure it for web hosting.

2. **Upload Static Assets**:
   Upload your static files (CSS, JS, images) to the S3 bucket.

3. **Update Flask Templates**:
   Modify your Flask templates to reference static assets using their S3 URLs.

### Step 3: Deploy Flask Application to Elastic Beanstalk

1. **Create Elastic Beanstalk Environment**:
   Set up a new Elastic Beanstalk web server environment. Choose the Python platform and upload your zipped Flask application.

2. **Configure Environment**:
   Set up environment variables and other configurations as needed in the Elastic Beanstalk console.

3. **Deploy Application**:
   Upload and deploy your Flask application ZIP file through the Elastic Beanstalk dashboard.

## Conclusion

This setup provides a scalable and managed environment for hosting a Flask application, with static assets served efficiently through Amazon S3.
