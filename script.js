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
    let downloadStatus;
    fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        downloadStatus = true;
        resolve(data)
      }).catch(() => {
        reject(url)
      })
    // Abort Fetching JSON if it takes more than 5sec and reject promise with url as a reason
    setTimeout(() => {
      if (!downloadStatus) {
        count += 1;
        if (count == 3) {
          reject("Time Limit Exceeded");
        }
        else {
          controller.abort();
          downloadJSON(url).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          })
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
function multiFileDownloader(urls) {
  let promises = [];
  let rejectedUrls = []

  urls.forEach((url) => {
    promises.push(downloadJSON(url));
  })
  Promise.all(promises).then((results) => {
    results.forEach((res) => {
      result = [...result, res]
    });
    mergeJsonData(result)
  });

}

const urls = []

// Create JSON's Array to Download
for (let i = 1; i <= 5; i++) {
  urls.push(`https://dyncdn.exampathfinder.com/squential-merging/${i}.json`)
}

// Call Multifile Downloader
multiFileDownloader(urls)

function mergeJsonData(data){
  const oldJson = {
    "7PJpNNk5": {
        "lastUpdated": 1646464868,
        "examIds": [
            "Sp3CpMyw"
        ],
        "eventId": "7PJpNNk5",
        "organisationIds": [
            "si8dEAdI"
        ],
        "tagsData": [
            {
                "nameId": "3PvVhPBF",
                "valueId": "mafSKGSa"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "flxTTkNt"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "Lbh1jLS3"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "J2z2c6ZE"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "Jt2FCkTs"
            },
            {
                "nameId": "Bv2ZOMzp",
                "valueId": "7saoacmU"
            },
            {
                "nameId": "HXKXXgut",
                "valueId": "xAv0tErs"
            },
            {
                "nameId": "JUVYiZ11",
                "valueId": "UjFcLDUk"
            },
            {
                "nameId": "Lz1uzMxS",
                "valueId": "E8G399ap"
            },
            {
                "nameId": "1zWOGWtS",
                "valueId": "KvIEdCat"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "aitu9oAT"
            },
            {
                "nameId": "MI8XYecF",
                "valueId": "Z0g74AM1"
            },
            {
                "nameId": "MI8XYecF",
                "valueId": "W4Oqz8kL"
            },
            {
                "nameId": "MI8XYecF",
                "valueId": "21rFgq14"
            },
            {
                "nameId": "MgHVVPYR",
                "valueId": "8qI2ZvkE"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "xNpu1qGH"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "lQhPrOYX"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "wU3gzZak"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "ALXcJ69K"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "Qw6IbVEJ"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "aHeGmj6s"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "ufBpSSRp"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "40PGqXiJ"
            },
            {
                "nameId": "pBL58aed",
                "valueId": "wAEHnrqJ"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "uYQYSTBx"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "pQ3IXKSj"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "iYH812KU"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "S2ydeSNS"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "Q1vB57QH"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "ExMdiJUP"
            }
        ],
        "title": {
            "en": "Readersssss and other post in Ali Yavar Jung National Institute of Speech and Hearing Disabilities (Divyangjan)",
            "hi": "अली यावर जंग नेशनल इंस्टीट्यूट ऑफ स्पीच एंड हियरिंग डिसएबिलिटीज (दिव्यांगजन) में रीडर और अन्य पद"
        },
        "title_roman": {
            "hi": "alee yaavar jang neshanal insteetyoot oph speech end hiyaring disebiliteej (divyaangajan) mein reedar aur any pad"
        }
    },
    "yM0rGtfc": {
        "lastUpdated": 1642662527555555555,
        "examIds": [
            "RNqfdTGm"
        ],
        "eventId": "yM0rGtfc",
        "organisationIds": [
            "csvJCv9p"
        ],
        "tagsData": [
            {
                "nameId": "8lw29cmS",
                "valueId": "zYIKrpp6"
            },
            {
                "nameId": "Bv2ZOMzp",
                "valueId": "zE59JQXi"
            },
            {
                "nameId": "Fx8qspPX",
                "valueId": "r3VsH1T7"
            },
            {
                "nameId": "HXKXXgut",
                "valueId": "yca812Q8"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "M1lPSdMI"
            },
            {
                "nameId": "MgHVVPYR",
                "valueId": "8qI2ZvkE"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "xNpu1qGH"
            },
            {
                "nameId": "QncoLeTV",
                "valueId": "jpHiLPY5"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "lQhPrOYX"
            },
            {
                "nameId": "UnAo4ITS",
                "valueId": "3NOPd8An"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "wU3gzZak"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "DBokNCuk"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "wYcFuwZf"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "vrf9dV75"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "vDMVh0vz"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "oAcdHCqU"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "Zb9Ft5tm"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "MIn6jRB8"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "56x7Ih2r"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "EYWkFSBG"
            }
        ],
        "title": {
            "en": "NEET- PG 20222222",
            "hi": "नीट- पीजी 2022"
        },
        "title_roman": {
            "hi": "neet- peejee 2022"
        }
    },
    "4Gnd9pKM": {
        "lastUpdated": 1646721760,
        "examIds": [],
        "eventId": "4Gnd9pKM",
        "organisationIds": [
            "cCkmvWGv"
        ],
        "tagsData": [
            {
                "nameId": "3PvVhPBF",
                "valueId": "mafSKGSa"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "Jt2FCkTs"
            },
            {
                "nameId": "Fcm0skbv",
                "valueId": "npYxuza6"
            },
            {
                "nameId": "Fcm0skbv",
                "valueId": "n0mg3Tah"
            },
            {
                "nameId": "Fcm0skbv",
                "valueId": "K3YzyzjF"
            },
            {
                "nameId": "JUVYiZ11",
                "valueId": "s8PXSYVS"
            },
            {
                "nameId": "LyLh6cz8",
                "valueId": "WhUd6th9"
            },
            {
                "nameId": "Lz1uzMxS",
                "valueId": "E8G399ap"
            },
            {
                "nameId": "1zWOGWtS",
                "valueId": "8yTd0bSc"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "wHdIptX2"
            },
            {
                "nameId": "MgHVVPYR",
                "valueId": "8qI2ZvkE"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "b0QKsL3n"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "yk0XRTBG"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "rL4NSCwf"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "l77lWScF"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "hWbYayEE"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "4kuMal8X"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "JNXeIzNj"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "YMs9Oq7M"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "wU3gzZak"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "6QtRtX4s"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "Qw6IbVEJ"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "BbkXrmrQ"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "rxMitUSP"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "qH6OhzW4"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "bqwc41ci"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "axSWtS1l"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "WPsIUMIO"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "pAx587AB"
            },
            {
                "nameId": "pBL58aed",
                "valueId": "wAEHnrqJ"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "MLfLhlcs"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "fx3VIhAg"
            }
        ],
        "title": {
            "en": "Assistant Professor in Lokpriya Gopinath Bordoloi Regional Institute of Mental Health via Direct Recruitment",
            "hi": "लोकप्रिया गोपीनाथ बोरदोलोई क्षेत्रीय मानसिक स्वास्थ्य संस्थान में सीधी भर्ती के माध्यम से सहायक प्रोफेसर"
        },
        "title_roman": {
            "hi": "lokpriya gopeenaath boradoloee kshetreey maanasik svaasthy sansthaan mein seedhee bhartee ke maadhyam se sahaayak prophesar"
        }
    },
    "jR0B5O4D": {
        "lastUpdated": 1643106998,
        "examIds": [
            "y9Sfb22a"
        ],
        "eventId": "jR0B5O4D",
        "organisationIds": [
            "J1Z5x67E"
        ],
        "tagsData": [
            {
                "nameId": "3PvVhPBF",
                "valueId": "sNiQMI0M"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "mafSKGSa"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "YfyZQnEA"
            },
            {
                "nameId": "3PvVhPBF",
                "valueId": "J2z2c6ZE"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "sBtNmBuG"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "Jt2FCkTs"
            },
            {
                "nameId": "Bv2ZOMzp",
                "valueId": "7saoacmU"
            },
            {
                "nameId": "HXKXXgut",
                "valueId": "xAv0tErs"
            },
            {
                "nameId": "JUVYiZ11",
                "valueId": "UjFcLDUk"
            },
            {
                "nameId": "Lz1uzMxS",
                "valueId": "75kQp5Fi"
            },
            {
                "nameId": "1zWOGWtS",
                "valueId": "AUklGSsP"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "9Oq8Qxm3"
            },
            {
                "nameId": "MgHVVPYR",
                "valueId": "8qI2ZvkE"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "b0QKsL3n"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "hWbYayEE"
            },
            {
                "nameId": "ScNU9SmO",
                "valueId": "4kuMal8X"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "YMs9Oq7M"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "tDX6CpHI"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "Qw6IbVEJ"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "fzk9CPb5"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "nIziqcF5"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "lwnhqnqH"
            },
            {
                "nameId": "pBL58aed",
                "valueId": "wAEHnrqJ"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "lFLXrxxj"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "MLfLhlcs"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "GEuB1oUl"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "BX0Z5qr5"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "reSgQOeQ"
            }
        ],
        "title": {
            "en": "Associate Professor (Orthopaedics) and three other post in National Institute for Locomotor Disabilities (Divyangjan)",
            "hi": "राष्ट्रीय लोकोमोटर विकलांग संस्थान (दिव्यांगजन) में एसोसिएट प्रोफेसर (आर्थोपेडिक्स) और तीन अन्य पद"
        }
    },
    "EsthcZBi": {
        "lastUpdated": 1646633868,
        "examIds": [],
        "eventId": "EsthcZBi",
        "organisationIds": [
            "vWWybjHn"
        ],
        "tagsData": [
            {
                "nameId": "74X1HhtR",
                "valueId": "h4wojQpu"
            },
            {
                "nameId": "LMGjNRLB",
                "valueId": "qzphU95R"
            },
            {
                "nameId": "5GH9iXBb",
                "valueId": "9SkGqMTj"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "dgZcncHz"
            },
            {
                "nameId": "MgHVVPYR",
                "valueId": "8qI2ZvkE"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "xNpu1qGH"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "lQhPrOYX"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "wU3gzZak"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "YjWMRIHx"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "Gr5aJ9DX"
            },
            {
                "nameId": "nWIiWAv7",
                "valueId": "uOcJkpow"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "8U0D52tY"
            }
        ],
        "title": {
            "en": "Post Graduate Diploma Course by NPTI for the Academic Year 2022",
            "hi": "शैक्षणिक वर्ष 2022 के लिए एनपीटीआई द्वारा स्नातकोत्तर डिप्लोमा पाठ्यक्रम"
        },
        "title_roman": {
            "hi": "Shaikshanik Varsh 2022 Ke Lie Enapeeteeaee Dvaara Snaatakottar Diploma Paathyakram"
        }
    },
    "iOl11e3E": {
        "lastUpdated": 1644298723,
        "examIds": [],
        "eventId": "iOl11e3E",
        "organisationIds": [
            "Mr7HwXS0"
        ],
        "tagsData": [
            {
                "nameId": "3t4Jn4gc",
                "valueId": "gjkOeqyU"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "MljIg2qF"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "Jt2FCkTs"
            },
            {
                "nameId": "JUVYiZ11",
                "valueId": "czhBnUTg"
            },
            {
                "nameId": "LyLh6cz8",
                "valueId": "WhUd6th9"
            },
            {
                "nameId": "Lz1uzMxS",
                "valueId": "vqLrCeLK"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "9ZecBmZU"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "37PLsSBU"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "lQhPrOYX"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "wU3gzZak"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "ALXcJ69K"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "90CYinxj"
            },
            {
                "nameId": "h4i4xwcE",
                "valueId": "OqHPtke1"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "WgF79fJr"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "eX0s4rzl"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "o7ryZ1cL"
            }
        ],
        "title": {
            "en": "Director post in Bharat Dynamics Limited via Direct Recruitment",
            "hi": "सीधी भर्ती के माध्यम से भारत डायनेमिक्स लिमिटेड में निदेशक पद"
        },
        "title_roman": {
            "hi": "seedhee bhartee ke maadhyam se bhaarat daayanemiks limited mein nideshak pad"
        }
    },
    "HkO8QVRq": {
        "lastUpdated": 1646720527,
        "examIds": [],
        "eventId": "HkO8QVRq",
        "organisationIds": [
            "J7Ed9XlU"
        ],
        "tagsData": [
            {
                "nameId": "3PvVhPBF",
                "valueId": "Lbh1jLS3"
            },
            {
                "nameId": "3t4Jn4gc",
                "valueId": "TDDdbfEZ"
            },
            {
                "nameId": "8lw29cmS",
                "valueId": "sBtNmBuG"
            },
            {
                "nameId": "JUVYiZ11",
                "valueId": "czhBnUTg"
            },
            {
                "nameId": "Lz1uzMxS",
                "valueId": "q42rAeto"
            },
            {
                "nameId": "1zWOGWtS",
                "valueId": "DQixIsx2"
            },
            {
                "nameId": "5pb8RPB8",
                "valueId": "YuSSWf9H"
            },
            {
                "nameId": "MI8XYecF",
                "valueId": "Z0g74AM1"
            },
            {
                "nameId": "OwIM1KAN",
                "valueId": "b0QKsL3n"
            },
            {
                "nameId": "Sd1YZBDu",
                "valueId": "lQhPrOYX"
            },
            {
                "nameId": "eEPkh9p7",
                "valueId": "3owsGzGc"
            },
            {
                "nameId": "gaZ53yRq",
                "valueId": "HTttfHdE"
            },
            {
                "nameId": "iJg6EsMk",
                "valueId": "yJckz9s0"
            },
            {
                "nameId": "jAP1LfPz",
                "valueId": "D34WAXtZ"
            },
            {
                "nameId": "pBL58aed",
                "valueId": "wAEHnrqJ"
            },
            {
                "nameId": "q9LzwSSI",
                "valueId": "5ANDLbGG"
            },
            {
                "nameId": "yJhhcHi6",
                "valueId": "o7ryZ1cL"
            }
        ],
        "title": {
            "en": "Economic Officer Post in Commission for Agricultural Costs and Prices via Deputation",
            "hi": "प्रतिनियुक्ति के माध्यम से कृषि लागत और मूल्य आयोग में आर्थिक अधिकारी पद"
        },
        "title_roman": {
            "hi": "pratiniyukti ke maadhyam se krshi laagat aur mooly aayog mein aarthik adhikaaree pad"
        }
    }
}
  data.forEach((item) => {
    for (const [key, value] of Object.entries(item)){
      oldJson[key] = value
    }
  })
  console.log(Object.values(oldJson).length);
  console.log(oldJson);
}