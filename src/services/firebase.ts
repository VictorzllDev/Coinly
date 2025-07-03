import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDOTEiiAsStrktrxEa1dQ98hgrWsyNwdQQ',
	authDomain: 'coinly-68395.firebaseapp.com',
	projectId: 'coinly-68395',
	storageBucket: 'coinly-68395.firebasestorage.app',
	messagingSenderId: '548057553788',
	appId: '1:548057553788:web:b77ce3d46ee2ef5613a2f9',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
