import React from 'react';

const Results = ({results}) => {
  return (
    <>
      <div className="results">
        These are the results:
      </div>
      {results.map((result, key) => {
        return (
          <div>{result.name}</div>
        );
      })}
    </>
  );
};

export default Results;