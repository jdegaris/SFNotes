import React from 'react'
import Flashcard from '../components/Flashcard/Flashcard'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { useRouter } from 'next/router'


function FlashcardPage({ user, flashcards }) {
    const router = useRouter();
    const cat = router.query.cat
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.category == cat)
    const flashcard = filteredFlashcards[Math.floor(Math.random() * filteredFlashcards.length)];

    return (
        <Flashcard flashcard={flashcard} cat={cat} />
    )
}

FlashcardPage.getInitialProps = async () => {
    // fetch data
    const url = `${baseUrl}/api/flashcards`
    const response = await axios.get(url)
    // return response data as an object
    return { flashcards: response.data }
    // this object will be merged with existing groups
}

export default FlashcardPage;
