from bs4 import BeautifulSoup
import requests

def scrapeLink(majorName):

    url = 'https://catalog.ufl.edu/UGRD/programs/'
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    item_list = soup.find_all('li', class_ = "item")

    classes = "classes.csv"
    f = open(classes, 'w')

    link = "not found"

    for item in item_list:
        if item.find('a').text != "Learn more":
            if majorName == item.find('a').text:
                f.write(item.find('a')['href'] + "\n")
                link = item.find('a')['href']

    return link

def scrapeMinor(fullLink):
    url = fullLink
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    table = soup.find('tbody')

    rows = table.find_all('tr')

    return appendClasses(rows)
    


def scrapeMajor(fullLink):
    url = fullLink
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    
    divSemPlanner = soup.find('div', id = "modelsemesterplantextcontainer")
    table = divSemPlanner.find('table', class_ = "sc_plangrid")
    
    rows = table.find_all('tr')

    semList = [] #semlist = [ [ semester 1 ] [ semester 2 ] ]
    #------------------ [ [class1], [class2], [class3], ... ]

    tempTag = soup.new_tag('div') #initialize blank tag
    for row in rows:
        if any("plangrid" in cls for cls in row['class']): #check for substring in list of classes
            if len(tempTag.find_all()) != 0: #check if list empty
                semList.append(appendClasses(tempTag))
                tempTag.clear()

        else:
            tempTag.append(row)

    #print(tempTag)
    return semList


def createCodeNameHours(itemsInLine):

    if len(itemsInLine) == 2: #check if its real class or "elective" (selects hv 3)
        courseCode = "N/A"
        className = itemsInLine[0].text
        hours = itemsInLine[1].text

    else:
        if itemsInLine[0].find('div') != None: #checks if theres a div

            courseCode = itemsInLine[0].find('a').text

            if itemsInLine[0].find('span') != None: #check for double & line
                findSpan = itemsInLine[0].find('span')
                courseCode = courseCode + " & " + findSpan.find('a').text #combine names - might not work
                className = itemsInLine[1].text 

                #find index where space is needed
                subStringIndex = itemsInLine[1].text.find(itemsInLine[1].find('span').text)

                className = className[0:subStringIndex] + " " + className[subStringIndex:] #add space
            
            else:
                className = itemsInLine[1].text
        else:
            courseCode = itemsInLine[0].text
            className = itemsInLine[1].text
        
        courseCode = courseCode.replace('\xa0', ' ') #fix weird space, XXX1111

        if itemsInLine[2].text == "":
            hours = getMissingHours(itemsInLine)
        else:
            hours = itemsInLine[2].text

    return [courseCode, className, hours]

def getMissingHours(itemsInLine): 
    link = itemsInLine[0].find('a')['href']
    url = 'https://catalog.ufl.edu' + link
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    divId = soup.find('div', id = 'fssearchresults')
    stringh2 = divId.find('h2').text
    creditIndex = stringh2.find("Credit")
    hours = stringh2[creditIndex-2]

    if itemsInLine[0].find('span') != None:
        hours = int(hours)*2
        str(hours)
    return hours





# def reorgArray(tempArray):
#     newTempArray = []
    
#     #fix tempArray to organize items
#     for courseItem in range(3): #move the course names to the first array item
#         newrow = []
#         for course in range(len(tempArray)):
#             newrow.append(tempArray[course][courseItem])
#         newTempArray.append(newrow)
    
#     return newTempArray

def appendClasses(rows):
    classesList = []

    tempArray = [] #for selectOne
    selectOne = 0 #track if selectOne is triggered

    for classLine in rows:

        itemsInLine = classLine.find_all('td')

        #selectOne ---------------------------------------------------
        if itemsInLine[0].text == 'Select one:': #see selectOne 
            selectOne = 1
            continue
            
        if selectOne == 1:
            if itemsInLine[0].find('div') is None: #check if its a normal row

                #classesList.append(reorgArray(tempArray)) 
                classesList.append(tempArray)
                
                #create and add special select array
                classesList.append(createCodeNameHours(itemsInLine))

                tempArray = [] #empty array again
                selectOne = 0 #exit selection

            else:
                tempArray.append(createCodeNameHours(itemsInLine)) #append line to temp array for later nesting
        
        #normal --------------------------------------------------------
        else:
            #normal append
            classesList.append(createCodeNameHours(itemsInLine))

    return classesList



def scrapeClasses(majorName):

    link = scrapeLink(majorName)

    url = "https://catalog.ufl.edu" + link + "#modelsemesterplantext"
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    modelCheck = soup.find('div', id = 'modelsemesterplantextcontainer') #check if has #criticaltracking titles

    # type(modelCheck) #test modelcheck
    # print(modelCheck)

    if modelCheck is None: #no modelsemesterplans
        return scrapeMinor(url)
    else:
        return scrapeMajor(url)


#print(scrapeClasses("Accounting"))
