describe('Task 1: E2E testing', () => {
  beforeEach('navigate and accept cookies', () =>{
    cy.visit('/')
    cy.get('#gdpr-cookie-accept').click()
  })
  it('applying for a specific position', () => {
    //select option in "Job area" dropdown
    cy.get('[data-select2-id="2"]').click()
    cy.get('.select2-results__options').should('be.visible')
    cy.contains('li','IT Engineering').click()
    cy.get('[data-select2-id="2"]').should('contain.text','IT Engineering')

    //select option in "Seniority" dropdown
    cy.get('[data-select2-id="7"]').click()
    cy.get('.select2-results__options').should('be.visible')
    cy.contains('li','Senior').click()
    cy.get('[data-select2-id="7"]').should('contain.text','Senior')

    //select option in "English level" dropdown
    cy.get('[data-select2-id="12"]').click()
    cy.get('.select2-results__options').should('be.visible')
    cy.contains('li','Upper-Intermediate').click()
    cy.get('[data-select2-id="12"]').should('contain.text','Upper-Intermediate')

    //search for position with a specific keyword
    cy.get('.input-search').type('SQL').should('have.value','SQL').type("{Enter}")
    cy.contains('.block-jobs','Management').click()

    //pressing "apply" on the chosen position
    cy.contains('.buttons--apply','Send your CV').find('.button').click()
    cy.origin('https://ejqi.fa.em2.oraclecloud.com', () => {
      cy.get('.apply-flow-dialog__header').should('contain.text','Start your application')
    })
    })

  it('validates search input and dropdowns', () => {
    //type in and select the filter
    cy.get('[data-select2-id="2"]').click().type('Security')
    cy.contains('li','Security').click()
    cy.get('[title="Security"]').should('be.visible')

    //clear filter by pressing "x"
    cy.get('.select2-selection__choice__remove').click()

    //open dropdown, select one filter and unselect in dropdown 
    cy.get('[data-select2-id="2"]').click()
    cy.contains('li','IT Engineering').click()
    cy.get('[title="IT Engineering"]').should('be.visible')
    cy.get('[data-select2-id="2"]').click()
    cy.contains('.select2-results__option','IT Engineering').click()
    cy.get('.select2-search__field').first().invoke('attr','placeholder').should('contain','')

    //open dropdown, select couple filter and clear all
    cy.get('[data-select2-id="2"]').click()
    cy.contains('li','IT Engineering').click()
    cy.get('[data-select2-id="2"]').click()
    cy.contains('li','Security').click()
    cy.get('[title="IT Engineering"]').should('be.visible')
    cy.get('[title="Security"]').should('be.visible')
    //clear all filters
    cy.get('.select2-selection__clear').click({force:true})
    cy.get('.select2-search__field').first().invoke('attr','placeholder').should('contain','')
  })
})