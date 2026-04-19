import { faker } from '@faker-js/faker'

describe('PetStore API - Update Pet', () => {
  const buildPet = () => ({
    id: faker.datatype.number({ min: 100000, max: 999999 }),
    category: { id: 2, name: faker.animal.type() },
    name: faker.animal.cow(),
    photoUrls: [faker.image.url()],
    tags: [{ id: 2, name: faker.word.noun() }],
    status: 'available'
  })

  it('atualizar_pet_com_put', () => {
    const pet = buildPet()

    cy.createPet(pet).then(() => {
      const updatedPet = {
        ...pet,
        name: `${pet.name}-updated`,
        status: 'sold'
      }

      cy.updatePet(updatedPet).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('name', updatedPet.name)
        expect(response.body).to.have.property('status', updatedPet.status)
        cy.takeEvidence(response)
      })
    })
  })

  it('atualizar_status_pet', () => {
    const pet = buildPet()

    cy.createPet(pet).then(() => {
      cy.updatePetStatus(pet.id, pet.name, 'pending').then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', `${pet.id}`)

        cy.getPet(pet.id).then((getResponse) => {
          expect(getResponse.status).to.equal(200)
          expect(getResponse.body).to.have.property('status', 'pending')
          cy.takeEvidence(getResponse)
        })
      })
    })
  })
})
