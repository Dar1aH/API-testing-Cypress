///<reference types="cypress"/>

describe('HTTP Requests', () => {

  it('should return a 200 status code for a GET request', () => {
    // Sending a GET request and verifying the status code
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
      .its('status')
      .should('equal', 200);
  });

  it('should return a 201 status code for a POST request', () => {
    // Sending a POST request to create a new resource and verifying the status code
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: {
        title: 'Test post',
        body: 'This is post call',
        userId: 1
      }
    })
      .its('status')
      .should('equal', 201);
  });

  it('should return a 200 status code for a PUT request', () => {
    // Sending a PUT request to update some data 
    cy.request({
      method: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      body: {
        title: 'Test post - Updated',
        body: 'This is put call',
        userId: 1,
        id: 1
      }
    })
      .its('status')
      .should('equal', 200);
  });  

  it('Delete Call', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    })
      .its('status')
      .should('equal', 200);
  });  

});




