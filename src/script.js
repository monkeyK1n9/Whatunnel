/**
 * This code extracts the contacts of a whatsapp group you
 * are in and saves in individual files
 * 
 * Created by: monkey_K1n9
 */

const generateBtn = document.querySelector('.buttonGenerate')

generateBtn.addEventListener('click', generateFile)

function generateFile() {

    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
            func: DOMtoString,
            args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        // Creating a Blob for having a csv file format 
        // and passing the data with type
        const blob = new Blob([results[0].result], { type: 'text/csv' });

        // Creating an object for downloading url
        const url = window.URL.createObjectURL(blob)
    
        // Creating an anchor(a) tag of HTML
        const a = document.createElement('a')
    
        // Passing the blob downloading url 
        a.setAttribute('href', url)
    
        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute('download', 'download.csv');

        a.click()
        
        console.log(results[0].result);
    }).catch(function (error) {
        console.log('There was an error injecting script : \n' + error.message);
    });
}

// window.onload = onWindowLoad;

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    
    const numbers = selector

    .querySelector('.ggj6brxn.gfz4du6o.r7fjleex.lhj4utae.le5p0ye3._11JPr.selectable-text.copyable-text')
    
    let csvContent = ''
    numbers.title.split(',').forEach(number => {
        csvContent += number + "\n"
    })
    
    return csvContent;
}

//giving a push to the creator
const creatorLink = document.querySelector(".creator")

creatorLink.addEventListener("click", () => {
    // creatorLink.click()
    window.open(creatorLink.href)
})