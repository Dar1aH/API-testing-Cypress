describe('API testing', () => {


  it('Approach1 - Hardcoded json object', () => {

    const requestBody ={
      
                     "tourist_name": "Mike",
                     "tourist_email": "mike677@gmail.com",
                     "tourist_location": "Paris"
 
                     }
    cy.request(
           {
            method: "POST",
            url: "http://restapi.adequateshop.com/api/Tourist",
            body:requestBody
           })
           .then( (response)=>{
               expect(response.status).to.eq(201)
               expect(response.body.tourist_name).to.eq("Mike")
               expect(response.body.tourist_email).to.eq("mike677@gmail.com")
               expect(response.body.tourist_location).to.eq("Paris")
            })
  })

  it('Approach2 - Dynamically generating json object', () => {

    const requestBody ={
      
                     "tourist_name": Math.random().toString(5).substring(2),
                     "tourist_email": Math.random().toString(5).substring(2)+"@gmail.com",
                     "tourist_location": "Paris"
 
                     }
    cy.request(
           {
            method: "POST",
            url: "http://restapi.adequateshop.com/api/Tourist",
            body:requestBody
           })
           .then( (response)=>{
               expect(response.status).to.eq(201)
               expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
               expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
               expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            })
  })

  it.only('Approach3 - using Fixture', () => {
    cy.fixture('tourist.json').then((data) => {
      const requestBody = data;
  
      cy.request({
        method: "POST",
        url: "http://restapi.adequateshop.com/api/Tourist",
        body: requestBody
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
        expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
        expect(response.body.tourist_location).to.eq(requestBody.tourist_location);
      
        //This will verify the property availability along with the value

        expect(response.body).has.property('tourist_email', requestBody.tourist_email);
        expect(response.body).to.have.property('tourist_email', requestBody.tourist_email);
      });
    });
  });

})