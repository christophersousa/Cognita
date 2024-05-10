import neo4j from 'neo4j-driver';
import { IListStepsByTrail, IStep } from '~/interface/interfaces';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));

export async function fetchDataTrail(trailId:string):Promise<IListStepsByTrail> {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (t:Trail {id: $trailId}) OPTIONAL MATCH (t)-[:HAS_STEP]->(s:Step) RETURN t, COLLECT(s) AS steps",
      { trailId }
    );
    
    if (result.records.length === 0) {
      throw new Error('Trilha não encontrada');
    }

    const trail = result.records[0].get('t').properties;
    const steps = result.records[0].get('steps').map((step:any) => step.properties);

    return { trail, steps };
  } finally {
    await session.close();
  }
}

export async function addStepByTrail(trailId:string, stepData:IStep):Promise<IStep> {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (t:Trail {id: $trailId})
      CREATE (s:Step $stepData)
      CREATE (t)-[:HAS_STEP]->(s)
      RETURN s
      `,
      { trailId, stepData }
    );

    if (result.records.length === 0) {
      throw new Error('Falha ao criar o novo passo na trilha');
    }

    return result.records[0].get('s').properties;
  } finally {
    await session.close();
  }
}