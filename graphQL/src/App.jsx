import { useState, useEffect } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [factories, setFactories] = useState([]);
  const queryURL = "https://gateway.thegraph.com/api/0afae15d287fc5f57726c5a332891c46/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";
  const query = `{
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeUSD
    }.
  }`;

  const client = createClient({
    url: queryURL
  });

  useEffect(() => {
    const getFactories = async () => {
      try {
        const { data } = await client.query(query).toPromise();
        setFactories(data.factories);
      } catch (error) {
        console.error("Error fetching factories:", error);
      }
    };
    getFactories();
  }, []);

  return (
    <>
      <div>
        Factories Information
        {factories != null && factories.length > 0 && factories.map((factory) => {
          return (
            <div key={factory.id}>
              <div>ID: {factory.id}</div>
              <div>Pool Count: {factory.poolCount}</div>
              <div>Transaction Count: {factory.txCount}</div>
              <div>Total Volume USD: {factory.totalVolumeUSD}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;