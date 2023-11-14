from bs4 import BeautifulSoup
import requests

url = 'https://catalog.ufl.edu/UGRD/programs/'
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')

item_list = soup.find_all('li', class_ = "item")

majors = "majors.csv"
minors = "minors.csv"
certs = "certs.csv"

f = open(majors, 'w')
f2 = open(minors, 'w')
f3 = open(certs, 'w')


#for item in item_list:
#    if item.find('a').text != "Learn more":
#        f.write(item.find('a').text + "\n")

for item in item_list:
    if item.find('a').text != "Learn more":
        if "Minor" in item.find('a').text:
            f2.write(item.find('a').text + "\n")

        elif "Certificate" in item.find('a').text:
            f3.write(item.find('a').text + "\n")

        else:
            f.write(item.find('a').text + "\n")