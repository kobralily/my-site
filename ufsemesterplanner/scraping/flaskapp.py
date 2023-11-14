from flask import Flask, render_template
from bs4 import BeautifulSoup
import requests
import json
from scrapeclasses import *

app = Flask(__name__)

# Set the static folder to 'static'
#app.static_folder = 'static'

# def scrapePlan(major, major2, minor, certificate):

#     return scrapeClasses(major), scrapeClasses(major2), scrapeClasses(minor), scrapeClasses(certificate)

@app.route('/')
def index():
    classesArray = scrapeClasses("Accounting")
    #classesArrayJson = json.dumps(classesArray)
    #print(classesArrayJson) #works
    return render_template('index.html', classesArrayJson = json.dumps(classesArray))

if __name__ == '__main__':
    app.run(debug=True, port=5500)