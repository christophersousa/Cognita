# Welcome to the Cognita!

## Configure
Change the password, username and host in the file: .env
```shellscript
  NEO4J_URL=
  NEO4J_USERNAME=
  NEO4J_PASSWORD=
```

## Script Cypher 

### list steps by trail
```shellscript
  MATCH (t:Trail {id: $trailId})
  OPTIONAL MATCH (t)-[:HAS_STEP]->(s:Step)
  RETURN t, COLLECT(s) AS steps
```

### create a new step
```shellscript
  MATCH (t:Trail {id: $trailId})
  CREATE (s:Step $stepData)
  CREATE (t)-[:HAS_STEP]->(s)
  RETURN s
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```
