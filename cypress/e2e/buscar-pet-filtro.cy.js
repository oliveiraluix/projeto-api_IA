import { faker } from '@faker-js/faker'

describe('PetStore API - Search Pets', () => {
  const buildPet = (status, tagName) => ({
    id: faker.datatype.number({ min: 100000, max: 999999 }),
    category: { id: 4, name: faker.animal.type() },
    name: faker.animal.cat(),
    photoUrls: [faker.image.url()],
    tags: [{ id: faker.datatype.number({ min: 1, max: 100 }), name: tagName }],
    status
  })

  it('buscar_pet_por_status', () => {
    const pet = buildPet('available', faker.word.noun())

    cy.createPet(pet).then(() => {
      cy.request({
        method: 'GET',
        url: `/pet/findByStatus?status=available`
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an('array')
        expect(response.body.some((item) => item.id === pet.id)).to.be.true
        cy.takeEvidence(response)
      })
    })
  })

  it('buscar_pet_por_tag', () => {
    const uniqueTag = `${faker.word.noun()}-${Date.now()}`
    const pet = buildPet('available', uniqueTag)

    cy.createPet(pet).then(() => {
      cy.request({
        method: 'GET',
        url: `/pet/findByTags`,
        qs: { tags: uniqueTag }
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an('array')
        expect(response.body.some((item) => item.tags?.some((tag) => tag.name === uniqueTag))).to.be.true
        cy.takeEvidence(response)
      })
    })
  })
})
