# Script de déploiement Firebase
echo "🚀 Déploiement AED Management..."

# Vérifier la connexion
firebase login --no-localhost

# Déployer
firebase deploy --only hosting

echo "✅ Déploiement terminé !"
echo "🔗 URL: https://ecardio-a7d9f.web.app"