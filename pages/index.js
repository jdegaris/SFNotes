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

function Home({ }) {
  return (
    <div style={{ marginLeft: "2rem" }}>
      <h1>Flashcards</h1>
      <CategoryList
        categories={categories}
      />
      <h1>Training Videos</h1>
      <VideoList categories={categories} />

    </div>
  );
}


export default Home;
