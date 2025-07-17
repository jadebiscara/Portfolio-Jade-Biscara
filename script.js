// script.js

document.addEventListener('DOMContentLoaded', function() {
    const fixedOverlayImage = document.getElementById('fixed-overlay-image');
    const secondModule = document.getElementById('mod2'); 
    const clickableTabs = document.querySelectorAll('.clickable-tab'); 

    if (!fixedOverlayImage || !secondModule || clickableTabs.length === 0) {
        console.warn("Certains éléments nécessaires pour le script n'existent pas.");
        return;
    }

    // --- Fonction pour gérer l'opacité au défilement ---
    function handleScrollOpacity() {
        const secondModuleTop = secondModule.getBoundingClientRect().top;

        if (secondModuleTop <= 0) {
            // C'est cette ligne que vous devez changer :
            fixedOverlayImage.style.opacity = '0'; // Passe de '0.1' à '0' pour la rendre totalement invisible
        } else {
            fixedOverlayImage.style.opacity = '1';
        }
    }

    // --- Fonctions pour gérer l'opacité au survol (hover) ---
    function handleMouseOver() {
        fixedOverlayImage.style.opacity = '1';
    }

    function handleMouseOut() {
        handleScrollOpacity();
    }

    // --- Application des écouteurs d'événements ---
    window.addEventListener('scroll', handleScrollOpacity);
    handleScrollOpacity(); 

    clickableTabs.forEach(tab => {
        tab.addEventListener('mouseover', handleMouseOver);
        tab.addEventListener('mouseout', handleMouseOut);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const emailHotspot = document.querySelector('.hotspot-email');
    if (emailHotspot) {
        emailHotspot.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le lien de recharger la page
            const email = this.dataset.email; // Récupère l'email de l'attribut data-email

            // Utilise l'API du presse-papiers (moderne et sécurisée)
            navigator.clipboard.writeText(email).then(() => {
                alert('Adresse email copiée : ' + email); // Message de confirmation
            }).catch(err => {
                console.error('Erreur lors de la copie de l\'email: ', err);
                // Fallback pour les anciens navigateurs ou en cas d'erreur
                const tempInput = document.createElement('textarea');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('Adresse email copiée : ' + email + ' (méthode de secours)');
            });
        });
    }
});