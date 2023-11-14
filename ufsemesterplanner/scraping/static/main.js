// Load CSV data and populate datalists
async function loadCSVData(url, datalistId) {
    const response = await fetch(url);
    const data = await response.text();
    const datalist = document.getElementById(datalistId);

    // Split the CSV data by lines and create options
    const options = data.split('\n')
        .filter(option => option.trim() !== '')
        .map(option => `<option value="${option.trim()}"></option>`);

    datalist.innerHTML += options.join('');
}

// Load data for each input
loadCSVData('/static/csv/majors.csv', 'majors');
loadCSVData('/static/csv/majors.csv', 'majors2');
loadCSVData('/static/csv/minors.csv', 'minors');
loadCSVData('/static/csv/certs.csv', 'certificates');
//-------------------------------------------------------------