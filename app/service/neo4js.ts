import neo4j from 'neo4j-driver';
import { IListStepsByTrail } from '~/interface/interfaces';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));

export async function fetchDataTrail():Promise<IListStepsByTrail> {
  const session = driver.session();
  try {
    const result = await session.run("MATCH (t:Trail {id: 'trail-1'})-[:HAS_STEP]->(s:Step) RETURN t, COLLECT(s) AS steps");
    const trail = result.records[0].get('t').properties;
    const steps = result.records[0].get('steps').map((step:any) => step.properties);

    return { trail, steps };
  } finally {
    await session.close();
  }
}