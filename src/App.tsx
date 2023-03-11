import { HttpsCallable, HttpsCallableResult } from 'firebase/functions';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import './App.css';
import { InstaGrab } from './firebase-functions';

type instaData = {
  type: string,
    url: string
}

function App() {
  const [url, setUrl] = useState("")
  const [radio, setRadio] = useState("image")
  const [imageUrl, setImageUrl] = useState<instaData | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(document.referrer === "https://richkevan.com/")
  }, [])

  const urlSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(url, radio)
    InstaGrab({ url, radio })
      .then((res:HttpsCallableResult<any>) => {
        console.log(res)
        setImageUrl(res.data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>InstaGrab</h1>
          {show ?
        <form onSubmit={urlSubmit} className=" grid col-1">
            <input type="url" placeholder='Instagram Link' value={url} onChange={(e) => { setUrl(e.target.value) }} required={true} />
            <label htmlFor='image'>
              <input type="radio" value="image" checked={ radio === "image"} onChange={(e) => { setRadio(e.target.value) }} />
              Image</label>
            <label htmlFor='image'>
              <input type="radio" value="video" checked={ radio === "video"} onChange={(e) => { setRadio(e.target.value) }} />
              Video</label>
          <button type='submit'>Download</button>
            </form>
            :
            null
            }
        {imageUrl && imageUrl.type === "image" && <img src={imageUrl.url} alt="Instagram Post" />}
        {imageUrl && imageUrl.type === "video" && <video src={imageUrl.url} autoPlay={false} />}
      </header>
      </div>
  );
}

export default App;
