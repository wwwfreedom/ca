import React from 'react'
import ReactDOM from 'react-dom'
// Add this import:
import { AppContainer } from 'react-hot-loader'

import App from './containers/App.js'
import registerServiceWorker from './registerServiceWorker'
import baseStyle from './styles/index'

// Wrap the rendering in a function:
const render = Component => {
    baseStyle()

    ReactDOM.render(
        // Wrap App inside AppContainer
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    )
}

// Do this once
registerServiceWorker()

// Render once
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/App.js', () => {
        render(App)
    })
}
