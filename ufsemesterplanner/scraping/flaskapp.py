from flask import Flask, render_template, request, send_from_directory
from scrapeclasses import scrapeClasses
import json
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/modelsemester', methods=['POST'])
def modelsemester():
    major_name = request.form.get('majors')
    classesArray = scrapeClasses(major_name)
    classesArrayJson = json.dumps(classesArray)
    return render_template('modelsemester.html', classesArrayJson=classesArrayJson)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

# This is only used when running locally
if __name__ == '__main__':
    app.run(debug=False, port=5500)
