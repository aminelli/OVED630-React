# Inizializzazione progetto


## Dipendenze

```sh
# Installazione prisma e sue dipendenze
npm i prisma @prisma/client
npm i -D prisma

# Installazione lib postgresql
npm i pg
npm i -D @types/pg

# Altre dipendenze
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
npm install --save-dev ts-node typescript


```

## Configurazione Prisma

```sh
npx prisma init

# Genera il client Prisma
npx prisma generate

# Generazioa database
# npx prisma db push
npx prisma migrate dev

# Generazione seed  (previa creazione seed.ts in cartella prisma)
npx prisma db seed

# Per aprire prisma studio
npx prisma studio

```

