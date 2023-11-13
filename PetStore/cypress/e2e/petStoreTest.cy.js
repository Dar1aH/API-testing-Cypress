///<reference types="cypress"/>

import {faker} from '@faker-js/faker'
import pet from '../fixtures/pet.json'

pet.name = faker.animal.dog.name
pet.category.id = faker.number.int({ min: 10, max: 9999 });
pet.category.name = faker.animal.dog();


let date;

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

      date = response.headers['date']; 
      })
  })
 
  it('Verify variable value', () =>{
    cy.log(date)
  })
  