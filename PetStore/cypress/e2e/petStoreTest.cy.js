///<reference types="cypress"/>

import {faker} from '@faker-js/faker'
import pet from '../fixtures/pet.json'

pet.name = faker.animal.dog.name
pet.category.id = faker.number.int({ min: 10000000, max: 999999999999999999 });
pet.category.name = faker.animal.dog();


let date;
let petId;

  it('Create pet', () => {
    // cy.request('POST', '/pet', pet).then( response => {
    // expect(response.status).to.eq(200);
    // expect(response.body.name).to.eq(pet.name);
    // expect(response.body.category.id).to.eq(pet.category.id);
    // expect(response.body.category.name).to.eq(pet.category.name);
    // })
    

   // The same request but with alternative syntax 
    cy.request({
      method: 'POST',
      url: '/pet',
      body: pet,
      headers: {
        'Content-Type': 'application/json'
      }
   
    }).then( response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);

      expect(response.headers['content-type']).to.eq('application/json');
    

      petId = response.body.id;
      date = response.headers['date']; 
      })
  })
 
  it('Find pet by id', () =>{
    cy.request({
      method: 'GET',
      url: `/pet/${petId}`,
      body: pet,
      headers: {
        'Content-Type': 'application/json'
      }
   
    }).then( response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);

      })
  })
  
  it('Update pet name', () =>{
    pet.name = faker.animal.dog.name

    cy.request({
      method: 'PUT',
      url: '/pet',
      body: pet,
      headers: {
        'Content-Type': 'application/json'
      }
   
    }).then( response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);

      })
  })
  it('Find pet by status', () =>{
    pet.name = faker.animal.dog.name
    
    cy.request({
      method: 'GET',
      url: '/pet/findByStatus?status=available'
   
    }).then( response => {
      expect(response.status).to.eq(200);

      let pets = response.body;
      let result = pets.filter(petFromResponseArray =>{
        return myPet.id === pet.id
      })
     expect(result[0]).to.be.eql(pet);
      })
  })

  