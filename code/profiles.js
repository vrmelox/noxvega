async function fetchAndGenerateProfiles() {
    try {
      // 1. Récupérer le fichier JSON
      const reponse = await fetch('../users_bases.json');
      if (!reponse.ok) throw new Error('Erreur lors du chargement du fichier JSON');
      
      const profile = await reponse.json();
  
      // 2. Générer les profils
      genereProfiles(profile);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
  
  function genereProfiles(profile) {
    const sectionAccroche = document.querySelector(".accroche");
  
    // Vérifier si l'élément "sectionAccroche" existe
    if (!sectionAccroche) {
      console.error("Aucune section avec la classe '.accroche' trouvée");
      return;
    }
  
    for (let i = 0; i < profile.length; i++) {
      const article = profile[i];
  
      // Vérifications des propriétés
      if (!article.image || !article.name || !article.Age || !article.Adresse) {
        console.warn(`Données manquantes pour le profil ${i + 1}`);
        continue;
      }
  
      // Créer les éléments pour chaque profil
      const profileElement = document.createElement("article");
      const imageElement = document.createElement("img");
      imageElement.src = article.image;
      imageElement.alt = `Image de ${article.name}`;
  
      const nomElement = document.createElement("h2");
      nomElement.innerText = article.name;
  
      const ageElement = document.createElement("p");
      ageElement.innerText = `Âge : ${article.Age} ans`;
  
      const villeElement = document.createElement("p");
      villeElement.innerText = `Adresse : ${article.Adresse}`;
  
      // Ajouter les éléments au DOM
      profileElement.appendChild(imageElement);
      profileElement.appendChild(nomElement);
      profileElement.appendChild(ageElement);
      profileElement.appendChild(villeElement);
  
      sectionAccroche.appendChild(profileElement);
    }
  }
  
  // Appeler la fonction principale pour exécuter le tout
  fetchAndGenerateProfiles();
  