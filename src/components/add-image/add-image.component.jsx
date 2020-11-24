import React, { useEffect, useState } from 'react';

import {imgur_key} from '../../config_data';

const AddImage = ({}) => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = () => {
    const r = new XMLHttpRequest();
    const d = new FormData();
    const e = document.getElementsByClassName('input-image')[0].files[0];
    var u;

    d.append('image', e);

    r.open('POST', 'https://api.imgur.com/3/image/');
    r.setRequestHeader('Authorization', `Client-ID ${imgur_key}`);
    r.onreadystatechange = function () {
      if(r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText)
        u = `https://i.imgur.com/${res.data.id}.png`

        const p = document.createElement('p')
        p.className = 'image-url'
        p.innerHTML = "![img]("+u+")"
          
        const d = document.createElement('li')
        
        document.getElementsByClassName('image-list')[0].appendChild(d).appendChild(p)  

      }
    }
    r.send(d)
  }
  
    return (
        <div>
        <form>
          <input type="file" className="input-image" onChange={uploadImage}/>
        </form>

        <br/>
        <span className="f6">copy/paste any markdown code that appears here once you upload a image to add to your note:</span>
        <br/>
        <ul className="list image-list tl f6 tr">
       
        </ul>
        </div>
      
    );
  
}

export default AddImage;
