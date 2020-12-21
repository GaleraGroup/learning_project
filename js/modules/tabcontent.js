function tabs(tabHeader, tabHeaderItem, tabContent, tabHeaderActiveClass) {
    const tabsParent = document.querySelector(tabHeader),
          tabs = document.querySelectorAll(tabHeaderItem),
          tabsContent = document.querySelectorAll(tabContent);
          
    const visibilitySwitch = {
        hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });
            tabs.forEach(tab => {
                tab.classList.remove(tabHeaderActiveClass.slice(1));
            });
        },
        showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabsContent[i].classList.add('fade');
            tabs[i].classList.add(tabHeaderActiveClass.slice(1));
        },
        hideClassActive() {
            tabs.forEach(tab => {
                tab.classList.remove(tabHeaderActiveClass.slice(1));
            });
        },
        showClassActive(event) {
            event.target.classList.add(tabHeaderActiveClass.slice(1));
        }
    };

    visibilitySwitch.hideTabContent();
    visibilitySwitch.showTabContent();

    tabsParent.addEventListener('click', (evt) => {
        evt.preventDefault();
        const target = evt.target;
        if (target && target.matches('div.tabheader__item') && !target.classList.contains(tabHeaderActiveClass.slice(1))) {
            tabs.forEach((item, i) => {
                if (item.innerText === target.innerText) {
                    visibilitySwitch.hideClassActive();
                    visibilitySwitch.showClassActive(evt);
                    visibilitySwitch.hideTabContent();
                    visibilitySwitch.showTabContent(i);
                }
            });
        }
    });
}

export{tabs};