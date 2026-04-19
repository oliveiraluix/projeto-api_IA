import { faker } from '@faker-js/faker'

describe('PetStore API - Get Pet', () => {
  const buildPet = () => ({
    id: faker.datatype.number({ min: 100000, max: 999999 }),
    category: { id: 1, name: faker.animal.type() },
    name: faker.animal.cat(),
    photoUrls: [faker.image.url()],
    tags: [{ id: 1, name: faker.word.noun() }],
    status: 'available'
  })

  it('buscar_pet_por_id', () => {
    const pet = buildPet()

    cy.createPet(pet).then(() => {
      cy.getPet(pet.id).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('id', pet.id)
        expect(response.body).to.have.property('name', pet.name)
        cy.takeEvidence(response)
      })
    })
  })

  it('buscar_pet_inexistente', () => {
    const missingId = faker.datatype.number({ min: 9000000, max: 9999999 })

    cy.getPet(missingId).then((response) => {
      expect(response.status).to.equal(404)
      cy.takeEvidence(response)
    })
  })
})
