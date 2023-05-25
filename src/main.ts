import './assets/main.css'
import './assets/base.css'
import { createApp } from 'vue'
import store from '../src/store'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faMagnifyingGlass, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faMagnifyingGlass, farHeart, fasHeart)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)
app.mount('#app')
