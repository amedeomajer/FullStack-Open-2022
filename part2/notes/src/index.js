import ReactDOM from 'react-dom/client'
import App from './App'
// Axios' method get returns a promise.
// The documentation on Mozilla's site states the following about promises:
// A Promise is an object representing the eventual completion or failure 
// of an asynchronous operation.

// A promise can have three distinct states:

// The promise is pending: It means that the final value (one of the following two)
// 		is not available yet.
// The promise is fulfilled: It means that the operation has been completed and the
// 		final value is available, which generally is a successful operation.
// 		This state is sometimes also called resolved.
// The promise is rejected: It means that an error prevented the final value from
// 		being determined, which generally represents a failed operation.


// npx json-server --port 3001 --watch db.json run command on root of app to run the server on desired port
ReactDOM.createRoot(document.getElementById('root')).render(<App />)