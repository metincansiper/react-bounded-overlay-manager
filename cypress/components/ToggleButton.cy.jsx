import React from 'react';
import { mount } from '@cypress/react18';
import ToggleButton from './ToggleButton';

describe('ToggleButton Component', () => {
    it('toggles text on button click', () => {
        mount(<ToggleButton />);
        cy.get('button').contains('Toggle Text').click();
        cy.get('#toggle-text').should('be.visible');

        cy.get('button').contains('Toggle Text').click();
        cy.get('#toggle-text').should('not.exist');
    });
});
