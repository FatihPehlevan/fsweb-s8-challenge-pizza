describe('Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/order');
  });

  it('checks submit button state', () => {
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('input[name="isim"]')
      .type('John Doe')
      .should('have.value', 'John Doe');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('select[name="hamur"]').select('Orta').should('have.value', 'Orta');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('input[name="boyut"]').check('M').should('be.checked');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('input[name="malzemeler"]')
      .check(['Sucuk', 'Mısır', 'Sosis', 'Sarımsak'])
      .should('be.checked');
    cy.get('[data-cy="submit-button"]').should('be.enabled');
  });

  it('shows error messages for invalid inputs', () => {
    cy.get('input[name="isim"]').type('Jo').blur();
    cy.get('[data-cy="isim-error"]').should(
      'contain',
      'İsim en az 3 karakter olmalı',
    );

    cy.get('input[name="isim"]').type('hn');
    cy.get('[data-cy="isim-error"]').should('not.exist');

    cy.get('input[name="malzemeler"]').check(['Sucuk', 'Mısır']);
    cy.get('[data-cy="malzemeler-error"]').should(
      'contain',
      'En az 4 malzeme seçmelisiniz',
    );
    cy.get('input[name="malzemeler"]').check([
      'Sucuk',
      'Mısır',
      'Sosis',
      'Sarımsak',
      'Kabak',
      'Ananas',
      'Jalapeno',
      'Pepperoni',
      'Soğan',
      'Kanada Jambonu',
    ]);
    cy.get('[data-cy="malzemeler-error"]').should(
      'contain',
      'En fazla 10 malzeme seçebilirsiniz',
    );
  });

  it('submits the form and navigates to success page', () => {
    cy.get('input[name="isim"]').type('John Doe');
    cy.get('select[name="hamur"]').select('Orta');
    cy.get('input[name="boyut"]').check('M');
    cy.get('input[name="malzemeler"]').check([
      'Sucuk',
      'Mısır',
      'Sosis',
      'Sarımsak',
    ]);
    cy.get('[data-cy="submit-button"]').click();
  });

  it('calculates totals correctly', () => {
    cy.get('[data-cy="selections-total"]').should('contain', '0.00₺');
    cy.get('[data-cy="total"]').should('contain', '85.50₺');

    cy.get('input[name="malzemeler"]').check([
      'Sucuk',
      'Mısır',
      'Sosis',
      'Sarımsak',
    ]);
    cy.get('[data-cy="selections-total"]').should('contain', '20.00₺');
    cy.get('[data-cy="total"]').should('contain', '105.50₺');

    cy.get('button[aria-label="Adet artır"]').click();
    cy.get('[data-cy="selections-total"]').should('contain', '40.00₺');
    cy.get('[data-cy="total"]').should('contain', '211.00₺');
  });
});
