# Ottiene la lista delle reti Docker
$networks = docker network ls --format "{{.Name}}" 2>$null

$networkName = "net-react"

# Verifica se la rete esiste nella lista
$networkExists = $networks -contains $networkName

Write-Output "==  CREAZIONE RETE =="

if ($networkExists) {
    Write-Output "La Rete già esiste"
} else {
    Write-Output "Creazione rete"
    docker network create $networkName    
}

Write-Output "==  CREAZIONE CONTAINER PGADMIN =="

docker run -d `
    --name react-pgadmin `
    --hostname react-pgadmin `
    -e PGADMIN_DEFAULT_PASSWORD=admin `
    -e PGADMIN_DEFAULT_EMAIL=user@domain.com `
    -v vol_react_pgadmin:/var/lib/pgadmin `
    -p 5050:80 `
    --network $networkName `
    dpage/pgadmin4

docker logs -f react-pgadmin