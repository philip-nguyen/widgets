import axios from 'axios';
import React, {useState, useEffect} from 'react';

const Search = () => {
  const [term, setTerm] = useState('LOONA');
  const [results, setResults] = useState([]);


  // useEffect expects to see NO 2nd param, an empty array, or array data
  useEffect(() => {
    // run the wikipedia search API 
    
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        }
      });

      setResults(data.query.search);
    };

    // first time rendering?
    if(term && !results.length) {
      search();
    }
    else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500); // set timer for 500ms
      
      // clean up function
      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target='_blank'
            >Go</a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
            <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
            
        </div>
      </div>
    )
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input 
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="input" />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
};

export default Search;