import { browser, element, by } from 'protractor';
import { NavBarPage } from '../page-objects/jhi-page-objects';

describe('Family e2e test', () => {

    let navBarPage: NavBarPage;
    let familyDialogPage: FamilyDialogPage;
    let familyComponentsPage: FamilyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Families', () => {
        navBarPage.goToEntity('family');
        familyComponentsPage = new FamilyComponentsPage();
        expect(familyComponentsPage.getTitle())
            .toMatch(/Families/);

    });

    it('should load create Family dialog', () => {
        familyComponentsPage.clickOnCreateButton();
        familyDialogPage = new FamilyDialogPage();
        expect(familyDialogPage.getModalTitle())
            .toMatch(/Create or edit a Family/);
        familyDialogPage.close();
    });

    it('should create and save Families', () => {
        familyComponentsPage.clickOnCreateButton();
        familyDialogPage.setFnameInput('fname');
        expect(familyDialogPage.getFnameInput()).toMatch('fname');
        familyDialogPage.setMnameInput('mname');
        expect(familyDialogPage.getMnameInput()).toMatch('mname');
        familyDialogPage.setLnameInput('lname');
        expect(familyDialogPage.getLnameInput()).toMatch('lname');
        familyDialogPage.setEmailInput('email');
        expect(familyDialogPage.getEmailInput()).toMatch('email');
        familyDialogPage.setMobileInput('5');
        expect(familyDialogPage.getMobileInput()).toMatch('5');
        familyDialogPage.setAlmobileInput('5');
        expect(familyDialogPage.getAlmobileInput()).toMatch('5');
        familyDialogPage.setOccupationInput('occupation');
        expect(familyDialogPage.getOccupationInput()).toMatch('occupation');
        familyDialogPage.setCompanyInput('company');
        expect(familyDialogPage.getCompanyInput()).toMatch('company');
        familyDialogPage.save();
        expect(familyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FamilyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-family div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class FamilyDialogPage {
    modalTitle = element(by.css('h4#myFamilyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fnameInput = element(by.css('input#field_fname'));
    mnameInput = element(by.css('input#field_mname'));
    lnameInput = element(by.css('input#field_lname'));
    emailInput = element(by.css('input#field_email'));
    mobileInput = element(by.css('input#field_mobile'));
    almobileInput = element(by.css('input#field_almobile'));
    occupationInput = element(by.css('input#field_occupation'));
    companyInput = element(by.css('input#field_company'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFnameInput = function(fname) {
        this.fnameInput.sendKeys(fname);
    };

    getFnameInput = function() {
        return this.fnameInput.getAttribute('value');
    };

    setMnameInput = function(mname) {
        this.mnameInput.sendKeys(mname);
    };

    getMnameInput = function() {
        return this.mnameInput.getAttribute('value');
    };

    setLnameInput = function(lname) {
        this.lnameInput.sendKeys(lname);
    };

    getLnameInput = function() {
        return this.lnameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setMobileInput = function(mobile) {
        this.mobileInput.sendKeys(mobile);
    };

    getMobileInput = function() {
        return this.mobileInput.getAttribute('value');
    };

    setAlmobileInput = function(almobile) {
        this.almobileInput.sendKeys(almobile);
    };

    getAlmobileInput = function() {
        return this.almobileInput.getAttribute('value');
    };

    setOccupationInput = function(occupation) {
        this.occupationInput.sendKeys(occupation);
    };

    getOccupationInput = function() {
        return this.occupationInput.getAttribute('value');
    };

    setCompanyInput = function(company) {
        this.companyInput.sendKeys(company);
    };

    getCompanyInput = function() {
        return this.companyInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
