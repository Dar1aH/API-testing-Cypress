///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import pet from '../fixtures/pet.json';

pet.id = faker.number.int({ min: 1000000000000000, max: 9999999999999999 });
pet.name = faker.animal.cat();
pet.category.id = faker.number.int({ min: 10, max: 9999 });
pet.category.name = faker.animal.dog();

let date;
let petId;

it('Create pet', () => {
  // cy.request('POST', '/pet', pet).then( response => {
  //   expect(response.status).to.eq(200);
  //   expect(response.body.name).to.eq(pet.name);
  //   expect(response.body.category.id).to.eq(pet.category.id);
  //   expect(response.body.category.name).to.eq(pet.category.name);
  // })

  // той самий запит але з альтернативним синтаксисом
  cy.request({
    method: 'POST',
    url: '/pet',
    body: pet,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(pet.name);
    expect(response.body.category.id).to.eq(pet.category.id);
    expect(response.body.category.name).to.eq(pet.category.name);

    expect(response.headers["content-type"]).to.eq('application/json');

    // console.log("response: "+JSON.stringify(response));
    console.log("response.body: " + JSON.stringify(response.body));
    // console.log("response.body.id: "+JSON.stringify(response.body.id));

    petId = response.body.id;
    console.log("petId: " + petId);

    date = response.headers["date"];
  })

})

it('Find pet by id', () => {
  cy.request({
    method: 'GET',
    url: `/pet/${petId}`
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(pet.name);
    expect(response.body.category.id).to.eq(pet.category.id);
    expect(response.body.category.name).to.eq(pet.category.name);
  })

})

it('Update pet name', () => {
  pet.name = faker.animal.dog.name;

  cy.request({
    method: 'PUT',
    url: '/pet',
    body: pet,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(pet.name);
    expect(response.body.category.id).to.eq(pet.category.id);
    expect(response.body.category.name).to.eq(pet.category.name);
  }).then(() => {
    cy.request({
      method: 'GET',
      url: `/pet/${petId}`
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);
    })
  })

})

it('Find pet by status', () => {
  let status = 'available';
  
  cy.request({
    method: 'GET',
    url: `/pet/findByStatus?status=${status}`
  }).then(response => {
    expect(response.status).to.eq(200);

    let pets = response.body;

    let result = pets.filter( petFromResponseArray => {
      return petFromResponseArray.id === pet.id
    })

    expect(result[0]).to.be.eql(pet);

  })

})

it('Update pet name and status with form-data', () => {
  pet.name = faker.animal.cat();
  pet.status = 'sold';

  cy.request({
    method: 'POST',
    url: `/pet/${pet.id}`,
    form: true,
    body: `name=${pet.name}&status=${pet.status}`
  }).then(response => {
    
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(pet.id.toString());

  }).then(() => {
    
    cy.request({
      method: 'GET',
      url: `/pet/findByStatus?status=${pet.status}`
    }).then(response => {
      expect(response.status).to.eq(200);
  
      let pets = response.body;
  
      let result = pets.filter( petFromResponseArray => {
        return petFromResponseArray.id === pet.id
      })
  
      expect(result[0]).to.be.eql(pet);
  
    })

  })

})