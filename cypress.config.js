const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 10000,
    requestTimeout: 20000,
    screenshotsFolder: 'cypress/evidences',
    video: false,
    allowCypressEnv: false,
    setupNodeEvents(on, config) {
      on('task', {
        generateEvidenceName(testTitle) {
          const fs = require('fs')
          const path = require('path')
          const counterFile = path.join(process.cwd(), 'cypress', 'counter.json')
          
          const date = new Date()
          const dayMonth = `${date.getDate().toString().padStart(2, '0')}${ (date.getMonth() + 1).toString().padStart(2, '0') }`
          
          const cleanTitle = testTitle.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')
          
          let counters = {}
          if (fs.existsSync(counterFile)) {
            counters = JSON.parse(fs.readFileSync(counterFile, 'utf8'))
          }
          
          const key = `${cleanTitle}_${dayMonth}`
          if (!counters[key]) {
            counters[key] = 1
          } else {
            counters[key]++
          }
          
          fs.writeFileSync(counterFile, JSON.stringify(counters, null, 2))
          
          const suffix = counters[key] === 1 ? '' : `_${counters[key]}`
          return `CCT_${cleanTitle}_${dayMonth}${suffix}`
        }
      })
    }
  }
})
