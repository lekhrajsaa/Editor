module.exports = {
  bullet: id => {
    if (!id) return null;
    const ele = document.getElementById(id);
    if (ele?.firstChild?.nodeName == 'UL') {
      console.log(ele.innerHTML);
      const text = ele.innerText;
      ele.innerHTML = '<></>';
      ele.innerText = text;
    } else if (ele?.firstChild) {
      const create = document.createElement('ul');
      create.style.padding = '0 0 0 16px';
      const child = document.createElement('li');
      child.innerText = ele.innerText;
      create.appendChild(child);
      ele.innerHTML = '';
      ele.appendChild(create);
    }
    document.getElementById('saveDraft')?.click();
  },
};
