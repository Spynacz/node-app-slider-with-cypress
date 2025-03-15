describe("Swiper Gallery Tests", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it('Checks if second slide contains "United Kingdom"', function() {
        cy.visit("http://localhost:3000");
        cy.get(".swiper-button-next").click();
        cy.get(".swiper-slide-active").should("contain", "United Kingdom");
    });

    it('Checks if third slide contains "Paris"', function() {
        cy.visit("http://localhost:3000");
        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-button-next").click({ force: true });
        cy.wait(1000);
        cy.get(".swiper-slide-active").should("contain", "Paris");
    });

    it("Allows user to navigate slides using navigation buttons", function() {
        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active").should("contain", "United Kingdom");

        cy.get(".swiper-button-prev").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active").should("contain", "Rome");
    });

    it("Ensures each slide displays correct title and description", function() {
        const slides = [
            { title: "Rome", description: "Italy" },
            { title: "London", description: "United Kingdom" },
            { title: "Paris", description: "France" },
        ];

        slides.forEach((slide, index) => {
            if (index > 0) {
                cy.get(".swiper-button-next").click();
                cy.wait(1000);
            }

            cy.get(".swiper-slide-active").within(() => {
                cy.contains("h1", slide.title);
                cy.contains("p", slide.description);
            });
        });
    });

    it("Checks gallery responsiveness on different devices", function() {
        const devices = ["iphone-x", "ipad-2", "macbook-15"];

        devices.forEach((device) => {
            cy.viewport(device);
            cy.get(".swiper").should("be.visible");
            cy.get(".swiper-button-next").should("be.visible");
            cy.get(".swiper-button-prev").should("be.visible");
        });
    });

    it("Ensures the gallery is properly displayed", function() {
        cy.get(".swiper").should("be.visible");
        cy.get(".swiper-slide").should("have.length", 3);
        cy.get(".swiper-button-next").should("exist").and("be.visible");
        cy.get(".swiper-button-prev").should("exist").and("be.visible");
    });
});
