chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getHTMLCode") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            console.log(activeTab);
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id}, func: () => document.documentElement.outerHTML,
            }, (result) => {
                const htmlCode = result[0].result;
                chrome.runtime.sendMessage({action: "htmlCode", data: htmlCode});
            });
        });
    }
    if (message.action === "getInfo") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            console.log(activeTab);
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id}, func: () => document.documentElement.outerHTML,
            }, (result) => {
                const htmlCode = result[0].result;
                chrome.runtime.sendMessage({action: "setInfo", activeTabData: htmlCode});
            });
        });
    }
    if (message.action === "generatePDF") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            console.log('tabs');
            console.log(tabs);
            const activeTab = tabs[0];
            console.log("changes to the generate pdf function");
            console.log(activeTab);
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id}, func: () => document.documentElement.outerHTML,
            }, (result) => {
                console.log("RESULT:", result);
                const htmlCode = result[0].result;
                // generatePdf()

                chrome.runtime.sendMessage({action: "generate-pdf-listener", activeTabData: htmlCode});
            });
        });

    }

});
