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

Write-Output "==  CREAZIONE CONTAINER POSTGRES E DATABASES =="

docker run -d `
    --name react-postgres `
    --hostname react-postgres `
    -e POSTGRES_USER=root `
    -e POSTGRES_PASSWORD=root `
    -v vol_react_postgres:/var/lib/postgresql/data `
    -v .\01-init-schema.sql:/docker-entrypoint-initdb.d/01-init-schema.sql `
    -p 5432:5432 `
    --network $networkName `
    postgres:latest

docker logs -f react-postgres
 