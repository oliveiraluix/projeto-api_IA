Cypress.Commands.add('createPet', (pet) => {
  return cy.request({
    method: 'POST',
    url: '/pet',
    body: pet
  })
})

Cypress.Commands.add('getPet', (petId) => {
  return cy.request({
    method: 'GET',
    url: `/pet/${petId}`,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('updatePet', (pet) => {
  return cy.request({
    method: 'PUT',
    url: '/pet',
    body: pet
  })
})

Cypress.Commands.add('updatePetStatus', (petId, name, status) => {
  return cy.request({
    method: 'POST',
    url: `/pet/${petId}`,
    form: true,
    body: {
      name,
      status
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deletePet', (petId) => {
  return cy.request({
    method: 'DELETE',
    url: `/pet/${petId}`,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('takeEvidence', (response) => {
  cy.task('generateEvidenceName', Cypress.currentTest.title).then((fileName) => {
    cy.window().then(win => {
      win.document.body.innerHTML = `<div style="padding: 20px; font-family: Arial; background: white; color: black;">
        <h1>Test: ${Cypress.currentTest.title}</h1>
        <p>Status Code: ${response.status}</p>
        <p>Response: ${JSON.stringify(response.body, null, 2)}</p>
      </div>`
    })
    cy.screenshot(fileName)
  })
})
