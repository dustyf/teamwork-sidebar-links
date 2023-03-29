window.addEventListener('DOMContentLoaded', async () => {
  const savedLinks = await chrome.storage.local.get(['teamworkLinks']);

  if(savedLinks.teamworkLinks){
    savedLinks.teamworkLinks.forEach(linkData =>{
      addLinkFields(linkData)
    });
  }

  let addButton = document.getElementById('add-link');

  addButton.addEventListener('click', event => {
    event.preventDefault();
    addLinkFields();
  });

  let submitButton = document.getElementById('extension-submit');
  submitButton.addEventListener('click', event => {
    let data = [];
    let fieldGroups = document.querySelectorAll('.link-fields');
    fieldGroups.forEach( group => {
      url = group.querySelector('input[data-type="url"]');
      text = group.querySelector('input[data-type="text"]');
      if(text.value && url.value){
        fieldData = {
          'text': text.value,
          'url' : url.value
        };
        data.push(fieldData);
      }
    });
    chrome.storage.local.set({teamworkLinks: data});
  });

  let removeButtons = document.querySelectorAll('a[data-remove=true]');
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener('click', event => {
      event.preventDefault();
      event.target.closest('div.link-fields').remove();
    });
  });
});

function addLinkFields(linkData) {
  linksCount = document.querySelectorAll('.link-fields').length;

  let container = document.getElementById('field-container');
  let fieldsDiv = document.createElement('div');
  fieldsDiv.classList.add('link-fields');

  let urlID = 'link-url-' + (linksCount+1);
  let urlLabel = document.createElement('label');
  urlLabel.setAttribute('for', urlID);
  urlLabel.innerHTML = 'Link ' + (linksCount+1) + ' URL';
  let urlInput = document.createElement('input');
  urlInput.setAttribute('id', urlID);
  urlInput.setAttribute('type', 'text');
  urlInput.setAttribute('data-type', 'url');
  if(linkData && linkData.url){
    urlInput.value = linkData.url;
  }
  urlCol = document.createElement('div');
  urlCol.append(urlLabel);
  urlCol.append(urlInput);

  let textID = 'link-text-' + (linksCount+1);
  let textLabel = document.createElement('label');
  textLabel.setAttribute('for', textID);
  textLabel.innerHTML = 'Link ' + (linksCount+1) + ' Text';
  let textInput = document.createElement('input');
  textInput.setAttribute('id', textID);
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('data-type', 'text');
  if(linkData && linkData.text){
    textInput.value = linkData.text;
  }
  textCol = document.createElement('div');
  textCol.append(textLabel);
  textCol.append(textInput);

  fieldsDiv.appendChild(urlCol);
  fieldsDiv.appendChild(textCol);
  let remove = document.createElement('a');
  remove.setAttribute('data-remove', true);
  remove.setAttribute('href', '#');
  remove.innerHTML = '(-)';
  fieldsDiv.appendChild(remove);

  container.appendChild(fieldsDiv);
}
