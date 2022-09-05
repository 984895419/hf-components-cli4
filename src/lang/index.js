import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import elementJaLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang

// https://webpack.js.org/guides/dependency-management/#requirecontext
const langModules = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const langModule = langModules.keys().reduce((langModule, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = langModules(modulePath)
  const moduleNames = moduleName.split('/')
  const length = moduleNames.length - 1
  let lastObj = langModule
  let modelLastObj = langModule
  for (const ind in moduleNames) {
    if (parseInt(ind) === length) {
      lastObj[moduleNames[ind]] = value.default
    } else {
      lastObj[moduleNames[ind]] = modelLastObj[moduleNames[ind]] || {}
      lastObj = lastObj[moduleNames[ind]]
      modelLastObj = modelLastObj[moduleNames[ind]]
    }
  }
  return langModule
}, {})

Vue.use(VueI18n)

const messages = {
  en: {

    ...elementEnLocale
  },
  zh: {

    ...elementZhLocale
  },
  es: {

    ...elementEsLocale
  },
  ja: {

    ...elementJaLocale
  },
  ml: {

    ...elementZhLocale
  }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
var _ = require('lodash')
const allMessages = _.merge(messages, langModule)
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages: allMessages
})

export default i18n
