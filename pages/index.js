import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import CategoryList from '../components/Index/CategoryList'
import VideoList from '../components/Index/VideoList'
import baseUrl from '../utils/baseUrl'

const categories = [
  'Platform App Builder',
  'Platform Developer I',
  'Administrator'
]
const videos = [
  'Test Video',
  'Salesforce Platform Developer Video',
  'Administrator Test Video'
]

function Home({ books }) {
  return (
    <div style={{ marginLeft: "2rem" }}>
      <h1>Flashcards</h1>
      <CategoryList categories={categories} />
      <h1>Training Videos</h1>
      <VideoList videos={videos} />
    </div>
  );
}

// Home.getInitialProps = async () => {
//   // fetch data
//   const url = `${baseUrl}/api/books`
//   const response = await axios.get(url)
//   // return response data as an object
//   return { books: response.data }
//   // this object will be merged with existing groups

// }

export default Home;
