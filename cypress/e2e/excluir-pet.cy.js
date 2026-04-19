import { faker } from '@faker-js/faker'

describe('PetStore API - Delete Pet', () => {
  const buildPet = () => ({
    id: faker.datatype.number({ min: 100000, max: 999999 }),
    category: { id: 3, name: faker.animal.type() },
    name: faker.animal.bird(),
    photoUrls: [faker.image.url()],
    tags: [{ id: 3, name: faker.word.noun() }],
    status: 'available'
  })

  it('excluir_pet_por_id', () => {
    const pet = buildPet()

    cy.createPet(pet).then(() => {
      cy.deletePet(pet.id).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', `${pet.id}`)

        cy.getPet(pet.id).then((getResponse) => {
          expect(getResponse.status).to.equal(404)
          cy.takeEvidence(getResponse)
        })
      })
    })
  })

  it('excluir_pet_inexistente', () => {
    const missingId = faker.datatype.number({ min: 9000000, max: 9999999 })

    cy.deletePet(missingId).then((response) => {
      expect(response.status).to.equal(404)
      expect(response.body).satisfy((body) => body === '' || body === null || body?.message === undefined)
      cy.takeEvidence(response)
    })
  })
})
