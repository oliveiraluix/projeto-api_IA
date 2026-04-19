import { faker } from '@faker-js/faker'

describe('PetStore API - Create Pet', () => {
  const buildPet = () => ({
    id: faker.datatype.number({ min: 100000, max: 999999 }),
    category: {
      id: faker.datatype.number({ min: 1, max: 100 }),
      name: faker.animal.type()
    },
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    tags: [
      {
        id: faker.datatype.number({ min: 1, max: 100 }),
        name: faker.word.noun()
      }
    ],
    status: 'available'
  })

  it('criar_pet_sucesso', () => {
    const pet = buildPet()

    cy.createPet(pet).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id', pet.id)
      expect(response.body).to.have.property('name', pet.name)
      expect(response.body).to.have.property('status', pet.status)
      expect(response.body.category).to.have.property('name', pet.category.name)
      cy.takeEvidence(response)
    })
  })

  it('criar_pet_dados_validos', () => {
    const pet = buildPet()

    cy.createPet(pet).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.tags[0]).to.include({ name: pet.tags[0].name })
      expect(response.body.category).to.include({ name: pet.category.name })
      cy.takeEvidence(response)
    })
  })
})
