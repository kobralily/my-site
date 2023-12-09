//MAKE INTO DICTIONARY

var parsedArray = JSON.parse(classesArrayJson);
console.log(parsedArray);

// create new dictionary
var initialClassData = {
    classes: {},
    semesters: {},
    semesterOrder: []
};

//track iterations
var classId = 1;
var semesterId = 1;
var classKey = 'class-0';

// iterate through OG data
for (var i = 0; i < parsedArray.length; i++) {
    var sem = parsedArray[i]; //sem is a single sem of whole array

    var semesterKey = 'semester-' + semesterId;
    if (!initialClassData.semesters[semesterKey]) {
        initialClassData.semesters[semesterKey] = {
            id: semesterKey,
            title: 'Semester' + semesterId,
            classIds: []
        };
        initialClassData.semesterOrder.push(semesterKey);
        semesterId++;
    }

    for (var k = 0; k < sem.length; k++){
        // class object gets created and added
        if (Array.isArray(sem[k][0])) {

            for (var j = 0; j < sem[k].length; j++) { //for each class array in the class spot of the semester

                // unique class id
                classKey = 'class-' + classId;

                initialClassData.classes[classKey] = {
                    id: classKey,
                    content: { 
                        courseCode: sem[k][j][0],
                        courseName: sem[k][j][1],
                        hours: sem[k][j][2],
                        option: j + 1
                    }
                };
                initialClassData.semesters[semesterKey].classIds.push(classKey); //add class to semester
                classId++;
            }
        }
        else {
            // unique class id
            classKey = 'class-' + classId;

            initialClassData.classes[classKey] = {

                id: classKey,
                content: { 
                    courseCode: sem[k][0],
                    courseName: sem[k][1],
                    hours: sem[k][2],
                    option: 0
                }
            };
            initialClassData.semesters[semesterKey].classIds.push(classKey); //add class to semester
            classId++;
        }
    }
}
console.log(initialClassData);

export { initialClassData };