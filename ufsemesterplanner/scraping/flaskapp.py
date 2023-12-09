from flask import Flask, render_template, request, redirect, url_for
from bs4 import BeautifulSoup
import requests
import json
from scrapeclasses import *

app = Flask(__name__)

# Set the static folder to 'static'
#app.static_folder = 'static'

# def scrapePlan(major, major2, minor, certificate):

#     return scrapeClasses(major), scrapeClasses(major2), scrapeClasses(minor), scrapeClasses(certificate)

@app.route('/', methods=['GET'])
def index():
    #classesArray = scrapeClasses("Accounting")
    #classesArrayJson = json.dumps(classesArray)
    #print(classesArrayJson) #works
    #return render_template('index.html', classesArrayJson = json.dumps(classesArray))
    return render_template('index.html')

@app.route('/modelsemester', methods=['POST'])
def modelsemester():
    major_name = request.form.get('majors')
    classesArray = scrapeClasses(major_name)
    classesArrayJson = json.dumps(classesArray)
    #return render_template('modelsemester.html')
    return render_template('modelsemester.html', classesArrayJson = classesArrayJson)

if __name__ == '__main__':
    app.run(debug=True, port=5500)