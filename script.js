const startDate = new Date(Date.UTC(2021, 0, 1));

const MONTH_LIST = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function findDayOfYear(now) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
let urls = [];
let request = (interval_name, date) => {
    
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfYear = findDayOfYear(date);
    const hours = date.getUTCHours();
    const jsonPath = "https://dyncdn.exampathfinder.com/tempjsons/event"
    if (interval_name == 'year') {
        const filename = `/y/${year}.json`;
        // console.log(`Time: Year ${year}, File: ${filename}`);
        urls.push(jsonPath + filename);
    }
    else if (interval_name == 'month') {
        const filename = `/m/${year}-${month + 1}.json`;
        const name = MONTH_LIST[month];
        // console.log(`Time: ${name} ${year}, File: ${filename}`);
        urls.push(jsonPath + filename);
    }
    else if (interval_name == 'day') {
        const filename = `/d/${year}-${dayOfYear}.json`;
        // console.log(`Time: Day ${dayOfYear} of ${year}, File: ${filename}`);
        urls.push(jsonPath + filename);

    }
    else if (interval_name == 'hour') {
        const filename = `/h/${year}-${dayOfYear}-${hours + 1}.json`;
        // console.log(`Time: Hour ${hours + 1} of day ${dayOfYear}, ${year}, File: ${filename}`);
        // urls.push(jsonPath + filename);
    }
    else {
        console.log('Unknown case', interval_name, 'found');

    }
};

function daysInMonth(month, year) {
    return new Date(year, month, 0).getUTCDate();
}

function forward(dateItr, currentDate) {
    while (dateItr.getUTCFullYear() < currentDate.getUTCFullYear() && dateItr < currentDate) {
        request('year', dateItr);
        dateItr.setUTCFullYear(dateItr.getUTCFullYear() + 1);
    }
    while (dateItr.getUTCMonth() < currentDate.getUTCMonth() && dateItr < currentDate) {
        request('month', dateItr);
        dateItr.setUTCMonth(dateItr.getUTCMonth() + 1);
    }
    while (dateItr.getUTCDate() < currentDate.getUTCDate() && dateItr < currentDate) {
        request('day', dateItr);
        dateItr.setUTCDate(dateItr.getUTCDate() + 1);
    }
    while (dateItr.getUTCHours() < currentDate.getUTCHours() && dateItr < currentDate) {
        request('hour', dateItr);
        dateItr.setUTCHours(dateItr.getUTCHours() + 1);
    }
}

function initialSync() {
    // console.log(`Fetching records from ${startDate.toUTCString()} to ${currentDate.toUTCString()}`);
    urls = [];
    const currentDate = new Date(Date.now())
    let dateItr = startDate;
    forward(dateItr, currentDate);
    loadJsons(urls);

}

function sync(lastFetch, currentDate) {
    console.log(`Fetching records from ${lastFetch.toUTCString()} to ${currentDate.toUTCString()}`);

    let dateItr = lastFetch; // last date when fetched

    // Fetch Upto this year
    while (dateItr.getUTCHours() <= 23 && dateItr < currentDate) {
        request('hour', dateItr);
        const hours = dateItr.getUTCHours() + 1;
        dateItr.setUTCHours(dateItr.getUTCHours() + 1);
        if (dateItr.getUTCHours() != hours) break;
    }

    while (dateItr.getUTCDate() <= daysInMonth(dateItr.getUTCMonth(), dateItr.getUTCFullYear()) && dateItr < currentDate) {
        request('day', dateItr);
        const days = dateItr.getUTCDate() + 1;
        dateItr.setUTCDate(dateItr.getUTCDate() + 1);
        if (dateItr.getUTCDate() != days) break;
    }

    while (dateItr.getUTCMonth() <= 11 && dateItr < currentDate) {
        request('month', dateItr);0
        const months = dateItr.getUTCMonth() + 1;
        dateItr.setUTCMonth(dateItr.getUTCMonth() + 1);
        if (dateItr.getUTCMonth() != months) break;
    }

    forward(dateItr, currentDate);
}

// const currentDate = new Date(2023, 2, 4);

initialSync()

/**
 * Function to download a file with in 5 seconds
 * 
 * @param {string} url - URL of JSON to download.
 * @returns {Promise} - promise with data if promise is fulfilled else rejection status with url
 */
function downloadJSON(url) {
  return new Promise((resolve, reject) => {
    // Controller to Abort Fetch , to be used in promise
    const controller = new AbortController();
    let downloadedInTime;
    let downloadFailed;
    fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        downloadedInTime = true;
        downloadFailed = false;
        resolve(data)
      }).catch((err) => {
        downloadedInTime = true
        downloadFailed = true
        reject()
      })
    // Abort Fetching JSON if it takes more than 5sec and reject promise with url as a reason
    setTimeout(() => {
      if (!downloadedInTime && !downloadFailed) {
        count += 1;
        if (count == 3) {
          reject();
        }
        else {
          controller.abort();
          downloadJSON(url)
        }
      }
    }, 5000);
  });
}


// Track Count to set number of Times to retry the failed downloads.
let count = 0;
let result = [];
/**
* Function to download multiple JSON files parallelly and with in 5sec.
* If any download fails retry it max 5 times
* 
* @param {string[]} urls -  Array of JSON Urls to download
*/
function loadJsons(urls) {
  let promises = [];
  urls.forEach((url) => {
    promises.push(downloadJSON(url));
  })
  Promise.allSettled(promises).then((results) => {
    results.forEach((res) => {
        if(res.status === "fulfilled") result = [...result, res.value]
    });
    mergeJsonData(result)
  })

}

const initialJsonData = {}
function mergeJsonData(data){
  data.forEach((item) => {
    for (const [key, value] of Object.entries(item)){
        initialJsonData[key] = value
    }
  })
  loadOldJsons()
}


function loadOldJsons(){
    fetch("https://dyncdn.exampathfinder.com/tagsCompressed/events.json").then((res) => res.json()).then((data) => {
    console.log(`Total Json length of all events - ${Object.values(data).length}`);    
const extraEvents = {}
    let extraKeys = []
    for (const [key, value] of Object.entries(data)){
        const updateDate = new Date(Number(value.lastUpdated) * 1000)
        const date = new Date();
        date.setDate(date.getDate() - 2);
        if(!(key in initialJsonData) && updateDate >= date ){
            extraEvents[key] = value
            extraKeys.push(key)
        }
        
    }
    extraKeys.forEach((key, index) => {
        delete data[key]
    })
    console.log(`Initial Events Json Length - ${Object.values(initialJsonData).length}`);
    console.log(`Events Not  Present in initial Json - ${Object.values(extraEvents).length}`);
    console.log(`Total Json length of all events - ${Object.values(data).length}`);
    console.log(initialJsonData);
    console.log(data);
})
}